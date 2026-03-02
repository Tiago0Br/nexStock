import { PencilIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DeleteItemDialog } from '@/components/shared/delete-item-dialog'
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
import type { Product } from '@/types'
import { formatCurrency } from '@/utils/format-currency'
import { useProductStore } from '../stores/use-product-store'
import { ProductFormDialog } from './product-form-dialog'

export function ProductsTable() {
  const {
    products,
    isLoading: isLoadingProducts,
    fetchProducts,
    deleteProduct
  } = useProductStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  function handleEdit(product: Product) {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  function handleCloseDialog() {
    setIsDialogOpen(false)
    setSelectedProduct(undefined)
  }

  function handleDeleteRequest(productId: number) {
    setProductToDelete(productId)
  }

  function handleCancelDelete() {
    setProductToDelete(null)
  }

  async function handleConfirmDelete() {
    if (productToDelete === null) return
    await deleteProduct(productToDelete)
    setProductToDelete(null)
  }

  return (
    <>
      <ProductFormDialog
        isOpen={isDialogOpen}
        onOpenChange={handleCloseDialog}
        product={selectedProduct}
      />

      <DeleteItemDialog
        open={productToDelete !== null}
        onOpenChange={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isLoadingProducts}
      />

      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Ingredientes</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingProducts ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Nenhum produto cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} data-cy="product-item">
                  <TableCell className="font-medium" data-cy="product-id">
                    {product.id}
                  </TableCell>
                  <TableCell data-cy="product-name">{product.name}</TableCell>
                  <TableCell data-cy="product-price">
                    {formatCurrency(product.price)}
                  </TableCell>
                  <TableCell>
                    {product.composition.map((c) => (
                      <span
                        key={c.id}
                        data-cy="product-composition"
                        className="inline-block bg-slate-100 rounded-full px-2 py-1 text-xs font-semibold text-slate-600 mr-2 mb-1"
                      >
                        {c.rawMaterial.name} ({c.quantityRequired} {c.rawMaterial.unit})
                      </span>
                    ))}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => handleEdit(product)}
                        data-cy="product-edit"
                      >
                        <PencilIcon className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteRequest(product.id)}
                        data-cy="product-delete"
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
