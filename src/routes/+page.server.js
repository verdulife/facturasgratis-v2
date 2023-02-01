import { supabase } from "$lib/supabase";

export async function load() {
  const { data } = await supabase.from("users_data").select();
  return {
    users_data: data ?? [],
  };
}