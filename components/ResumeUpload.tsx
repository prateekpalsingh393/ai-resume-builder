"use client"

import jsPDF from "jspdf"
import html2canvas from "html2canvas-pro"
import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"

import ModernTemplate from "@/components/templates/ModernTemplate"
import MinimalTemplate from "@/components/templates/MinimalTemplate"
import CorporateTemplate from "@/components/templates/CorporateTemplate"

import { supabase } from "@/lib/supabase"

import {
  useUser,
  SignInButton
} from "@clerk/nextjs"

export default function ResumeUpload() {

  const [jobDescription, setJobDescription] =
    useState("")

  const [selectedTemplate, setSelectedTemplate] =
    useState("modern")

  const [loading, setLoading] =
  useState(false)

const { user } = useUser()

useEffect(() => {

  if (!user) return

  createUserProfile()

}, [user])

const [selectedFile, setSelectedFile] =
  useState<File | null>(null)

  const [optimizedResume, setOptimizedResume] =
    useState<Record<string, any> | null>(null)

  const [originalResumeText, setOriginalResumeText] =
    useState("")

    const [coverLetter, setCoverLetter] =
  useState("")

const [coverLetterLoading,
  setCoverLetterLoading] =
  useState(false)

  const [interviewPrep,
  setInterviewPrep] =
  useState("")

const [interviewLoading,
  setInterviewLoading] =
  useState(false)

  const [credits,
  setCredits] =
  useState<number | null>(null)

  const [showUpgradeModal,
  setShowUpgradeModal] =
  useState(false)

  // PDF Download
  const downloadPDF = async () => {

    const input =
      document.getElementById("resume-template")

    if (!input) return

    const canvas = await html2canvas(input, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true
    })

    const imgData =
      canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")

    const pdfWidth = 210

    const pageHeight = 295

    const imgWidth = pdfWidth

    const imgHeight =
      (canvas.height * imgWidth) /
      canvas.width

    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    )

    heightLeft -= pageHeight

    while (heightLeft > 0) {

      position = heightLeft - imgHeight

      pdf.addPage()

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      )

      heightLeft -= pageHeight
    }

    pdf.save("ATS-Resume.pdf")
  }

  async function createUserProfile() {

  if (!user) return

  try {

    const email =
      user.primaryEmailAddress
        ?.emailAddress

    const { data } =
      await supabase
        .from("users_data")
        .select("*")
        .eq("email", email)
        .single()

    if (!data) {

  await supabase
    .from("users_data")
    .insert([
      {
        email,
        credits: 5,
        is_pro: false
      }
    ])

  setCredits(5)

} else {

  setCredits(data.credits)
}

  } catch (error) {

    console.log(error)
  }
}
async function deductCredits(
  amount: number
) {

  if (!user) return false

  try {

    const email =
      user.primaryEmailAddress
        ?.emailAddress

    const { data } =
      await supabase
        .from("users_data")
        .select("*")
        .eq("email", email)
        .single()

    if (!data) return false

    if (
      !data.is_pro &&
      data.credits < amount
    ) {

      setShowUpgradeModal(true)

      return false
    }

    if (!data.is_pro) {

      const updatedCredits =
        data.credits - amount

      await supabase
        .from("users_data")
        .update({
          credits: updatedCredits
        })
        .eq("email", email)

      setCredits(updatedCredits)
    }

    return true

  } catch (error) {

    console.log(error)

    return false
  }
}

  // STORE FILE
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {

      const file = acceptedFiles[0]

      if (!file) return

      setSelectedFile(file)

    },
    []
  )

  // ANALYZE RESUME
  const analyzeResume = async () => {

    if (!selectedFile) {
      alert("Please upload resume")
      return
    }

    if (!jobDescription) {
  alert("Please paste job description")
  return
}

const canProceed =
  await deductCredits(1)

if (!canProceed) return

setLoading(true)

    const formData = new FormData()

    formData.append(
      "resume",
      selectedFile
    )

    formData.append(
      "jobDescription",
      jobDescription
    )

    try {

      const response = await fetch(
        "/api/analyze",
        {
          method: "POST",
          body: formData
        }
      )

      const data = await response.json()

      console.log(data)

      if (data.originalText) {

        setOriginalResumeText(
          data.originalText
        )
      }

      if (data.optimizedResume) {

  const shareId =
  crypto.randomUUID()

setOptimizedResume({
  ...data.optimizedResume,
  share_id: shareId
})
  
  // SAVE TO SUPABASE

  await supabase
  .from("resumes")
  .insert([
    {
  user_email:
    user?.primaryEmailAddress?.emailAddress,

  original_resume:
    data.originalText,

  optimized_resume:
    data.optimizedResume,

  ats_score:
    data.optimizedResume.atsScore,

  share_id: shareId,

  template:
    selectedTemplate
}
  ])
}

    } catch (error) {

      console.log(error)

      alert("Analysis failed")

    } finally {

      setLoading(false)
    }
    }
  async function generateCoverLetter() {

  if (!optimizedResume) return

const canProceed =
  await deductCredits(1)

if (!canProceed) return

setCoverLetterLoading(true)

  try {

    const response = await fetch(
      "/api/cover-letter",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          optimizedResume,
          jobDescription
        })
      }
    )

    const data =
      await response.json()

    if (data.coverLetter) {

      setCoverLetter(
        data.coverLetter
      )
    }

  } catch (error) {

    console.log(error)

    alert(
      "Failed to generate cover letter"
    )

  } finally {

    setCoverLetterLoading(false)
  }
}

