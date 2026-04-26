import { fadeUp, shimmerAnimate, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

const Shimmer = ({ className }: { className: string }) => (
  <motion.div
    initial={{ opacity: 0.5 }}
    animate={shimmerAnimate}
    className={className}
  />
);

const SkeletonItem = () => {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center justify-between py-3"
    >
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-lg bg-gray-200" />
        <div className="space-y-2">
          <Shimmer className="w-40 h-3 rounded bg-gray-200" />
          <Shimmer className="w-24 h-2 rounded bg-gray-200" />
        </div>
      </div>
      <Shimmer className="w-16 h-2 rounded bg-gray-200" />
    </motion.div>
  );
};

const LiveJobFeedSkeleton = () => {
  return (
    <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-md">
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          background: [
            "linear-gradient(120deg, #ffffff 0%, #f3f4f6 50%, #ffffff 100%)",
            "linear-gradient(120deg, #f3f4f6 0%, #ffffff 50%, #f3f4f6 100%)",
            "linear-gradient(120deg, #ffffff 0%, #f3f4f6 50%, #ffffff 100%)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 p-5 space-y-4"
      >
        <motion.div
          variants={fadeUp}
          className="flex items-start justify-between"
        >
          <div className="space-y-2">
            <Shimmer className="w-28 h-4 bg-gray-200 rounded" />
            <Shimmer className="w-36 h-3 bg-gray-200 rounded" />
          </div>
          <Shimmer className="w-16 h-6 rounded-full bg-gray-200" />
        </motion.div>

        <motion.div variants={staggerContainer}>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </motion.div>

        <motion.div variants={fadeUp} className="pt-2">
          <Shimmer className="w-full h-10 rounded-xl bg-gray-200" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LiveJobFeedSkeleton;
