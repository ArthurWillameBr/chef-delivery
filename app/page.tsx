import Image from "next/image";
import CategoryList from "./_components/ui/category-list";
import Header from "./_components/ui/header";
import Search from "./_components/ui/seach";
import ProductList from "./_components/ui/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

const Home = () => {
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
        <Image
          src="/BannerPizza.png"
          alt="até 30% de desconto em pizzas"
          width={0}
          height={0}
          sizes="100vw"
          className="object-container h-auto w-full"
          quality={100}
        />
      </div>
      <div className="pt-6 space-y-3">
        <div className="px-5 flex justify-between items-center">
        <h2 className="font-semibold">Pedidos Recomendados</h2>
        <Button variant="ghost" className="text-primary p-0 hover:bg-transparent">Ver todos
          <ChevronRightIcon className="size-5" />
        </Button>
        </div>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
