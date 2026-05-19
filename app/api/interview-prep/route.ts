import { NextRequest, NextResponse }
from "next/server"

import OpenAI from "openai"

const openai = new OpenAI({
  baseURL:
    "https://openrouter.ai/api/v1",

  apiKey:
    process.env.OPENROUTER_API_KEY
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

    const completion =
      await openai.chat.completions.create({

        model:
          "deepseek/deepseek-chat",

          max_tokens: 3000,

        messages: [

          {
            role: "system",

            content: `

You are an expert technical interviewer.

Generate:

1. HR interview questions
2. Technical interview questions
3. Behavioral interview questions
4. Suggested answers

RULES:
- Questions must match resume
- Questions must match job description
- Professional format
- Easy to read
- ATS and recruiter focused
- Return structured content
- Human sounding

`
          },

          {
            role: "user",

            content: `

RESUME:

${JSON.stringify(
  optimizedResume
)}

JOB DESCRIPTION:

${jobDescription}

`
          }
        ]
      })

    const interviewPrep =
      completion
        .choices[0]
        .message
        .content

    return NextResponse.json({
      success: true,
      interviewPrep
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error:
        "Failed to generate interview prep"
    })
  }
}