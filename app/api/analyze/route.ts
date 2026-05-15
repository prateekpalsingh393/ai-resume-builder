import { NextRequest, NextResponse } from "next/server"
import mammoth from "mammoth"
import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
})

// ATS KEYWORD ENGINE
function extractKeywords(text: string) {

  const words = text
    .toLowerCase()
    .match(/\b[a-zA-Z][a-zA-Z0-9+#.-]{2,}\b/g)

  if (!words) return []

  const stopWords = [
    "with",
    "from",
    "have",
    "this",
    "that",
    "your",
    "will",
    "into",
    "about",
    "their",
    "they",
    "them",
    "were",
    "been",
    "using"
  ]

  const filtered = words.filter(
    (word) =>
      !stopWords.includes(word)
  )

  return [...new Set(filtered)]
}

export async function POST(req: NextRequest) {

  try {

    const formData = await req.formData()

    const file =
      formData.get("resume") as File

    const jobDescription =
      formData.get("jobDescription") as string

    if (!file) {

      return NextResponse.json({
        error: "No file uploaded"
      })
    }

    const bytes =
      await file.arrayBuffer()

    const buffer =
      Buffer.from(bytes)

    let extractedText = ""

    // DOCX Parsing
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {

      const result =
        await mammoth.extractRawText({
          buffer
        })

      extractedText = result.value
    }

    // AI Resume Optimization
    const completion =
      await openai.chat.completions.create({

        model: "deepseek/deepseek-chat",

        messages: [
          {
            role: "system",
            content: `

You are an ATS resume optimization expert.

Analyze the uploaded resume against the provided job description.

IMPORTANT RULES:
- Extract ALL personal details EXACTLY from resume
- NEVER skip email
- NEVER skip phone number
- NEVER skip location
- NEVER skip LinkedIn
- If information exists in resume, include it
- Do not invent fake information
- Return ONLY raw JSON
- Do not return markdown
- Do not return explanation
- Rewrite content professionally
- Improve ATS optimization
- Add measurable achievements
- Make bullet points impactful

Return this EXACT structure:

{
  "name": "",
  "title": "",
  "email": "",
  "phone": "",
  "location": "",
  "linkedin": "",
  "summary": "",
  "experience": [
    {
      "role": "",
      "company": "",
      "duration": "",
      "points": []
    }
  ],
  "education": [
    {
      "degree": "",
      "college": "",
      "year": ""
    }
  ],
  "skills": [],
  "certifications": [],
  "atsScore": "",
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "recruiterFeedback": [],
  "resumeImpact": "",
  "improvementSuggestions": []
}
`
          },

          {
            role: "user",
            content: `

RESUME:

${extractedText}

JOB DESCRIPTION:

${jobDescription}

`
          }
        ]
      })

    const aiResponse =
      completion.choices[0].message.content || "{}"

    console.log(aiResponse)

    const cleanedResponse =
      aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

    let optimizedResume

    try {

      optimizedResume =
        JSON.parse(cleanedResponse)

    } catch (parseError) {

      console.log(parseError)

      return NextResponse.json({
        error: "AI returned invalid JSON",
        raw: cleanedResponse
      })
    }

    // FALLBACK PERSONAL DETAILS

    optimizedResume.email =
      optimizedResume.email ||
      extractedText.match(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
      )?.[0] ||
      ""

    optimizedResume.phone =
      optimizedResume.phone ||
      extractedText.match(
        /(\+91[\-\s]?)?[0]?[6789]\d{9}/
      )?.[0] ||
      ""

    optimizedResume.location =
      optimizedResume.location ||
      "India"

    optimizedResume.linkedin =
      optimizedResume.linkedin ||
      ""

    // FALLBACK STRENGTHS

    if (
      !optimizedResume.strengths ||
      optimizedResume.strengths.length === 0
    ) {

      optimizedResume.strengths = [
        "Strong analytical thinking",
        "Excellent communication",
        "Problem-solving mindset"
      ]
    }

    // FALLBACK WEAKNESSES

    if (
      !optimizedResume.weaknesses ||
      optimizedResume.weaknesses.length === 0
    ) {

      optimizedResume.weaknesses = [
        "Add more quantified achievements",
        "Improve leadership-focused keywords"
      ]
    }

    // REAL ATS ENGINE

    const jdKeywords =
      extractKeywords(jobDescription)

    const resumeText =
      JSON.stringify(
        optimizedResume
      ).toLowerCase()

    const matchedKeywords =
      jdKeywords.filter(
        (keyword) =>
          resumeText.includes(
            keyword.toLowerCase()
          )
      )

    const missingKeywords =
      jdKeywords.filter(
        (keyword) =>
          !resumeText.includes(
            keyword.toLowerCase()
          )
      )

    const atsScore =
      Math.min(
        100,
        Math.round(
          (matchedKeywords.length /
            jdKeywords.length) * 100
        )
      )

    optimizedResume.atsScore =
      atsScore

    optimizedResume.missingKeywords =
      missingKeywords.slice(0, 15)

    // RECRUITER FEEDBACK

    if (
      !optimizedResume.recruiterFeedback ||
      optimizedResume.recruiterFeedback.length === 0
    ) {

      optimizedResume.recruiterFeedback = [
        "Resume shows strong alignment with the target role.",
        "Professional experience demonstrates industry relevance.",
        "Resume formatting is ATS-friendly and easy to scan."
      ]
    }

    // RESUME IMPACT

    if (
      !optimizedResume.resumeImpact
    ) {

      optimizedResume.resumeImpact =
        "This resume demonstrates strong potential for recruiter shortlisting and ATS compatibility."
    }

    // IMPROVEMENT SUGGESTIONS

    if (
      !optimizedResume.improvementSuggestions ||
      optimizedResume.improvementSuggestions.length === 0
    ) {

      optimizedResume.improvementSuggestions = [
        "Add more measurable achievements.",
        "Include leadership-oriented keywords.",
        "Highlight technical tools more prominently."
      ]
    }

    return NextResponse.json({
      success: true,
      optimizedResume,
      originalText: extractedText
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error: "Something went wrong"
    })
  }
}