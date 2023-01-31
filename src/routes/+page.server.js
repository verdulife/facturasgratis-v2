import { supabase } from "$lib/supabase";

export async function load() {
  const data = await supabase.from("bills").select();

  console.log(data);
  return {
    users_data: data ?? [],
  };
}