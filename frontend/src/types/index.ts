export interface RawMaterial {
  id: number
  name: string
  stockQuantity: number
  unit: 'KG' | 'G' | 'L' | 'ML' | 'UN'
}

export type SaveRawMaterial = Omit<RawMaterial, 'id'> & {
  id?: number
}

export interface Product {
  id: number
  name: string
  price: number
  composition: {
    id: number
    rawMaterial: RawMaterial
    quantityRequired: number
  }[]
}

export type SaveProduct = Omit<Product, 'id' | 'composition'> & {
  id?: number
  composition: {
    id?: number
    rawMaterialId: number
    quantityRequired: number
  }[]
}

export interface ProductionItem {
  productName: string
  quantityToProduce: number
  unitPrice: number
  subTotal: number
}

export interface ProductionPlan {
  productionList: ProductionItem[]
  totalValue: number
  totalItems: number
}
