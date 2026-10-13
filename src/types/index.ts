export type Role = 'USER' | 'ADMIN';

export interface UserCount {
  posts: number;
  marketplaceProducts: number;
  followers: number;
  following: number;
}

export interface User {
  id: string;
  username: string;
  identifier: string;
  role: Role;
  university: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  gender: string | null;
  profileImage: string | null;
  isVerified: boolean;
  isDeactivated: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: UserCount;
}

export interface ProductSeller {
  id: string;
  username: string;
  identifier: string;
  profileImage: string | null;
  firstName: string | null;
  lastName: string | null;
  university: string | null;
}

export type ProductType = 'PHYSICAL' | 'DIGITAL';

export interface MarketplaceProduct {
  id: string;
  title: string;
  description: string | null;
  price: number;
  type: ProductType;
  images: string[];
  digitalFileUrl: string | null;
  location: string | null;
  deliveryType: string | null;
  qty: number;
  isPublished: boolean;
  sellerId: string;
  seller: ProductSeller;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUsersResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
    adminCount: number;
    studentCount: number;
  };
}

export interface AdminProductsResponse {
  data: MarketplaceProduct[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
    pendingCount: number;
    publishedCount: number;
  };
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}
