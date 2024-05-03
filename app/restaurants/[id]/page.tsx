import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/ui/product-list";

interface RestaurantsProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantsProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          products: {
            where:  {
              restaurantId: id
            },
            include: {
              restaurant: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true
            }
          }
        }
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage Restaurant={restaurant} />

      <div className="flex items-center justify-between px-5 pt-5 relative z-50 bg-white rounded-tl-lg rounded-tr-lg mt-[-1.5rem]">
        <div className=" flex items-center gap-1">
          <div className="relative size-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="rounded-full object-cover"
              fill
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="left-2 top-2 flex items-center gap-[3px] rounded-full bg-foreground px-3 py-2 text-white">
          <StarIcon className="size-4 fill-yellow-400 text-yellow-400 shadow-lg" />
          <span className="text-sm font-semibold">5.0</span>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>
      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            className="min-w-[167px] rounded-lg bg-muted py-2 text-center"
            key={category.id}
          >
            <span className="text-sm text-muted-foreground">
              {category.name}{" "}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="font-semibold px-5">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>
      
        {restaurant.categories.map((category) => (
           <div className="mt-6 space-y-4" key={category.id}>
           <h2 className="font-semibold px-5">{category.name}</h2>
           <ProductList products={category.products} />
         </div>
        ))}
    </div>
  );
};

export default RestaurantPage;
