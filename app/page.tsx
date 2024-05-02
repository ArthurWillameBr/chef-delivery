import Image from "next/image";
import CategoryList from "./_components/ui/category-list";
import Header from "./_components/ui/header";
import Search from "./_components/ui/seach";

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
    </div>
  );
};

export default Home;
