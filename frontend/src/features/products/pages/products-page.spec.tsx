import { fireEvent, render } from '@testing-library/react'
import { useMaterialStore } from '@/features/materials/stores/use-material-store'
import { useProductStore } from '../stores/use-product-store'
import { ProductsPage } from './products-page'

vi.mock('../stores/use-product-store', () => ({
  useProductStore: vi.fn()
}))

vi.mock('@/features/materials/stores/use-material-store', () => ({
  useMaterialStore: vi.fn()
}))

const mockProductStoreBase = {
  products: [],
  isLoading: false,
  isSaving: false,
  fetchProducts: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn()
}

const mockMaterialStoreBase = {
  materials: [],
  isLoading: false,
  isSaving: false,
  fetchMaterials: vi.fn(),
  createMaterial: vi.fn(),
  updateMaterial: vi.fn(),
  deleteMaterial: vi.fn()
}

describe('Products Page', () => {
  beforeEach(() => {
    vi.mocked(useMaterialStore).mockReturnValue({ ...mockMaterialStoreBase })
  })

  it('Should render the page heading and the new product button.', () => {
    vi.mocked(useProductStore).mockReturnValue({ ...mockProductStoreBase })

    const wrapper = render(<ProductsPage />)

    expect(wrapper.getByText('Produtos')).toBeInTheDocument()
    expect(wrapper.getByText(/Novo Produto/i)).toBeInTheDocument()
  })

  it('Should call fetchProducts on mount.', () => {
    const fetchProducts = vi.fn()
    vi.mocked(useProductStore).mockReturnValue({
      ...mockProductStoreBase,
      fetchProducts
    })

    render(<ProductsPage />)

    expect(fetchProducts).toHaveBeenCalledOnce()
  })

  it('Should display skeletons in the table while products are loading.', () => {
    vi.mocked(useProductStore).mockReturnValue({
      ...mockProductStoreBase,
      isLoading: true
    })

    const wrapper = render(<ProductsPage />)

    const skeletons = wrapper.container.querySelectorAll('[data-slot="skeleton"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('Should display an empty message when there are no products.', () => {
    vi.mocked(useProductStore).mockReturnValue({ ...mockProductStoreBase, products: [] })

    const wrapper = render(<ProductsPage />)

    expect(wrapper.getByText(/Nenhum produto cadastrado/i)).toBeInTheDocument()
  })

  it('Should render the products list in the table.', () => {
    const products = [
      {
        id: 1,
        name: 'Bolo de Cenoura',
        price: 25.0,
        composition: [
          {
            id: 1,
            rawMaterial: {
              id: 1,
              name: 'Farinha',
              stockQuantity: 10,
              unit: 'KG' as const
            },
            quantityRequired: 2
          }
        ]
      },
      {
        id: 2,
        name: 'Pão Francês',
        price: 1.5,
        composition: []
      }
    ]
    vi.mocked(useProductStore).mockReturnValue({ ...mockProductStoreBase, products })

    const wrapper = render(<ProductsPage />)

    expect(wrapper.getByText('Bolo de Cenoura')).toBeInTheDocument()
    expect(wrapper.getByText('Pão Francês')).toBeInTheDocument()
  })

  it('Should open the new product dialog when clicking the "Novo Produto" button.', () => {
    vi.mocked(useProductStore).mockReturnValue({ ...mockProductStoreBase })

    const wrapper = render(<ProductsPage />)

    const button = wrapper.getByText(/Novo Produto/i)
    fireEvent.click(button)

    expect(wrapper.getByRole('heading', { name: 'Produto' })).toBeInTheDocument()
    expect(wrapper.getByText('Cadastrar Novo Produto')).toBeInTheDocument()
  })
})
