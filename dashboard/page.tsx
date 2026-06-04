"use client"

import { useEffect, useState } from "react"

import { useUser } from "@clerk/nextjs"

import { supabase } from "@/lib/supabase"

import { getHistory } from "@/lib/history"

export default function DashboardPage() {

  const [resumes, setResumes] =
    useState<any[]>([])
  
    const [history, setHistory] =
  useState<any[]>([])  

  const [selectedItem, setSelectedItem] =
  useState<any>(null)

    const { user } = useUser()

  useEffect(() => {

  fetchResumes()
  fetchHistory()

}, [user])

const fetchHistory = async () => {

  if (!user) return

  const result =
    await getHistory(
      user.primaryEmailAddress
        ?.emailAddress || ""
    )

  if (result.data) {

    setHistory(
      result.data
    )
  }
}

  const fetchResumes = async () => {

    const { data, error } =
      await supabase
        .from("resumes")
.select("*")
.eq(
  "user_email",
  user?.primaryEmailAddress?.emailAddress
)
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

        <div className="mt-16">

          <h2 className="
            text-4xl
            font-bold
            mb-8
          ">
            History
          </h2>

          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          ">

            {
              history.map((item) => (

                <div
                  key={item.id}
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
                    text-xl
                    font-bold
                    mb-2
                  ">
                    {item.title}
                  </h3>

                  <p className="
                    text-sm
                    text-gray-600
                    mb-3
                  ">
                    {item.type}
                  </p>

                  <p className="
                    text-xs
                    text-gray-500
                  ">
                    {
                      new Date(
                        item.created_at
                      ).toLocaleString()
                    }
                  </p>

                  <button
  onClick={() =>
    setSelectedItem(item)
  }
  className="
    mt-4
    bg-black
    text-white
    px-4
    py-2
    rounded-xl
    hover:bg-gray-800
  "
>
  View Details
</button>

                </div>

              ))
            }

          </div>

        </div>

            </div>

      {selectedItem && (

        <div
          className="
            fixed
            inset-0
            bg-black/50
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
    p-8
    max-w-5xl
    w-[95%]
    h-[85vh]
    overflow-y-auto
    relative
  "
>

            <div
              className="
                flex
                justify-between
                items-center
                mb-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                {selectedItem.title}
              </h2>

              <button
                onClick={() =>
                  setSelectedItem(null)
                }
                className="
  sticky
  top-0
  bg-red-500
  text-white
  px-4
  py-2
  rounded-xl
"
              >
                Close
              </button>

            </div>

            <pre
  className="
    whitespace-pre-wrap
    break-words
    text-sm
    overflow-x-auto
  "
>
              {
                typeof selectedItem.content === "string"
                  ? selectedItem.content
                  : JSON.stringify(
                      selectedItem.content,
                      null,
                      2
                    )
              }
            </pre>

          </div>

        </div>

      )}

    </main>
  )
}