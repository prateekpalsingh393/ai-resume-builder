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

    const completion =
      await openai.chat.completions.create({

        model:
          "deepseek/deepseek-chat",

        max_tokens: 2000,

        messages: [

          {
            role: "system",

            content: `
Analyze resume against job description.

Return ONLY raw JSON.

Do not use markdown.
Do not use code blocks.
Do not add explanations.

Format:

{
  "matchScore": 85,
  "missingKeywords": [],
  "strengths": [],
  "recommendations": []
}
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

    const content =
  completion.choices?.[0]
    ?.message?.content || "{}"

console.log("RAW AI RESPONSE:")
console.log(content)

let result = {
  matchScore: 0,
  missingKeywords: [],
  strengths: [],
  recommendations: []
}

try {

  const jsonMatch =
    content.match(
      /\{[\s\S]*\}/
    )

  if (jsonMatch) {

    result =
      JSON.parse(
        jsonMatch[0]
      )
  }

} catch (parseError) {

  console.log(
    "JSON Parse Error:",
    parseError
  )

  console.log(
    "Failed Content:",
    content
  )
}

return NextResponse.json(result)

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      matchScore: 0,
      missingKeywords: [],
      strengths: [],
      recommendations: []
    })
  }
}