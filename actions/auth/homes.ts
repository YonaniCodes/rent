import supabaseAdmin from "@/db/supabase-admin";
export const getHome = async (id: number) => {
  const { data, error } = await supabaseAdmin
    .from("homes")
    .select(
      `
      *,
      listedBy:profiles(
        *,
        company:companies(
        *
        )
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching home:", error);
    return null;
  }

  return data;
};

export const getHomes = async (lat: string, lng: string) => {
  console.log(lat, lng);
  const { data, error } = await supabaseAdmin.from("homes").select(
    `
      *,
      listedBy:profiles(
        *,
        company:companies(
        *
        )
      )
    `
  );

  if (error) {
    console.error("Error fetching home:", error);
    return null;
  }

  return data;
};
