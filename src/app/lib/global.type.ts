export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}
export interface BlogtImage {
  url: string;
  alt: string;
  
}

export interface ProductEntity {
  id: string;
  name: string;
  category: string;
  desc: string;
  img: ProductImage;
}
export interface BlogEntity {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}
