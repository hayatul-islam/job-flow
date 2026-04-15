import CategoryGrid from "@/components/home/Categories";
import HeroSection from "@/components/home/HeroSection";
import JobListings from "@/components/home/JobListings";

const page = () => {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <JobListings />
    </>
  );
};

export default page;
