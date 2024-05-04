import Header from "@/app/_components/ui/header";
import ProductItem from "@/app/_components/ui/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
    params: {
        id: string
    }
}

const CategoriesPage = async ({params: {id} }: CategoriesPageProps) => {
    const category = await db.category.findUnique({
        where: {
            id,
        },
        include: {
            products: {
                include: {
                    restaurant: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    if(!category) {
        return notFound()
    }
    return ( 
        <>
        <Header />
        <div className="p-5">
          <h1 className="py-4 text-lg font-semibold">{category?.name}</h1>
          <div className="grid grid-cols-2 gap-6">
            {category?.products.map((product) => (
              <ProductItem key={product.id} product={product} className="min-w-full" />
            ))}
          </div>
        </div>
      </>
     );
}
 
export default CategoriesPage;