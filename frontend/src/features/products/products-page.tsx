import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductFormDialog } from './components/product-form-dialog'
import { ProductsTable } from './components/products-table'

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Produtos</h1>

        <ProductFormDialog
          trigger={
            <Button>
              <PlusIcon className="mr-2 size-4" /> Novo Produto
            </Button>
          }
        />
      </div>

      <ProductsTable />
    </div>
  )
}
