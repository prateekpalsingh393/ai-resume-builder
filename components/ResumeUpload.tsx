"use client"

import jsPDF from "jspdf"
import html2canvas from "html2canvas-pro"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import ResumeTemplate from "@/components/ResumeTemplate"

export default function ResumeUpload() {

  const [jobDescription, setJobDescription] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null)

  const [optimizedResume, setOptimizedResume] =
    useState<Record<string, any> | null>(null)

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

  // ONLY STORE FILE
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {

      const file = acceptedFiles[0]

      if (!file) return

      setSelectedFile(file)

    },
    []
  )

  // ANALYZE BUTTON FUNCTION
  const analyzeResume = async () => {

    if (!selectedFile) {
      alert("Please upload resume")
      return
    }

    if (!jobDescription) {
      alert("Please paste job description")
      return
    }

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

      if (data.optimizedResume) {

        setOptimizedResume(
          data.optimizedResume
        )
      }

    } catch (error) {

      console.log(error)

      alert("Analysis failed")

    } finally {

      setLoading(false)
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

    <div className="w-full">

      {/* Upload Box */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 rounded-2xl p-12 text-center cursor-pointer bg-white hover:bg-gray-50 transition"
      >

        <input {...getInputProps()} />

        {
          isDragActive ? (

            <p className="text-lg">
              Drop the resume here...
            </p>

          ) : (

            <div>

              <p className="text-xl font-semibold">
                Drag & Drop Resume
              </p>

              <p className="text-gray-500 mt-2">
                Upload DOCX Resume
              </p>

            </div>

          )
        }

      </div>

      {/* Selected File */}
      {
        selectedFile && (

          <p className="mt-4 text-center text-sm text-gray-600">
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
          className="w-full border border-gray-300 rounded-2xl p-5 min-h-55 outline-none focus:ring-2 focus:ring-black"
        />

      </div>

      {/* Analyze Button */}
      <div className="mt-6">

        <button
          onClick={analyzeResume}
          className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition"
        >
          Analyze Resume
        </button>

      </div>

      {/* Loading */}
      {
        loading && (

          <p className="mt-6 text-center text-lg font-medium">
            Optimizing Resume with AI...
          </p>

        )
      }

      {/* Resume Result */}
      {
        optimizedResume && (

          <div className="mt-10">

            <div className="flex justify-end mb-4">

              <button
                onClick={downloadPDF}
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Download PDF
              </button>

            </div>

            <ResumeTemplate
              data={optimizedResume}
            />

          </div>

        )
      }

    </div>
  )
}