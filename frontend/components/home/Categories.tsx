"use client";

import { CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "group-hover:bg-blue-50 group-hover:border-blue-200",
  Marketing: "group-hover:bg-orange-50 group-hover:border-orange-200",
  Design: "group-hover:bg-violet-50 group-hover:border-violet-200",
  Finance: "group-hover:bg-green-50 group-hover:border-green-200",
  Healthcare: "group-hover:bg-rose-50 group-hover:border-rose-200",
  Operations: "group-hover:bg-amber-50 group-hover:border-amber-200",
  Sales: "group-hover:bg-teal-50 group-hover:border-teal-200",
  HR: "group-hover:bg-pink-50 group-hover:border-pink-200",
};

export default function CategoryGrid() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Browse by Category
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-light">
              Explore opportunities across industries
            </p>
          </div>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
          >
            View all <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/jobs?category=${encodeURIComponent(cat.name)}`}
              className={cn(
                "group flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
                CATEGORY_COLORS[cat.name] ?? "group-hover:bg-gray-50",
              )}
            >
              <span className="text-2xl mb-2">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-800 leading-tight">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400 font-light mt-0.5">
                {cat.jobCount.toLocaleString()}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile see all */}
        <div className="flex justify-center mt-5 sm:hidden">
          <Link
            href="/jobs"
            className="flex items-center gap-1 text-primary text-sm font-medium"
          >
            View all categories <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
