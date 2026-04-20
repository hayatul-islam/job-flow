import Categories from "@/components/home/Categories";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import RecentJobs from "@/components/home/RecentJobs";

const page = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <RecentJobs />
      <HowItWorks />
    </>
  );
};

export default page;
