import Categories from "@/components/home/Categories";
import HeroSection from "@/components/home/HeroSection";
import RecentJobs from "@/components/home/RecentJobs";

const page = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <RecentJobs />
    </>
  );
};

export default page;
