import { PencilIcon, Trash2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useProductStore } from '../stores/use-product-store'
import { ProductFormDialog } from './product-form-dialog'

export function ProductsTable() {
  const {
    products,
    isLoading: isLoadingProducts,
    fetchProducts,
    deleteProduct
  } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  async function handleDelete(productId: number) {
    await deleteProduct(productId)

    toast.success('Produto deletado!')
  }

  return (
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
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                Carregando...
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                Nenhum produto cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.composition.map((c) => (
                    <span
                      key={c.id as number}
                      className="inline-block bg-slate-100 rounded-full px-2 py-1 text-xs font-semibold text-slate-600 mr-2 mb-1"
                    >
                      {c.rawMaterial.name} ({c.quantityRequired}x)
                    </span>
                  ))}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <ProductFormDialog
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <PencilIcon className="size-4" />
                        </Button>
                      }
                      product={product}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(product.id as number)}
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
  )
}
