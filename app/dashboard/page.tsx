"use client"

import { useEffect, useState } from "react"
import {
  getHistory,
  deleteHistory
} from "@/lib/history"
import { useUser } from "@clerk/nextjs"

export default function DashboardPage() {

  const { user } = useUser()

  const [history, setHistory] =
    useState<any[]>([])
   const [search, setSearch] =
  useState("") 
   
   const [selectedItem, setSelectedItem] =
  useState<any>(null) 

  useEffect(() => {

    async function loadHistory() {

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

    loadHistory()

  }, [user])

  return (

    <div className="max-w-6xl mx-auto p-8">

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        📊 My Dashboard
      </h1>
      <input
  type="text"
  placeholder="Search history..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="
    w-full
    p-4
    rounded-2xl
    border
    mb-8
  "
/>

      <div
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >

        {
          history
  .filter(item =>
    item.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map(
            (item) => (

              <div
                key={item.id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-lg
                  p-6
                  border
                "
              >

                <h2
                  className="
                    text-xl
                    font-bold
                    mb-2
                  "
                >
                  {item.title}
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mb-4
                  "
                >
                  {item.type}
                </p>

                <p
                  className="
                    text-xs
                    text-gray-400
                  "
                >
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
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
  "
>
  View Details
</button>
<button
  onClick={async () => {

    await deleteHistory(item.id)

    setHistory(
      history.filter(
        h => h.id !== item.id
      )
    )
  }}
  className="
    mt-4
    ml-2
    bg-red-500
    text-white
    px-4
    py-2
    rounded-xl
  "
>
  Delete
</button>

              </div>

            )
          )
        }

      </div>

      {selectedItem && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div
      style={{
        background: "white",
        width: "90%",
        maxWidth: "1000px",
        height: "80vh",
        overflowY: "auto",
        padding: "20px",
        borderRadius: "20px"
      }}
    >
      <button
        onClick={() => setSelectedItem(null)}
        style={{
          background: "red",
          color: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          marginBottom: "20px"
        }}
      >
        Close
      </button>

      <button
  onClick={() => {

    navigator.clipboard.writeText(
      typeof selectedItem.content ===
      "string"
        ? selectedItem.content
        : JSON.stringify(
            selectedItem.content,
            null,
            2
          )
    )

    alert("Copied")
  }}
  style={{
    background: "black",
    color: "white",
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "20px",
    marginLeft: "10px"
  }}
>
  Copy
</button>

      <div className="space-y-6">

  {selectedItem.content?.atsScore && (

    <div>

      <h3 className="text-3xl font-bold text-green-600">
  ATS Score: {selectedItem.content.atsScore}/100
</h3>

    </div>

  )}

{selectedItem.content?.matchScore && (

  <div>

    <h3 className="text-2xl font-bold">
      Match Score: {selectedItem.content.matchScore}%
    </h3>

  </div>

)}
  {selectedItem.content?.strengths && (

    <div>

      <h3 className="text-xl font-bold mb-2">
        Strengths
      </h3>

      <ul className="list-disc pl-6">

        {selectedItem.content.strengths.map(
          (item: string, index: number) => (

            <li key={index}>
              {item}
            </li>

          )
        )}

      </ul>

    </div>

  )}

  {selectedItem.content?.weaknesses && (

    <div>

      <h3 className="text-xl font-bold mb-2">
        Weaknesses
      </h3>

      <ul className="list-disc pl-6">

        {selectedItem.content.weaknesses.map(
          (item: string, index: number) => (

            <li key={index}>
              {item}
            </li>

          )
        )}

      </ul>

    </div>

  )}

  {selectedItem.content?.recommendations && (

    <div>

      <h3 className="text-xl font-bold mb-2">
        Recommendations
      </h3>

      <ul className="list-disc pl-6">

        {selectedItem.content.recommendations.map(
          (item: string, index: number) => (

            <li key={index}>
              {item}
            </li>

          )
        )}

      </ul>

    </div>

  )}
  {selectedItem.content?.missingKeywords && (

  <div>

    <h3 className="text-xl font-bold mb-2">
      Missing Keywords
    </h3>

    <ul className="list-disc pl-6">

      {selectedItem.content.missingKeywords.map(
        (item: string, index: number) => (

          <li key={index}>
            {item}
          </li>

        )
      )}

    </ul>

  </div>

)}

  {!selectedItem.content?.atsScore &&


 !selectedItem.content?.matchScore && (

  <pre
    style={{
      whiteSpace: "pre-wrap",
      wordBreak: "break-word"
    }}
  >
    {typeof selectedItem.content === "string"
      ? selectedItem.content
      : JSON.stringify(
          selectedItem.content,
          null,
          2
        )}
  </pre>

)}

</div>
    </div>
  </div>
)}

    </div>
  )
}