import { useEffect } from 'react'
import { MaterialFormDialog } from './components/material-form-dialog'
import { MaterialsTable } from './components/materials-table'
import { useMaterialStore } from './stores/use-material-store'

export function MaterialsPage() {
  const { fetchMaterials } = useMaterialStore()

  useEffect(() => {
    fetchMaterials()
  }, [fetchMaterials])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Matérias-Primas
        </h1>
        <MaterialFormDialog />
      </div>

      <MaterialsTable />
    </div>
  )
}
