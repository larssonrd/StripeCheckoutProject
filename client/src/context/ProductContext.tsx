import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface ProductApiResponse {
  id: string;
  currency: string;
  unit_amount: number;
  product: {
    images: string[];
    name: string;
    id: string;
    description: string;
  };
}

interface Product {
  id: string;
  imageSrc: string;
  name: string;
  price: number;
  currency: string;
  href: string;
  productId: string;
  description: string;
}

interface ProductContextType {
  products: Product[];
}

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext<
  ProductContextType | undefined
>(undefined);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductApiResponse[]>(
          'http://localhost:3000/api/products'
        );
        const data = response.data;
        const transformedProducts = data.map((product) => ({
          id: product.id,
          imageSrc: product.product.images[0],
          name: product.product.name,
          price: product.unit_amount / 100,
          currency: product.currency.toUpperCase(),
          href: `/product/${product.product.id}`,
          productId: product.product.id,
          description: product.product.description,
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
