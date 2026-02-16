import { DollarSignIcon, PackageIcon, TrendingUpIcon } from 'lucide-react'
import { useEffect } from 'react'
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
import { formatCurrency } from '@/utils/format-currency'
import { useProductionStore } from './stores/use-production-store'

export function DashboardPage() {
  const { plan, isLoading, fetchPlan } = useProductionStore()

  useEffect(() => {
    fetchPlan()
  }, [fetchPlan])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg text-slate-500 animate-pulse">
          Calculando o cenário de produção ideal...
        </p>
      </div>
    )
  }

  const isPlanEmpty = !plan || plan.productionList.length === 0

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard de Produção
        </h2>
        <p className="text-slate-500 mt-2">
          Visão estratégica sugerida pelo sistema para maximização de lucros com base no
          estoque atual.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-primary">
              Receita Total Estimada
            </CardTitle>
            <DollarSignIcon className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {plan ? formatCurrency(plan.totalValue) : 'R$ 0,00'}
            </div>
            <p className="text-xs text-primary mt-1">
              Priorizando produtos de maior valor
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total de Itens Produzidos
            </CardTitle>
            <PackageIcon className="size-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">
              {plan ? plan.totalItems : 0}
            </div>
            <p className="text-xs text-slate-500 mt-1">Unidades prontas para venda</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hidden lg:block">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">
              Status do Algoritmo
            </CardTitle>
            <TrendingUpIcon className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-emerald-600 mt-1">Otimizado</div>
            <p className="text-xs text-slate-500 mt-1">Algoritmo Guloso aplicado</p>
          </CardContent>
        </Card>
      </div>

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
                  <TableCell colSpan={4} className="text-center py-10 text-slate-500">
                    Estoque insuficiente para produzir qualquer item cadastrado.
                    <br /> Adicione mais matérias-primas no sistema.
                  </TableCell>
                </TableRow>
              ) : (
                plan.productionList.map((item) => (
                  <TableRow key={item.productName}>
                    <TableCell className="font-medium text-slate-900">
                      {item.productName}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                        {item.quantityToProduce} un
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-slate-500">
                      {formatCurrency(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-blue-600">
                      {formatCurrency(item.subTotal)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
