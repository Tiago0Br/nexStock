import { PencilIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { RawMaterial } from '@/types'
import { useMaterialStore } from '../stores/use-material-store'
import { MaterialFormDialog } from './material-form-dialog'

export function MaterialsTable() {
  const { materials, isLoading, deleteMaterial } = useMaterialStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | undefined>(
    undefined
  )

  function handleEdit(material: RawMaterial) {
    setSelectedMaterial(material)
    setIsDialogOpen(true)
  }

  function handleCloseDialog() {
    setIsDialogOpen(false)
    setSelectedMaterial(undefined)
  }

  async function handleDelete(materialId: number) {
    await deleteMaterial(materialId)
  }

  return (
    <>
      <MaterialFormDialog
        isOpen={isDialogOpen}
        onOpenChange={handleCloseDialog}
        material={selectedMaterial}
      />

      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Nome do Insumo</TableHead>
              <TableHead className="text-right">Qtd. em Estoque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Skeleton className="size-8" />
                      <Skeleton className="size-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : materials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Nenhum insumo cadastrado ainda.
                </TableCell>
              </TableRow>
            ) : (
              materials.map((material) => (
                <TableRow key={material.id} data-cy="material-item">
                  <TableCell className="font-medium" data-cy="material-id">
                    {material.id}
                  </TableCell>
                  <TableCell data-cy="material-name">{material.name}</TableCell>
                  <TableCell className="text-right" data-cy="material-stock">
                    {material.stockQuantity} ({material.unit})
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => handleEdit(material)}
                        data-cy="material-edit"
                      >
                        <PencilIcon className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(material.id)}
                        data-cy="material-delete"
                      >
                        <Trash2Icon className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
