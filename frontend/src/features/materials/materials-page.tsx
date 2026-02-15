import { useEffect } from 'react'
import { useMaterialStore } from '@/store/use-material-store'
import { MaterialFormDialog } from './components/material-form-dialog'
import { MaterialsTable } from './components/materials-table'

export function MaterialsPage() {
  const { fetchMaterials } = useMaterialStore()

  useEffect(() => {
    fetchMaterials()
  }, [fetchMaterials])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Matérias-Primas
        </h2>
        <MaterialFormDialog />
      </div>

      <MaterialsTable />
    </div>
  )
}
