export class Product {
  id?: string;
  image?: string;
  name?: string;
  code?: string;
  price?: number;
  stock?: number;
  isSingle?: boolean;
  parentId?: string | null;
  discount?: number;
}
