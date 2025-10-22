export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductEntity {
  id: string;
  name: string;
  desc: string;
  img: ProductImage;
}
