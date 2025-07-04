import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabaseClient from "@/db/supabase";

type SupabaseQueryParams<T> = {
  queryKey: string;
  table: string;
  column: string;
  value: string | number | null;
  select?: string;
  single?: boolean;
};

export function useSupabaseQuery<T>({
  queryKey,
  table,
  column,
  value,
  select = "*",
  single = true,
}: SupabaseQueryParams<T>): UseQueryResult<T, Error> {
  return useQuery<T, Error>({
    queryKey: [queryKey, value],
    queryFn: async (): Promise<T> => {
      const baseQuery = supabaseClient
        .from(table)
        .select(select)
        .eq(column, value);

      const response: PostgrestSingleResponse<T> = single
        ? await baseQuery.single()
        : await baseQuery;

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    enabled: !!value,
  });
}
