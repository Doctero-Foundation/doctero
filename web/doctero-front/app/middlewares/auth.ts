import { createMiddleware } from "@tanstack/react-start"

export const authMiddleware = createMiddleware().server(async (props) => {
  const token = null

  if (!token) {
    return props.next({ context: { isAuthenticated: false } })
  }

  return props.next({ context: { isAuthenticated: true } })
})
