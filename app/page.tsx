import CategoryList from "./_components/ui/category-list";
import Header from "./_components/ui/header";
import Search from "./_components/ui/seach";
import ProductList from "./_components/ui/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/ui/promo-banner";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <div>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/BannerPizza.png"
          alt="até 30% de desconto em pizzas"
        />
      </div>
      <div className="space-y-3 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon className="size-5" />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6"></div>
      <PromoBanner
        src="/BannerBurguer.png"
        alt="até 30% de desconto em pizzas"
      />
    </div>
  );
};

export default Home;
