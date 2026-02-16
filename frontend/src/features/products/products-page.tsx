import { ProductFormDialog } from './components/product-form-dialog'
import { ProductsTable } from './components/products-table'

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Produtos</h1>

        <ProductFormDialog />
      </div>

      <ProductsTable />
    </div>
  )
}
