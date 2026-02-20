import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MaterialFormDialog } from '../components/material-form-dialog'
import { MaterialsTable } from '../components/materials-table'
import { useMaterialStore } from '../stores/use-material-store'

export function MaterialsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusIcon className="mr-2 size-4" />
          Nova Matéria-prima
        </Button>
      </div>

      <MaterialFormDialog
        isOpen={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
      />
      <MaterialsTable />
    </div>
  )
}
