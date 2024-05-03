import ProductItem from "./product-item";
import { Prisma } from "@prisma/client";

interface ProductListProps {
  //tonando a chamada pro banco flexivel
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 px-5 overflow-x-scroll [&::-webkit-scrollbar]:hidden ">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
