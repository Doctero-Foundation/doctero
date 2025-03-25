import { authMiddleware } from "@/middlewares/auth"
import { createServerFn } from "@tanstack/react-start"
import { getWebRequest } from "vinxi/server"

// only to simulate authentication verification
export const getUser = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<{ token: string | null }> => {
    const { headers } = getWebRequest()

    if (!context.isAuthenticated) {
      return { token: null }
    }

    return { token: headers.get("Authorization") || null }
  })
