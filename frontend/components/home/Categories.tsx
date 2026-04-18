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
  color: {
    bg: string;
    iconBg: string;
    iconHoverBg: string;
    iconColor: string;
    hoverBg: string;
  };
}

const palette = [
  {
    bg: "transparent",
    iconBg: "#EEEDFE",
    iconHoverBg: "#CECBF6",
    iconColor: "#534AB7",
    hoverBg: "rgba(238,237,254,0.25)",
  },
  {
    bg: "transparent",
    iconBg: "#E1F5EE",
    iconHoverBg: "#9FE1CB",
    iconColor: "#0F6E56",
    hoverBg: "rgba(225,245,238,0.25)",
  },
  {
    bg: "transparent",
    iconBg: "#E6F1FB",
    iconHoverBg: "#B5D4F4",
    iconColor: "#185FA5",
    hoverBg: "rgba(230,241,251,0.25)",
  },
  {
    bg: "transparent",
    iconBg: "#FAECE7",
    iconHoverBg: "#F5C4B3",
    iconColor: "#993C1D",
    hoverBg: "rgba(250,236,231,0.25)",
  },
  {
    bg: "transparent",
    iconBg: "#FBEAF0",
    iconHoverBg: "#F4C0D1",
    iconColor: "#993556",
    hoverBg: "rgba(251,234,240,0.25)",
  },
  {
    bg: "transparent",
    iconBg: "#EAF3DE",
    iconHoverBg: "#C0DD97",
    iconColor: "#3B6D11",
    hoverBg: "rgba(234,243,222,0.25)",
  },
  {
    bg: "transparent",
    iconBg: "#FAEEDA",
    iconHoverBg: "#FAC775",
    iconColor: "#854F0B",
    hoverBg: "rgba(250,238,218,0.25)",
  },
  {
    bg: "transparent",
    iconBg: "#EEEDFE",
    iconHoverBg: "#AFA9EC",
    iconColor: "#3C3489",
    hoverBg: "rgba(238,237,254,0.25)",
  },
  {
    bg: "transparent",
    iconBg: "#E1F5EE",
    iconHoverBg: "#5DCAA5",
    iconColor: "#085041",
    hoverBg: "rgba(225,245,238,0.25)",
  },
  {
    bg: "transparent",
    iconBg: "#E6F1FB",
    iconHoverBg: "#85B7EB",
    iconColor: "#0C447C",
    hoverBg: "rgba(230,241,251,0.25)",
  },
];

const categories: Category[] = [
  {
    id: 1,
    title: "Content Writing",
    jobs: 500,
    icon: <Pencil size={18} />,
    color: palette[0],
  },
  {
    id: 2,
    title: "Computer Engineering",
    jobs: 270,
    icon: <Laptop size={18} />,
    color: palette[1],
  },
  {
    id: 3,
    title: "Webflow Development",
    jobs: 594,
    icon: <Globe size={18} />,
    color: palette[2],
  },
  {
    id: 4,
    title: "Health Care",
    jobs: 320,
    icon: <HeartPulse size={18} />,
    color: palette[3],
  },
  {
    id: 5,
    title: "App Development",
    jobs: 896,
    icon: <Smartphone size={18} />,
    color: palette[4],
  },
  {
    id: 6,
    title: "Design & Art",
    jobs: 700,
    icon: <Palette size={18} />,
    color: palette[5],
  },
  {
    id: 7,
    title: "Translator",
    jobs: 270,
    icon: <Languages size={18} />,
    color: palette[6],
  },
  {
    id: 8,
    title: "Human Resource",
    jobs: 371,
    icon: <Users size={18} />,
    color: palette[7],
  },
  {
    id: 9,
    title: "Digital Marketing",
    jobs: 1000,
    icon: <Megaphone size={18} />,
    color: palette[8],
  },
  {
    id: 10,
    title: "Finance",
    jobs: 750,
    icon: <Landmark size={18} />,
    color: palette[9],
  },
];

const CategoryCard = ({ category }: { category: Category }) => {
  const [hovered, setHovered] = React.useState(false);
  const c = category.color;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-4 py-3.5 rounded-[14px] border cursor-pointer transition-all duration-200"
      style={{
        background: hovered ? c.hoverBg : "white",
        borderColor: hovered ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.07)",
      }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center rounded-[10px] shrink-0 transition-all duration-200"
        style={{
          background: hovered ? c.iconHoverBg : c.iconBg,
          color: c.iconColor,
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        {category.icon}
      </div>

      <div>
        <p
          className="text-[13px] font-medium leading-snug"
          style={{ color: "#1a1a2e" }}
        >
          {category.title}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "#9999b8" }}>
          {category.jobs.toLocaleString()} jobs available
        </p>
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-medium text-black leading-tight">
            Explore all the job{" "}
            <span className="font-normal text-primary italic">categories</span>
            <br />
            that change yourself.
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            10 categories · thousands of opportunities
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto mb-3">
          {categories.slice(0, 3).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 mb-3 max-w-4xl mx-auto">
          {categories.slice(3, 7).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
          {categories.slice(7, 10).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
