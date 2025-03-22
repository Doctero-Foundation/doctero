import { QueryClient } from "@tanstack/react-query"

// https://github.com/EskiMojo14/retrospecs-start/blob/main/src/db/query.ts
export const makeQueryClient = (staleTime = 1000 * 60 * 5) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  })
