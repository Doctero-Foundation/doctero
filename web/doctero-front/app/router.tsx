import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routerWithQueryClient } from "@tanstack/react-router-with-query"
import { makeQueryClient } from "./lib/query"
import { routeTree } from "./routeTree.gen"

export function createRouter() {
  const queryClient = makeQueryClient()

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient, token: null },
      defaultPreloadStaleTime: 0,
      scrollRestoration: true,
      defaultStructuralSharing: true,
    }),
    queryClient
  )
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
