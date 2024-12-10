import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "Data Scientist",
  "UI/UX Designer",
];

const CategoryCarousel = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulating loading time
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="my-20 px-4">
      {loading ? (
        <motion.div
          className="flex justify-center items-center h-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            Explore Categories
          </h2>
          <Carousel className="relative">
            <CarouselContent>
              {category.map((cat, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 flex justify-center"
                >
                  <motion.div
                    className="w-full max-w-[150px]"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 4px 10px rgba(131, 56, 236, 0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      className="w-full rounded-full border-purple-400 text-purple-600 hover:bg-purple-500 hover:text-white transition-all"
                      variant="outline"
                    >
                      {cat}
                    </Button>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows */}
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-700 p-2 rounded-full shadow-lg transition-all">
              <span className="text-white">&lt;</span>
            </CarouselPrevious>
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-700 p-2 rounded-full shadow-lg transition-all">
              <span className="text-white">&gt;</span>
            </CarouselNext>
          </Carousel>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryCarousel;
