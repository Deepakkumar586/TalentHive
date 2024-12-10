import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-16">
        {" "}
        {/* Space for the fixed Navbar */}
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
