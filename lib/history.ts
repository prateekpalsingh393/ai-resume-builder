import { supabase } from "./supabase"

export async function saveHistory(
  email: string,
  type: string,
  title: string,
  content: any
) {

  const result = await supabase
    .from("user_history")
    .insert([
      {
        email,
        type,
        title,
        content
      }
    ])

  console.log("SAVE HISTORY RESULT:")
  console.log(result)

  return result
}

export async function getHistory(
  email: string
) {

  return await supabase
    .from("user_history")
    .select("*")
    .eq("email", email)
    .order(
      "created_at",
      {
        ascending: false
      }
    )
}

export async function deleteHistory(
  id: string
) {

  return await supabase
    .from("user_history")
    .delete()
    .eq("id", id)
}