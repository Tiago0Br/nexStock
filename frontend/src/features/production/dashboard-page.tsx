import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { AlgorithmInfoCard } from './components/algorithm-info-card'
import { ProductionPlanCard } from './components/production-plan-card'
import { TotalItemsCard } from './components/total-items-card'
import { TotalValueCard } from './components/total-value-card'
import { useProductionStore } from './stores/use-production-store'

export function DashboardPage() {
  const { plan, isLoading, fetchPlan } = useProductionStore()

  useEffect(() => {
    fetchPlan()
  }, [fetchPlan])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard de Produção
        </h1>
        <p className="text-muted-foreground mt-2">
          Visão estratégica sugerida pelo sistema para maximização de lucros com base no
          estoque atual.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading ? (
          <TotalValueCard totalValue={plan?.totalValue} />
        ) : (
          <Skeleton className="h-32 w-full" />
        )}

        {!isLoading ? (
          <TotalItemsCard totalItems={plan?.totalItems} />
        ) : (
          <Skeleton className="h-32 w-full" />
        )}

        <div className="hidden lg:block">
          {!isLoading ? <AlgorithmInfoCard /> : <Skeleton className="h-32 w-full" />}
        </div>
      </div>

      {!isLoading ? (
        <ProductionPlanCard productionList={plan?.productionList ?? []} />
      ) : (
        <Skeleton className="h-96 w-full" />
      )}
    </div>
  )
}
