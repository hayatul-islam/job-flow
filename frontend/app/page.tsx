import CategoriesDesign1 from "@/components/home/CategoriesTwo";
import HeroSection from "@/components/home/HeroSection";
import JobListings from "@/components/home/JobListings";

const page = () => {
  return (
    <>
      <HeroSection />
      <CategoriesDesign1 />
      {/* <CategoryGrid /> */}
      <JobListings />
    </>
  );
};

export default page;
