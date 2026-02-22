import { PackageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TotalItemsCardProps {
  totalItems?: number
}

export function TotalItemsCard({ totalItems }: TotalItemsCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total de Itens Produzidos
        </CardTitle>
        <PackageIcon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground" data-cy="total-items">
          {totalItems ?? 0}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Unidades prontas para venda</p>
      </CardContent>
    </Card>
  )
}
