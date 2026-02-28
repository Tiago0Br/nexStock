import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useMaterialStore } from '@/features/materials/stores/use-material-store'
import type { Product } from '@/types'
import { type ProductFormValues, productFormSchema } from '../schemas/product.schema'
import { useProductStore } from '../stores/use-product-store'

interface ProductFormDialogProps {
  isOpen: boolean
  onOpenChange: () => void
  product?: Product
}

export function ProductFormDialog({
  isOpen,
  onOpenChange,
  product
}: ProductFormDialogProps) {
  const { createProduct, updateProduct, isSaving: isSavingProduct } = useProductStore()
  const { fetchMaterials, materials } = useMaterialStore()

  const isEditing = !!product

  useEffect(() => {
    fetchMaterials()
  }, [fetchMaterials])

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? '',
      price: product?.price ?? 0,
      composition:
        product?.composition.map((c) => {
          return {
            quantityRequired: c.quantityRequired,
            rawMaterialId: c.rawMaterial.id
          }
        }) ?? []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'composition'
  })

  const onSubmit = async (values: ProductFormValues) => {
    if (isEditing) {
      await updateProduct(product.id, values)
    } else {
      await createProduct(values)
    }
    form.reset()
    onOpenChange()
  }

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: product?.name ?? '',
        price: product?.price ?? 0,
        composition:
          product?.composition.map((c) => ({
            rawMaterialId: c.rawMaterial.id,
            quantityRequired: c.quantityRequired
          })) ?? []
      })
    }
  }, [isOpen, product, form])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-137.5 max-h-[90vh] overflow-y-auto"
        data-cy="product-form-dialog"
      >
        <DialogHeader>
          <DialogTitle>Produto</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Atualizar Produto' : 'Cadastrar Novo Produto'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Bolo de Cenoura"
                        disabled={isSavingProduct}
                        data-cy="product-name-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço de Venda (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Ex: 25.50"
                        disabled={isSavingProduct}
                        data-cy="product-price-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Receita (Composição)</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ rawMaterialId: 0, quantityRequired: 0 })}
                  disabled={isSavingProduct}
                  data-cy="product-add-material"
                >
                  <PlusIcon className="mr-2 size-4" /> Adicionar Ingrediente
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-4 items-end mb-4 p-3 rounded-md border"
                >
                  <FormField
                    control={form.control}
                    name={`composition.${index}.rawMaterialId`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Matéria-Prima</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString()}
                          disabled={isSavingProduct}
                        >
                          <FormControl>
                            <SelectTrigger data-cy="product-material-select-button">
                              <SelectValue placeholder="Selecione o insumo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent data-cy="product-material-select-options">
                            {materials.map((m) => (
                              <SelectItem key={m.id} value={m.id.toString()}>
                                {m.name} (Estoque: {m.stockQuantity} {m.unit})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`composition.${index}.quantityRequired`}
                    render={({ field }) => (
                      <FormItem className="w-32">
                        <FormLabel>Qtd. Necessária</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            data-cy="product-material-quantity"
                            disabled={isSavingProduct}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 mb-0.5"
                    disabled={isSavingProduct}
                    data-cy="product-material-remove-button"
                    onClick={() => remove(index)}
                  >
                    <Trash2Icon className="size-5" />
                  </Button>
                </div>
              ))}

              {form.formState.errors.composition?.root && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.composition.root.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onOpenChange}
                disabled={isSavingProduct}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                data-cy="product-form-submit"
                disabled={isSavingProduct}
              >
                {isEditing ? 'Atualizar' : 'Salvar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
