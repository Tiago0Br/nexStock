import { CircleXIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <CircleXIcon className="size-24 text-destructive" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Ocorreu um erro inesperado.</h2>
          <p className="text-muted-foreground">
            Ocorreu um erro ao tentar processar a operação. Lamentamos pelo ocorrido. Se o
            erro persistir, entre em contato com nossa equipe de suporte.
          </p>
        </div>

        <Button size="lg" className="mt-4" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}
