import { NextRequest, NextResponse } from "next/server"
import mammoth from "mammoth"
import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
})

export async function POST(req: NextRequest) {

  try {

    const formData = await req.formData()

    const file = formData.get("resume") as File
    
    const jobDescription =
  formData.get("jobDescription") as string

    if (!file) {
      return NextResponse.json({
        error: "No file uploaded"
      })
    }

    const bytes = await file.arrayBuffer()

    const buffer = Buffer.from(bytes)

    let extractedText = ""

    // DOCX Parsing
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {

      const result = await mammoth.extractRawText({
        buffer
      })

      extractedText = result.value
    }

    // AI Resume Optimization
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",

      messages: [
        {
          role: "system",
          content: `


Analyze the uploaded resume against the provided job description.

Compare:
- skills
- experience
- keywords
- ATS compatibility

Generate:
- ATS score based on JD match
- missing keywords from JD
- strengths
- weaknesses
- optimized ATS-friendly resume

You are an ATS resume optimization expert.

Analyze the uploaded resume carefully.

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
  "missingKeywords": []
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

    let optimizedResume

    try {

      console.log(aiResponse)

const cleanedResponse = aiResponse
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim()

console.log(cleanedResponse)

try {

  optimizedResume = JSON.parse(cleanedResponse)
  // Fallback values

optimizedResume.email =
  optimizedResume.email ||
  extractedText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ||
  ""

optimizedResume.phone =
  optimizedResume.phone ||
  extractedText.match(/(\+91[\-\s]?)?[0]?[6789]\d{9}/)?.[0] ||
  ""

optimizedResume.location =
  optimizedResume.location ||
  "India"

optimizedResume.linkedin =
  optimizedResume.linkedin ||
  ""

optimizedResume.atsScore =
  optimizedResume.atsScore ||
  "85"

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

if (
  !optimizedResume.weaknesses ||
  optimizedResume.weaknesses.length === 0
) {
  optimizedResume.weaknesses = [
    "Add more quantified achievements",
    "Improve leadership-focused keywords"
  ]
}

if (
  !optimizedResume.missingKeywords ||
  optimizedResume.missingKeywords.length === 0
) {
  optimizedResume.missingKeywords = [
    "Leadership",
    "Stakeholder Management",
    "KPI Optimization"
  ]
}

if (!optimizedResume.atsScore) {
  optimizedResume.atsScore = "85"
}
  [
    "Strong analytical thinking",
    "Good communication skills",
    "ATS-friendly structure"
  ]

optimizedResume.weaknesses =
  optimizedResume.weaknesses ||
  [
    "Add more quantified achievements",
    "Improve leadership keywords"
  ]

optimizedResume.missingKeywords =
  optimizedResume.missingKeywords ||
  [
    "Leadership",
    "Stakeholder Management",
    "KPI Optimization"
  ]

} catch (parseError) {

  console.log("JSON Parse Error:", parseError)

  return NextResponse.json({
    error: "AI returned invalid JSON",
    raw: cleanedResponse
  })
}

    } catch {

      return NextResponse.json({
        error: "Invalid AI response",
        raw: aiResponse
      })
    }

    return NextResponse.json({
      success: true,
      optimizedResume
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error: "Something went wrong"
    })

  }

}