"use client";

import { useCategories } from "@/hooks/useCategories";
import { fadeUp, stagger } from "@/lib/animations";
import { motion } from "framer-motion";
import {
  Calculator,
  GraduationCap,
  HardHat,
  Landmark,
  Megaphone,
  Monitor,
  Palette,
  Stethoscope,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import CategorySkeleton from "../skeletons/CategoriesSkeleton";
import { Card } from "../ui/card";

interface Category {
  id: number;
  name: string;
  _count: { jobs: number };
}

const categoryIcons: Record<number, React.ReactNode> = {
  1: <Megaphone size={18} />,
  2: <Monitor size={18} />,
  3: <Calculator size={18} />,
  4: <Landmark size={18} />,
  5: <Stethoscope size={18} />,
  6: <Truck size={18} />,
  7: <Palette size={18} />,
  8: <HardHat size={18} />,
  9: <Users size={18} />,
  10: <GraduationCap size={18} />,
};

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <motion.div variants={fadeUp}>
      <Link href={`/jobs?catId=${category?.id}`}>
        <Card className="p-0 group border-gray-200 hover:border-gray-300 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-gray-50 hover:scale-105">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-10 h-10 flex items-center justify-center rounded-[10px] shrink-0 transition-all duration-200 bg-gray-100 group-hover:bg-gray-200">
              {categoryIcons[category.id]}
            </div>
            <div>
              <h6>{category.name}</h6>
              <p className="text-[12px] mt-0.5">
                {category._count.jobs.toLocaleString()} jobs available
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

const Categories = () => {
  const { data, isLoading } = useCategories();
  const categories: Category[] = data?.data ?? [];

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="container max-w-4xl mx-auto px-6">
        {/* heading */}
        <motion.div
          className="text-center mb-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 text-[9px] sm:text-[11px] font-medium tracking-[0.6px] uppercase rounded-full px-4 py-1.5 mb-2 bg-primary/5 text-primary"
          >
            <Zap className="w-3 h-3" />
            Explore Careers
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-medium text-2xl sm:text-3xl md:text-[32px] lg:text-[42px]"
          >
            Explore all the job{" "}
            <span className="font-normal text-primary italic">categories</span>
            <br />
            that change yourself.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-xs sm:text-sm md:text-lg mt-1.5 md:mt-3"
          >
            10 categories · thousands of opportunities
          </motion.p>
        </motion.div>

        {/* cards */}
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <>
            {/* mobile */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </motion.div>

            {/* desktop */}
            <motion.div
              className="hidden md:block"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto mb-3">
                {categories.slice(0, 3).map((cat) => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3 mb-3 max-w-5xl mx-auto">
                {categories.slice(3, 7).map((cat) => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
                {categories.slice(7, 10).map((cat) => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Categories;

// "use client";

// import { useCategories } from "@/hooks/useCategories";
// import {
//   Calculator,
//   GraduationCap,
//   HardHat,
//   Landmark,
//   Megaphone,
//   Monitor,
//   Palette,
//   Stethoscope,
//   Truck,
//   Users,
//   Zap,
// } from "lucide-react";
// import Link from "next/link";
// import CategorySkeleton from "../skeletons/CategoriesSkeleton";
// import { Card } from "../ui/card";

// interface Category {
//   id: number;
//   name: string;
//   _count: {
//     jobs: number;
//   };
// }

// const categoryIcons: Record<number, React.ReactNode> = {
//   1: <Megaphone size={18} />,
//   2: <Monitor size={18} />,
//   3: <Calculator size={18} />,
//   4: <Landmark size={18} />,
//   5: <Stethoscope size={18} />,
//   6: <Truck size={18} />,
//   7: <Palette size={18} />,
//   8: <HardHat size={18} />,
//   9: <Users size={18} />,
//   10: <GraduationCap size={18} />,
// };

// const CategoryCard = ({ category }: { category: Category }) => {
//   return (
//     <Link href={`/jobs?catId=${category?.id}`}>
//       <Card className="p-0 group border-gray-200 hover:border-gray-300 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-gray-50 hover:scale-105">
//         <div className="flex items-center gap-3 px-4 py-3.5">
//           <div className="w-10 h-10 flex items-center justify-center rounded-[10px] shrink-0 transition-all duration-200 bg-gray-100 group-hover:bg-gray-200">
//             {categoryIcons[category.id]}
//           </div>
//           <div>
//             <h6>{category.name}</h6>
//             <p className="text-[12px] mt-0.5">
//               {category._count.jobs.toLocaleString()} jobs available
//             </p>
//           </div>
//         </div>
//       </Card>
//     </Link>
//   );
// };

// const Categories = () => {
//   const { data, isLoading } = useCategories();

//   const categories: Category[] = data?.data ?? [];

//   return (
//     <section className="w-full bg-white py-12 md:py-20">
//       <div className="container max-w-4xl mx-auto px-6">
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-[11px] font-medium tracking-[0.6px] uppercase rounded-full px-4 py-1.5 mb-2 bg-primary/5 text-primary">
//             <Zap className="w-3 h-3" />
//             Explore Careers
//           </div>
//           <h2 className="font-medium text-2xl sm:text-3xl md:text-[32px] lg:text-[42px]">
//             Explore all the job{" "}
//             <span className="font-normal text-primary italic">categories</span>
//             <br />
//             that change yourself.
//           </h2>
//           <p className="text-xs sm:text-sm md:text-lg mt-1.5 md:mt-3">
//             10 categories · thousands of opportunities
//           </p>
//         </div>

//         {isLoading ? (
//           <CategorySkeleton />
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3">
//               {categories.map((cat) => (
//                 <CategoryCard key={cat.id} category={cat} />
//               ))}
//             </div>

//             <div className="hidden md:block">
//               <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto mb-3">
//                 {categories.slice(0, 3).map((cat) => (
//                   <CategoryCard key={cat.id} category={cat} />
//                 ))}
//               </div>
//               <div className="grid grid-cols-4 gap-3 mb-3 max-w-5xl mx-auto">
//                 {categories.slice(3, 7).map((cat) => (
//                   <CategoryCard key={cat.id} category={cat} />
//                 ))}
//               </div>
//               <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
//                 {categories.slice(7, 10).map((cat) => (
//                   <CategoryCard key={cat.id} category={cat} />
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Categories;
