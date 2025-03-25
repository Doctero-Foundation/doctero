import { getUser } from "@/utils/get-user"
import { Button } from "@doctero/ui/components/button"
import { Input } from "@doctero/ui/components/input"
import { useMutation } from "@tanstack/react-query"
import { Link, createFileRoute, redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

const authSchema = z.object({
  email: z.string().email({ message: "Insira um email válido" }).nonempty("O email é obrigatório"),
  password: z
    .string()
    .min(6, { message: "A senha deve conter pelo menos 6 caracteres" })
    .nonempty("A senha é obrigatória"),
})

export const authFn = createServerFn()
  .validator(authSchema)
  .handler(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })

    return {
      statusCode: 201,
      body: {
        message: "Login realizado com sucesso",
      },
    }
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
  beforeLoad: async () => {
    const { token } = await getUser()
    if (token) {
      throw redirect({ to: "/", statusCode: 302 })
    }
  },
})

function RouteComponent() {
  const loginMutation = useMutation({
    mutationFn: authFn,
    onSuccess: (data) => {
      console.log("success", data)
    },
    onError: (error) => {
      console.log("error", error)
    },
  })

  return (
    <div className="flex w-full flex-col items-start gap-8">
      <h2 className="font-extrabold text-5xl text-title">Entrar</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()

          const formData = new FormData(e.target as HTMLFormElement)

          loginMutation.mutate({
            data: {
              email: formData.get("email") as string,
              password: formData.get("password") as string,
            },
          })
        }}
        className="flex w-full flex-col gap-4"
      >
        <Input name="email" placeholder="Email" className="mb-1" />
        <Input name="password" placeholder="Senha" />

        <Button
          asChild
          variant="ghost"
          className="h-fit w-fit self-end p-0 font-semibold text-description hover:bg-transparent"
        >
          <Link to="..">Esqueci minha senha</Link>
        </Button>
        <Button type="submit" className="mt-8 h-14 font-bold">
          {loginMutation.isPending ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-primary-foreground border-r-primary border-b-primary border-l-primary-foreground" />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
      <div className="mx-auto mt-4 flex flex-col items-center justify-center gap-1">
        <p className="font-medium text-description text-sm">Não possui uma conta?</p>
        <Button
          asChild
          variant="ghost"
          className="h-fit w-fit p-0 font-bold text-primary hover:bg-transparent"
        >
          <Link to="..">Cadastrar</Link>
        </Button>
      </div>
    </div>
  )
}