async function
generateInterviewPrep() {

  if (!optimizedResume) return

const canProceed =
  await deductCredits(2)

if (!canProceed) return

setInterviewLoading(true)

  try {

    const response =
      await fetch(
        "/api/interview-prep",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            optimizedResume,
            jobDescription
          })
        }
      )

    const data =
      await response.json()

    if (data.interviewPrep) {

      setInterviewPrep(
        data.interviewPrep
      )
    }

  } catch (error) {

    console.log(error)

    alert(
      "Failed to generate interview prep"
    )

  } finally {

    setInterviewLoading(false)
  }
}

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"]
    }
  })

  return (

  <>
  
  <div className="flex justify-end mb-6">

  <div
    className="
      bg-black
      text-white
      px-5
      py-2
      rounded-2xl
      shadow-xl
      text-sm
      font-semibold
    "
  >

    Credits Left:
    {" "}
    {credits ?? "..."}

  </div>

</div>
    
    <div className="w-full">

      {/* Upload Box */}
      <div
        {...getRootProps()}
        className="
          border-2
          border-dashed
          rounded-3xl
          p-6 md:p-12
          text-center
          cursor-pointer
          bg-white/40
          backdrop-blur-xl
          border-white/30
          shadow-xl
          hover:bg-white/50
          transition
        "
      >

        <input {...getInputProps()} />

        {
          isDragActive ? (

            <p className="text-base md:text-lg">
              Drop the resume here...
            </p>

          ) : (

            <div>

              <p className="text-xl md:text-2xl font-bold">
                Drag & Drop Resume
              </p>

              <p className="text-gray-600 mt-3 text-sm md:text-base">
                Upload DOCX Resume
              </p>

            </div>

          )
        }

      </div>

      {/* Selected File */}
      {
        selectedFile && (

          <p className="mt-4 text-center text-sm text-gray-600 break-all">
            Selected File:
            {" "}
            {selectedFile.name}
          </p>

        )
      }

      {/* Job Description */}
      <div className="mt-8">

        <textarea
          placeholder="Paste Job Description Here..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          className="
            w-full
            border
            border-white/30
            bg-white/40
            backdrop-blur-xl
            shadow-xl
            rounded-3xl
            p-4 md:p-6
            min-h-52 md:min-h-56
            outline-none
            focus:ring-2
            focus:ring-black
            text-sm md:text-base
          "
        />

      </div>

      {/* Template Selector */}
      <div className="mt-8">

        <label className="block text-left mb-3 font-semibold text-base md:text-lg">
          Choose Resume Template
        </label>

        <select
          value={selectedTemplate}
          onChange={(e) =>
            setSelectedTemplate(e.target.value)
          }
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-white/30
            bg-white/40
            backdrop-blur-xl
            shadow-xl
            outline-none
            text-sm md:text-base
          "
        >

          <option value="modern">
            Modern Template
          </option>

          <option value="minimal">
            Minimal Template
          </option>

          <option value="corporate">
            Corporate Template
          </option>

        </select>

      </div>

      {/* Analyze Button */}
      <div className="mt-8">

        <button
          onClick={analyzeResume}
          className="
            w-full
            md:w-auto
            bg-black
            text-white
            px-8
            py-4
            rounded-2xl
            hover:scale-105
            transition
            shadow-lg
          "
        >
          Analyze Resume
        </button>

      </div>

      {/* Premium Loading */}
      {
        loading && (

          <div className="mt-10">

            <div
              className="
                bg-white/40
                backdrop-blur-xl
                border
                border-white/30
                shadow-2xl
                rounded-3xl
                p-6 md:p-10
                flex
                flex-col
                items-center
                justify-center
              "
            >

              <div className="relative w-20 h-20 md:w-24 md:h-24">

                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border-4
                    border-black/10
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border-4
                    border-transparent
                    border-t-black
                    animate-spin
                  "
                />

                <div
                  className="
                    absolute
                    inset-4
                    rounded-full
                    bg-black
                    animate-pulse
                  "
                />

              </div>

              <h3 className="mt-8 text-xl md:text-2xl font-bold text-center">
                AI is Optimizing Your Resume
              </h3>

              <p className="
                text-gray-600
                mt-3
                text-center
                max-w-xl
                leading-7
                text-sm
                md:text-base
              ">

                Matching your resume with the job description,
                improving ATS score, enhancing bullet points,
                and generating a professional layout.

              </p>

            </div>

          </div>

        )
      }

      {/* Before vs After */}
{
  optimizedResume &&
  originalResumeText && (

    <div className="mt-14">

      <h2 className="
        text-3xl
        font-bold
        text-center
        mb-8
      ">
        Before vs After
      </h2>

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
      ">

        {/* Original Resume */}
        <div
          className="
            bg-white/40
            backdrop-blur-xl
            border
            border-white/30
            shadow-xl
            rounded-3xl
            p-6
            overflow-auto
            max-h-[700px]
          "
        >

          <h3 className="
            text-2xl
            font-bold
            mb-5
          ">
            Original Resume
          </h3>

          <pre className="
            whitespace-pre-wrap
            text-sm
            leading-7
            text-gray-700
            font-sans
          ">
            {originalResumeText}
          </pre>

        </div>

        {/* AI Improvements */}
        <div
          className="
            bg-white/40
            backdrop-blur-xl
            border
            border-white/30
            shadow-xl
            rounded-3xl
            p-6
          "
        >

          <h3 className="
            text-2xl
            font-bold
            mb-5
          ">
            AI Improvements
          </h3>

          <div className="space-y-8">

            {/* ATS Score */}
            <div>

              <h4 className="font-semibold text-lg">
                ATS Score
              </h4>

              <div className="mt-4">

                <div className="
                  flex
                  items-center
                  justify-between
                  mb-4
                ">

                  <p className="text-5xl font-bold">

                    {optimizedResume.atsScore}

                    <span className="
                      text-2xl
                      text-gray-500
                    ">
                      /100
                    </span>

                  </p>

                  <div
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold

                      ${
                        optimizedResume.atsScore >= 80
                          ? "bg-green-100 text-green-700"

                          : optimizedResume.atsScore >= 60
                          ? "bg-yellow-100 text-yellow-700"

                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >

                    {
                      optimizedResume.atsScore >= 80
                        ? "Excellent"

                        : optimizedResume.atsScore >= 60
                        ? "Good"

                        : "Needs Improvement"
                    }

                  </div>

                </div>

                <div className="
                  w-full
                  h-4
                  bg-gray-200
                  rounded-full
                  overflow-hidden
                ">

                  <div
                    className={`
                      h-full
                      transition-all
                      duration-1000

                      ${
                        optimizedResume.atsScore >= 80
                          ? "bg-green-500"

                          : optimizedResume.atsScore >= 60
                          ? "bg-yellow-500"

                          : "bg-red-500"
                      }
                    `}
                    style={{
                      width: `${optimizedResume.atsScore}%`
                    }}
                  />

                </div>

              </div>

            </div>

            {/* Strengths */}
            <div>

              <h4 className="font-semibold text-lg">
                Strengths
              </h4>

              <ul className="
                list-disc
                ml-6
                mt-3
                space-y-2
              ">

                {
                  optimizedResume.strengths?.map(
                    (
                      item: string,
                      index: number
                    ) => (

                      <li key={index}>
                        {item}
                      </li>

                    )
                  )
                }

              </ul>

            </div>

            {/* Missing Keywords */}
            <div>

              <h4 className="font-semibold text-lg">
                Missing Keywords
              </h4>

              <div className="
                flex
                flex-wrap
                gap-2
                mt-3
              ">

                {
                  optimizedResume.missingKeywords?.map(
                    (
                      keyword: string,
                      index: number
                    ) => (

                      <span
                        key={index}
                        className="
                          bg-red-100
                          text-red-700
                          px-3
                          py-2
                          rounded-full
                          text-sm
                        "
                      >
                        {keyword}
                      </span>

                    )
                  )
                }

              </div>

            </div>

            {/* Recruiter Feedback */}
            <div>

              <h4 className="font-semibold text-lg">
                Recruiter Feedback
              </h4>

              <ul className="
                list-disc
                ml-6
                mt-3
                space-y-2
              ">

                {
                  optimizedResume.recruiterFeedback?.map(
                    (
                      item: string,
                      index: number
                    ) => (

                      <li key={index}>
                        {item}
                      </li>

                    )
                  )
                }

              </ul>

            </div>

            {/* Resume Impact */}
            <div>

              <h4 className="font-semibold text-lg">
                Resume Impact
              </h4>

              <p className="
                mt-3
                text-gray-700
                leading-7
              ">

                {optimizedResume.resumeImpact}

              </p>

            </div>

            {/* Improvement Suggestions */}
            <div>

              <h4 className="font-semibold text-lg">
                Improvement Suggestions
              </h4>

              <ul className="
                list-disc
                ml-6
                mt-3
                space-y-2
              ">

                {
                  optimizedResume.improvementSuggestions?.map(
                    (
                      item: string,
                      index: number
                    ) => (

                      <li key={index}>
                        {item}
                      </li>

                    )
                  )
                }

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

      {/* Resume Result */}
{
  optimizedResume && (

    <div className="mt-10 overflow-x-auto">
      <div
  className="
    flex
    flex-wrap
    justify-center
    items-center
    gap-5
    mt-10
  "
>

  <button
    onClick={generateCoverLetter}
    className="
      bg-gradient-to-r
      from-indigo-600
      to-purple-600
      text-white
      px-8
      py-4
      rounded-2xl
      hover:scale-105
      transition
      shadow-2xl
      text-lg
      font-semibold
      min-w-[260px]
    "
  >

    {
      coverLetterLoading
        ? "Generating..."
        : "✨ Generate AI Cover Letter"
    }

  </button>

  <button
    onClick={generateInterviewPrep}
    className="
      bg-gradient-to-r
      from-emerald-600
      to-teal-600
      text-white
      px-8
      py-4
      rounded-2xl
      hover:scale-105
      transition
      shadow-2xl
      text-lg
      font-semibold
      min-w-[260px]
    "
  >

    {
      interviewLoading
        ? "Generating..."
        : "🎯 Generate Interview Prep"
    }

  </button>

  <button
    onClick={downloadPDF}
    className="
      bg-gradient-to-r
      from-black
      to-slate-800
      text-white
      px-8
      py-4
      rounded-2xl
      hover:scale-105
      transition
      shadow-2xl
      text-lg
      font-semibold
      min-w-[260px]
    "
  >
    ⬇ Download ATS Resume
  </button>

</div>

      

      <div className="overflow-x-auto">

        {
          selectedTemplate === "modern" && (
            <ModernTemplate
              data={optimizedResume}
            />
          )
        }

        {
          selectedTemplate === "minimal" && (
            <MinimalTemplate
              data={optimizedResume}
            />
          )
        }

        {
          selectedTemplate === "corporate" && (
            <CorporateTemplate
              data={optimizedResume}
            />
          )
        }

      </div>

    </div>

        )
      }

      {
  coverLetter && (

    <div className="mt-14">

      <div
        className="
          bg-white/40
          backdrop-blur-xl
          border
          border-white/30
          shadow-2xl
          rounded-3xl
          p-8
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-6
          "
        >

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            AI Cover Letter
          </h2>

          <button
            onClick={() =>
              navigator.clipboard.writeText(
                coverLetter
              )
            }
            className="
              bg-black
              text-white
              px-5
              py-2
              rounded-xl
            "
          >
            Copy
          </button>

          <button
  onClick={() => {

    const shareUrl =
      `${window.location.origin}/resume/${
        optimizedResume?.share_id
      }`

    navigator.clipboard.writeText(
      shareUrl
    )

    alert("Share link copied!")
  }}

  className="
    bg-indigo-600
    text-white
    px-5
    py-2
    rounded-xl
    ml-3
  "
>
  Share Resume
</button>

        </div>

        <div
          className="
            whitespace-pre-wrap
            leading-8
            text-left
            text-gray-800
            bg-white
            rounded-2xl
            p-10
            border
            border-gray-200
            shadow-inner
            font-serif
            text-[17px]
            max-w-4xl
            mx-auto
          "
        >

          {
            coverLetter
              ?.replace(/\*\*/g, "")
              ?.split("\n")
              ?.map((line, index) => (

                <p
                  key={index}
                  className="
                    mb-4
                    text-left
                  "
                >

                  {
                    line.startsWith("*")
                      ? `• ${line.replace("*", "")}`
                      : line
                  }

                </p>

              ))
          }

        </div>

      </div>

    </div>

  )
}

{
  interviewPrep && (

    <div className="mt-14">

      <div
        className="
          bg-white/40
          backdrop-blur-xl
          border
          border-white/30
          shadow-2xl
          rounded-3xl
          p-8
        "
      >

        <div className="
          flex
          items-center
          justify-between
          mb-6
        ">

          <h2 className="
            text-3xl
            font-bold
          ">
            AI Interview Prep
          </h2>

          <button
            onClick={() =>
              navigator.clipboard.writeText(
                interviewPrep
              )
            }
            className="
              bg-black
              text-white
              px-5
              py-2
              rounded-xl
            "
          >
            Copy
          </button>

        </div>

        <div
          className="
            whitespace-pre-wrap
            leading-8
            text-left
            text-gray-800
            bg-white
            rounded-2xl
            p-10
            border
            border-gray-200
            shadow-inner
            font-serif
            text-[17px]
            max-w-5xl
            mx-auto
          "
        >

          {
            interviewPrep
              ?.replace(/\*\*/g, "")
          }

        </div>

      </div>

    </div>

  )
}
    </div>

    {
  showUpgradeModal && (

    <div
      className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          p-10
          max-w-md
          w-full
          shadow-2xl
          text-center
        "
      >

        <h2
          className="
            text-4xl
            font-extrabold
            mb-4
          "
        >
          Upgrade to Pro 🚀
        </h2>

        <p
          className="
            text-gray-600
            text-lg
            mb-8
          "
        >
          You’ve used all your credits.

          Upgrade to Pro for:
        </p>

        <div
          className="
            space-y-3
            text-left
            mb-8
            text-gray-700
          "
        >

          <p>
            ✅ Unlimited Resume Analysis
          </p>

          <p>
            ✅ Unlimited Cover Letters
          </p>

          <p>
            ✅ Unlimited Interview Prep
          </p>

          <p>
            ✅ Premium Templates
          </p>

        </div>

        <div
          className="
            flex
            gap-4
          "
        >

          <button
            onClick={() =>
              setShowUpgradeModal(false)
            }
            className="
              flex-1
              border
              border-gray-300
              py-3
              rounded-2xl
              font-semibold
            "
          >
            Later
          </button>

          <button
            onClick={() =>
              window.location.href =
                "/pricing"
            }
            className="
              flex-1
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              text-white
              py-3
              rounded-2xl
              font-bold
              shadow-xl
            "
          >
            Upgrade
          </button>

        </div>

      </div>

    </div>

  )
}

</>

)
}