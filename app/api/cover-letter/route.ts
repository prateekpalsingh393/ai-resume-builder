import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
})

export async function POST(
  req: NextRequest
) {

  try {

    const body = await req.json()

    const {
      optimizedResume,
      jobDescription
    } = body

    const currentDate =
  new Date().toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  )

    const completion =
      await openai.chat.completions.create({

        model: "deepseek/deepseek-chat",

        messages: [
          {
            role: "system",
            content: `

You are an expert professional job application letter writer.

Generate a modern,
human sounding,
professional cover letter.

STYLE:
- Similar to traditional job application letter
- Clean formatting
- Professional greeting
- Strong introduction
- Mention candidate skills
- Mention company/job relevance
- Professional closing
- Put phone and email below candidate name
- Human tone
- Easy to read
- Avoid robotic AI wording
- Keep it concise
- ATS friendly

FORMAT:

Use today's real date.

Hiring Manager Name
Company Name

Subject: Application for [Job Role]

Dear Hiring Manager,

Cover letter body...

Sincerely,

Candidate Name
Phone Number
Email Address

Return ONLY the final cover letter text.

`
          },

          {
            role: "user",
            content: `

RESUME:

${JSON.stringify(
  optimizedResume
)}

TODAY DATE:

${currentDate}

JOB DESCRIPTION:

${jobDescription}

`
          }
        ]
      })

    const coverLetter =
      completion
        .choices[0]
        .message
        .content

    return NextResponse.json({
      success: true,
      coverLetter
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error:
        "Failed to generate cover letter"
    })
  }
}