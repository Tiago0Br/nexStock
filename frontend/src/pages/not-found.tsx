import { FileQuestionIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <FileQuestionIcon className="h-24 w-24 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold">Página não encontrada</h2>
          <p className="text-muted-foreground">
            A página que você está tentando acessar não existe ou foi removida.
          </p>
        </div>

        <Link to="/">
          <Button size="lg" className="mt-4">
            Voltar para o Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
