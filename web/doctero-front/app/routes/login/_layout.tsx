import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login/_layout")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full w-full bg-gray-500">
      <Outlet />
    </div>
  )
}
