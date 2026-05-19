import { supabase }
from "@/lib/supabase"

import ModernTemplate
from "@/components/templates/ModernTemplate"

export default async function
SharedResume({
  params
}: {
  params: {
    id: string
  }
}) {

  const { data } =
    await supabase
      .from("resumes")
      .select("*")
      .eq(
        "share_id",
        params.id
      )
      .single()

  if (!data) {

    return (
      <div className="p-20">
        Resume not found
      </div>
    )
  }

  return (

    <main className="
      min-h-screen
      bg-gray-100
      p-10
    ">

      <ModernTemplate
        data={
          data.optimized_resume
        }
      />

    </main>
  )
}