import { create } from 'zustand'
import { api } from '@/services/api'
import type { Product } from '@/types'
import type { ProductFormValues } from '../schemas/product.schema'

interface ProductStore {
  products: Product[]
  isLoading: boolean
  fetchProducts: () => Promise<void>
  createProduct: (product: ProductFormValues) => Promise<void>
  updateProduct: (productId: number, product: ProductFormValues) => Promise<void>
  deleteProduct: (productId: number) => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true })
    try {
      const response = await api.get('/products')
      set({ products: response.data, isLoading: false })
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      set({ isLoading: false })
    }
  },

  createProduct: async (productData) => {
    try {
      await api.post('/products', productData)
      useProductStore.getState().fetchProducts()
    } catch (error) {
      console.error('Erro ao criar produto:', error)
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      await api.put(`/products/${productId}`, productData)
      useProductStore.getState().fetchProducts()
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error)
    }
  },

  deleteProduct: async (productId) => {
    try {
      await api.delete(`/products/${productId}`)
      useProductStore.getState().fetchProducts()
    } catch (error) {
      console.error('Erro ao deletar o produto:', error)
    }
  }
}))
