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
    data: DataCategory;
  }
  export interface SubcategoriesResponse {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: SubData;
  } 

  export interface SubData {
    subcategories?: SubcategoriesEntity[] | null;
  }
  
  export interface DataCategory {
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

  export interface SubcategoriesEntity {
    _id: string;
    category: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
  }
export interface getProductsResponse {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Data;
  }  

  export interface Category {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  }
  export interface Subcategory {
    _id: string;
    category: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  }
  export interface Rating {
    rate: number;
    count: number;
  }
  export interface Data {
    products?: ProductsEntity[] | null;
  }
  export interface ProductsEntity {
    rating: Rating;
    _id: string;
    category: Category;
    subcategory: Subcategory;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    discount: number;
    description: string;
    thumbnail: string;
    images?: string[] | null;
    createdAt: string;
    updatedAt: string;
    slugname: string;
  }  

  export interface authResponse {
  status: string;
  token: Token;
  data: Data;
}
export interface Token {
  accessToken: string;
  refreshToken: string;
}
export interface Data {
  user: User;
}
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  wishlist?: null[] | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}
