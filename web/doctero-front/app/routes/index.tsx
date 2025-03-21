import { authMiddleware } from "@/middlewares/auth"
import { Button } from "@doctero/ui/components/Button"
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router"
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

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async (props) => {
    console.log("props", props)
    const { token } = await getUser()
    if (!token) {
      throw redirect({ to: "/login", statusCode: 302 })
    }
  },
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <Button
      type="button"
      onClick={() => {
        router.invalidate()
      }}
    >
      Add 1 to {state}?
    </Button>
  )
}
