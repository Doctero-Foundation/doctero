import { registerGlobalMiddleware } from "@tanstack/react-start"
import { authMiddleware } from "./middlewares/auth"

registerGlobalMiddleware({
  middleware: [authMiddleware],
})
