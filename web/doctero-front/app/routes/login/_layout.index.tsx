import { authMiddleware } from "@/middlewares/auth"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getWebRequest } from "vinxi/server"

const getUser = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { headers } = getWebRequest()

    if (!context.isAuthenticated) {
      return { token: null }
    }

    return { token: headers.get("Authorization") || null }
  })

export const Route = createFileRoute("/login/_layout/")({
  head: () => ({
    meta: [
      {
        title: "Entrar | Doctero",
      },
    ],
  }),
  component: RouteComponent,
  beforeLoad: async (props) => {
    console.log("props", props)
    const { token } = await getUser()
    if (token) {
      throw redirect({ to: "/", statusCode: 302 })
    }
  },
})

function RouteComponent() {
  return <div>Hello "/login/_layout/login"!</div>
}
