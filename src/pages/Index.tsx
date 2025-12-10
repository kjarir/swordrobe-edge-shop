import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategorySection from "@/components/home/CategorySection";
import BrandBanner from "@/components/home/BrandBanner";
import StoreLocation from "@/components/home/StoreLocation";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <BrandBanner />
      <StoreLocation />
    </Layout>
  );
};

export default Index;
