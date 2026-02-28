import { toast } from 'sonner'
import { create } from 'zustand'
import { createProductRequest } from '@/http/create-product'
import { deleteProductRequest } from '@/http/delete-product'
import { getAllProductsRequest } from '@/http/get-all-products'
import { updateProductRequest } from '@/http/update-product'
import { getErrorMessageByError } from '@/services/api'
import type { Product, SaveProduct } from '@/types'

interface ProductStore {
  products: Product[]
  isLoading: boolean
  isSaving: boolean
  fetchProducts: () => Promise<void>
  createProduct: (product: SaveProduct) => Promise<void>
  updateProduct: (productId: number, product: SaveProduct) => Promise<void>
  deleteProduct: (productId: number) => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  isSaving: false,

  fetchProducts: async () => {
    set({ isLoading: true })
    try {
      const products = await getAllProductsRequest()
      set({ products, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      toast.error(getErrorMessageByError(error))
    }
  },

  createProduct: async (product) => {
    set({ isSaving: true })
    try {
      await createProductRequest({ product })
      set({ isSaving: false })
      useProductStore.getState().fetchProducts()
      toast.success('Produto cadastrado com sucesso!')
    } catch (error) {
      set({ isSaving: false })
      toast.error(getErrorMessageByError(error))
    }
  },

  updateProduct: async (productId, product) => {
    set({ isSaving: true })
    try {
      await updateProductRequest({ product, productId })
      set({ isSaving: false })
      useProductStore.getState().fetchProducts()
      toast.success('Produto atualizado com sucesso!')
    } catch (error) {
      set({ isSaving: false })
      toast.error(getErrorMessageByError(error))
    }
  },

  deleteProduct: async (productId) => {
    try {
      await deleteProductRequest({ productId })
      useProductStore.getState().fetchProducts()
      toast.success('Produto deletado!')
    } catch (error) {
      toast.error(getErrorMessageByError(error))
    }
  }
}))
