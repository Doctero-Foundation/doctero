import { getUser } from "@/utils/get-user"
import { Button } from "@doctero/ui/components/button"
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
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
