import Jobs from "@/components/jobs/Jobs";
import { Suspense } from "react";

const JobPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Jobs />
    </Suspense>
  );
};

export default JobPage;
