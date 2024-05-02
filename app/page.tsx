import CategoryList from "./_components/ui/category-list";
import Header from "./_components/ui/header";
import Search from "./_components/ui/seach";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
      <Search/>
      </div>
      <div className="px-5 pt-6">
        <CategoryList/>
      </div>
    </>
  );
};

export default Home;
