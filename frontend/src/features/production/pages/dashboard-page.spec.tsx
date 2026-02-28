import { render } from '@testing-library/react'
import { useProductionStore } from '../stores/use-production-store'
import { DashboardPage } from './dashboard-page'

vi.mock('../stores/use-production-store', () => ({
  useProductionStore: vi.fn()
}))

describe('Dashboard Page', () => {
  it('Should display skeletons instead of cards while the plan is still loading.', () => {
    vi.mocked(useProductionStore).mockReturnValue({
      plan: null,
      isLoading: true,
      fetchPlan: vi.fn()
    })

    const wrapper = render(<DashboardPage />)

    const skeletons = wrapper.container.querySelectorAll('[data-slot="skeleton"]')
    expect(skeletons).toHaveLength(4)
  })

  it('Should render the totals and the table when there is a production plan', () => {
    const mockPlan = {
      totalValue: 410.0,
      totalItems: 30,
      productionList: [
        {
          productName: 'Bolo de Cenoura',
          quantityToProduce: 10,
          unitPrice: 25.0,
          subTotal: 250.0
        },
        {
          productName: 'Ovo de chocolate',
          quantityToProduce: 20,
          unitPrice: 8.0,
          subTotal: 160.0
        }
      ]
    }

    vi.mocked(useProductionStore).mockReturnValue({
      plan: mockPlan,
      isLoading: false,
      fetchPlan: vi.fn()
    })

    const wrapper = render(<DashboardPage />)

    expect(wrapper.getByText('30')).toBeInTheDocument()
    expect(wrapper.getByText(/410,00/i)).toBeInTheDocument()

    expect(wrapper.getByText('Bolo de Cenoura')).toBeInTheDocument()
    expect(wrapper.getByText('Ovo de chocolate')).toBeInTheDocument()
  })

  it('Should display an empty stock message when there are no produceable items.', () => {
    vi.mocked(useProductionStore).mockReturnValue({
      plan: { totalValue: 0, totalItems: 0, productionList: [] },
      isLoading: false,
      fetchPlan: vi.fn()
    })

    const wrapper = render(<DashboardPage />)

    expect(wrapper.getByText(/Estoque insuficiente para produzir/i)).toBeInTheDocument()
  })

  it('Should call fetchPlan on mount.', () => {
    const fetchPlan = vi.fn()
    vi.mocked(useProductionStore).mockReturnValue({
      plan: null,
      isLoading: true,
      fetchPlan
    })

    render(<DashboardPage />)

    expect(fetchPlan).toHaveBeenCalledOnce()
  })
})
