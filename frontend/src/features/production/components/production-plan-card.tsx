import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { ProductionItem } from '@/types'
import { formatCurrency } from '@/utils/format-currency'

interface ProductionPlanCardProps {
  productionList: ProductionItem[]
}

export function ProductionPlanCard({ productionList }: ProductionPlanCardProps) {
  const isPlanEmpty = productionList.length === 0

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Plano de Produção Detalhado</CardTitle>
        <CardDescription>
          Relação exata de quais produtos fabricar e suas respectivas quantidades para
          atingir a receita máxima.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto Sugerido</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead className="text-right">Valor Unitário</TableHead>
              <TableHead className="text-right font-bold">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPlanEmpty ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  Estoque insuficiente para produzir qualquer item cadastrado.
                  <br /> Adicione mais matérias-primas no sistema.
                </TableCell>
              </TableRow>
            ) : (
              productionList.map((item) => (
                <TableRow key={item.productName} data-cy="production-plan-item">
                  <TableCell
                    className="font-medium text-foreground"
                    data-cy="production-plan-product-name"
                  >
                    {item.productName}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold"
                      data-cy="production-plan-product-quantity"
                    >
                      {item.quantityToProduce} unidades
                    </span>
                  </TableCell>
                  <TableCell
                    className="text-right text-muted-foreground"
                    data-cy="production-plan-product-price"
                  >
                    {formatCurrency(item.unitPrice)}
                  </TableCell>
                  <TableCell
                    className="text-right font-bold text-primary"
                    data-cy="production-plan-product-subtotal"
                  >
                    {formatCurrency(item.subTotal)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
