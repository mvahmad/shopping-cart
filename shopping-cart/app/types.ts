export interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    quantity?: number
}
export interface CategoriesResponse {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Data;
  }
  export interface Data {
    categories?: CategoriesEntity[] | null;
  }
  export interface CategoriesEntity {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
  }
  