import { DollarSignIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/utils/format-currency'

interface TotalValueCardProps {
  totalValue?: number
}

export function TotalValueCard({ totalValue }: TotalValueCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-primary">
          Receita Total Estimada
        </CardTitle>
        <DollarSignIcon className="size-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground" data-cy="total-value">
          {totalValue ? formatCurrency(totalValue) : 'R$ 0,00'}
        </div>
        <p className="text-xs text-primary mt-1">Priorizando produtos de maior valor</p>
      </CardContent>
    </Card>
  )
}
