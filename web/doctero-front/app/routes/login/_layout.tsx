import { Card, CardContent } from "@doctero/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@doctero/ui/components/carousel"
import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login/_layout")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid h-full w-full grid-cols-5">
      <div className="col-span-2 grid h-full w-full place-items-center bg-white px-24 2xl:px-30">
        <Outlet />
      </div>
      <div className="col-span-3 grid h-full w-full place-items-center bg-background-auth px-27">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={String(index)}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="font-semibold text-4xl">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
