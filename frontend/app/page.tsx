import CategoryGrid from "@/components/home/Categories";
import HeroSection from "@/components/home/HeroSection";
import JobListings from "@/components/home/JobListings";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <JobListings />
      <Footer />
    </div>
  );
};

export default page;
