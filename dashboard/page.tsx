"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

export default function DashboardPage() {

  const [resumes, setResumes] =
    useState<any[]>([])

  useEffect(() => {

    fetchResumes()

  }, [])

  const fetchResumes = async () => {

    const { data, error } =
      await supabase
        .from("resumes")
        .select("*")
        .order("created_at", {
          ascending: false
        })

    if (error) {

      console.log(error)
      return
    }

    setResumes(data || [])
  }

  return (

    <main className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-white
      to-gray-200
      p-8
    ">

      <div className="max-w-7xl mx-auto">

        <h1 className="
          text-5xl
          font-extrabold
          mb-10
        ">
          Resume Dashboard
        </h1>

        {
          resumes.length === 0 && (

            <div className="
              bg-white/40
              backdrop-blur-xl
              border
              border-white/30
              shadow-xl
              rounded-3xl
              p-10
              text-center
            ">

              <h2 className="
                text-2xl
                font-bold
              ">
                No Resumes Found
              </h2>

              <p className="
                text-gray-600
                mt-3
              ">
                Analyze a resume first.
              </p>

            </div>

          )
        }

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">

          {
            resumes.map((resume) => (

              <div
                key={resume.id}
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

                <div className="
                  flex
                  items-center
                  justify-between
                  mb-4
                ">

                  <h2 className="
                    text-xl
                    font-bold
                    truncate
                  ">
                    {resume.file_name}
                  </h2>

                  <div className="
                    bg-black
                    text-white
                    px-3
                    py-1
                    rounded-full
                    text-sm
                  ">
                    {resume.ats_score}/100
                  </div>

                </div>

                <p className="
                  text-sm
                  text-gray-600
                  mb-4
                ">
                  Template:
                  {" "}
                  {resume.template}
                </p>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  {
                    new Date(
                      resume.created_at
                    ).toLocaleString()
                  }
                </p>

              </div>

            ))
          }

        </div>

      </div>

    </main>
  )
}