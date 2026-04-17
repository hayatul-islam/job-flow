"use client";

import {
  Globe,
  HeartPulse,
  Landmark,
  Languages,
  Laptop,
  Megaphone,
  Palette,
  Pencil,
  Smartphone,
  Users,
} from "lucide-react";
import React from "react";

interface Category {
  id: number;
  title: string;
  jobs: number;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: 1, title: "Content Writing", jobs: 500, icon: <Pencil size={20} /> },
  {
    id: 2,
    title: "Computer Engineering",
    jobs: 270,
    icon: <Laptop size={20} />,
  },
  { id: 3, title: "Webflow Development", jobs: 594, icon: <Globe size={20} /> },
  { id: 4, title: "Health Care", jobs: 320, icon: <HeartPulse size={20} /> },
  {
    id: 5,
    title: "App Development",
    jobs: 896,
    icon: <Smartphone size={20} />,
  },
  { id: 6, title: "Design & Art", jobs: 700, icon: <Palette size={20} /> },
  { id: 7, title: "Translator", jobs: 270, icon: <Languages size={20} /> },
  { id: 8, title: "Human Resource", jobs: 371, icon: <Users size={20} /> },
  {
    id: 9,
    title: "Digital Marketing",
    jobs: 1000,
    icon: <Megaphone size={20} />,
  },
  { id: 10, title: "Finance", jobs: 750, icon: <Landmark size={20} /> },
];

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <div
      className="
        group flex items-center gap-4 px-5 py-4 rounded-2xl border
        bg-white border-gray-200 cursor-pointer
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 hover:border-primary/30
      "
    >
      <div
        className="
          w-11 h-11 flex items-center justify-center rounded-xl
          bg-primary/10 text-primary
          transition-all duration-300
          group-hover:bg-primary group-hover:text-white
        "
      >
        {category.icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">{category.title}</p>
        <p className="text-xs text-gray-400 mt-1">
          {category.jobs.toLocaleString()} Jobs Available
        </p>
      </div>
    </div>
  );
};

const JobCategories = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="container !max-w-5xl">
        {" "}
        {/* Header */}{" "}
        <div className="text-center mb-12">
          {" "}
          <h2 className="text-4xl text-gray-900 leading-tight font-medium">
            {" "}
            Explore All The Job{" "}
            <span className="italic font-serif text-primary">
              Categories
            </span>{" "}
            <br /> That Change Yourself.{" "}
          </h2>{" "}
        </div>
        {/* Row 1 — 3 centered */}
        <div className="grid grid-cols-3 gap-5 max-w-3xl mx-auto mb-5">
          {categories.slice(0, 3).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
        {/* Row 2 — 4 full */}
        <div className="grid grid-cols-4 gap-5 mb-5">
          {categories.slice(3, 7).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
        {/* Row 3 — 3 centered */}
        <div className="grid grid-cols-3 gap-5 max-w-3xl mx-auto">
          {categories.slice(7, 10).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
