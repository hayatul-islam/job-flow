import Categories from "@/components/home/Categories";
import HeroSection from "@/components/home/HeroSection";
import JobListings from "@/components/home/JobListings";

const page = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <JobListings />
    </>
  );
};

export default page;
