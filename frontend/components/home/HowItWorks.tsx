"use client";

import { fadeUp, stagger } from "@/lib/animations";
import { motion } from "framer-motion";
import { BadgeCheck, Search, UserRoundPlus, Zap } from "lucide-react";

const STEPS = [
  {
    number: 1,
    icon: UserRoundPlus,
    title: "Create your profile",
    desc: "Sign up in seconds and build a profile that showcases your skills and experience.",
  },
  {
    number: 2,
    icon: Search,
    title: "Browse & apply",
    desc: "Filter thousands of roles by type, location, and salary. Apply with one click.",
  },
  {
    number: 3,
    icon: BadgeCheck,
    title: "Get hired",
    desc: "Hear back from employers, schedule interviews, and land the role that fits you best.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
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
            Simple process
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-medium text-2xl sm:text-3xl md:text-[32px] lg:text-[42px]"
          >
            Get hired in{" "}
            <span className="font-normal text-primary italic">
              three simple
            </span>{" "}
            steps
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-lg mx-auto text-xs sm:text-sm md:text-lg mt-1.5 md:mt-3"
          >
            No lengthy sign-ups or complicated processes — start your job search
            and land your dream role in minutes.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="relative grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 max-w-3xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Dashed connector line */}
          <div
            className="hidden sm:block absolute top-9 pointer-events-none"
            style={{
              left: "calc(16.66% + 32px)",
              right: "calc(16.66% + 32px)",
              height: "1px",
              backgroundImage:
                "repeating-linear-gradient(90deg,#CECBF6 0,#CECBF6 6px,transparent 6px,transparent 14px)",
            }}
          />

          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center px-4 z-10"
            >
              <div className="absolute top-1 left-1/2 translate-x-4 -translate-y-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold bg-black text-white">
                {step.number}
              </div>

              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-5 bg-white border border-black/10">
                <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-black/5">
                  <step.icon className="w-[22px] h-[22px]" />
                </div>
              </div>

              <h5 className="mb-2">{step.title}</h5>
              <p className="text-xs max-w-[200px]">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import { BadgeCheck, Search, UserRoundPlus, Zap } from "lucide-react";

// const STEPS = [
//   {
//     number: 1,
//     icon: UserRoundPlus,
//     iconBg: "#EEEDFE",
//     iconColor: "#534AB7",
//     ringBorder: "rgba(91,79,207,0.18)",
//     title: "Create your profile",
//     desc: "Sign up in seconds and build a profile that showcases your skills and experience.",
//   },
//   {
//     number: 2,
//     icon: Search,
//     iconBg: "#E1F5EE",
//     iconColor: "#0F6E56",
//     ringBorder: "rgba(29,158,117,0.18)",
//     title: "Browse & apply",
//     desc: "Filter thousands of roles by type, location, and salary. Apply with one click.",
//   },
//   {
//     number: 3,
//     icon: BadgeCheck,
//     iconBg: "#FAECE7",
//     iconColor: "#993C1D",
//     ringBorder: "rgba(216,90,48,0.18)",
//     title: "Get hired",
//     desc: "Hear back from employers, schedule interviews, and land the role that fits you best.",
//   },
// ];

// export default function HowItWorks() {
//   return (
//     <section className="py-12 md:py-20 bg-white">
//       <div className="container ">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-[11px] font-medium tracking-[0.6px] uppercase rounded-full px-4 py-1.5 mb-2 bg-primary/5 text-primary">
//             <Zap className="w-3 h-3" />
//             Simple process
//           </div>
//           <h2 className="font-medium text-2xl sm:text-3xl md:text-[32px] lg:text-[42px]">
//             Get hired in{" "}
//             <span className="font-normal text-primary italic">
//               three simple
//             </span>{" "}
//             steps
//           </h2>
//           <p className="max-w-lg mx-auto text-xs sm:text-sm md:text-lg mt-1.5 md:mt-3">
//             No lengthy sign-ups or complicated processes — start your job search
//             and land your dream role in minutes.
//           </p>
//         </div>

//         <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 max-w-3xl mx-auto">
//           <div
//             className="hidden sm:block absolute top-9 pointer-events-none"
//             style={{
//               left: "calc(16.66% + 32px)",
//               right: "calc(16.66% + 32px)",
//               height: "1px",
//               backgroundImage:
//                 "repeating-linear-gradient(90deg,#CECBF6 0,#CECBF6 6px,transparent 6px,transparent 14px)",
//             }}
//           />

//           {STEPS.map((step) => (
//             <div
//               key={step.number}
//               className="relative flex flex-col items-center text-center px-4 z-10"
//             >
//               <div
//                 className="absolute top-1 left-1/2 translate-x-4 -translate-y-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold bg-black text-white"
//                 // style={{ background: step.iconColor }}
//               >
//                 {step.number}
//               </div>

//               <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-5 bg-white border border-black/10">
//                 <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-black/5">
//                   <step.icon className="w-[22px] h-[22px]" />
//                 </div>
//               </div>

//               <h5 className="mb-2">{step.title}</h5>
//               <p className="text-xs max-w-[200px]">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
