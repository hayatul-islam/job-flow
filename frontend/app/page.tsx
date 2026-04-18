import CategoriesDesign1 from "@/components/home/CategoriesTwo";
import HeroSectionLight from "@/components/home/HeroSectionLight";
import JobListings from "@/components/home/JobListings";

const page = () => {
  return (
    <>
      <HeroSectionLight />
      {/* <HeroSection /> */}
      <CategoriesDesign1 />
      {/* <CategoryGrid /> */}
      <JobListings />
    </>
  );
};

export default page;
