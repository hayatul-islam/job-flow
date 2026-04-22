"use client";

import { useCategories } from "@/hooks/useCategories";

import { useCreateJob } from "@/hooks/useJobs";
import { createJobSchema, JobForm } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import RichTextEditor from "../shared/RichTextEditor";
import SelectField from "../shared/SelectField";
import { Button } from "../ui/button";

const JOB_TYPES = [
  { label: "Full Time", value: "FULL_TIME" },
  { label: "Part Time", value: "PART_TIME" },
  { label: "Remote", value: "REMOTE" },
  { label: "Hybrid", value: "HYBRID" },
  { label: "Internship", value: "INTERNSHIP" },
];

export default function CreateJobForm() {
  const { data } = useCategories();
  const { mutate: createJob, isPending } = useCreateJob();

  const categoryOptions = data?.data?.map((cat: any) => ({
    value: cat?.id,
    label: cat?.name,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<JobForm>({
    resolver: zodResolver(createJobSchema),
  });

  const onSubmit = (data: JobForm) => {
    createJob(
      {
        ...data,
        salary: data.salary,
        categoryId: Number(data.categoryId),
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <div className=" bg-[#f7f7f5] flex items-start justify-center py-12 px-4 pt-24">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-black tracking-tight">
            Post a New Job
          </h3>
          <p className=" mt-1">
            Fill out the details below to publish your job listing.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-1 bg-black w-full" />

          <div className="p-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputField
                label="Job Title"
                editable
                placeholder="e.g. Senior React Developer"
                registration={register("title")}
                error={errors.title?.message}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Location"
                  editable
                  placeholder="e.g. Remote, Bangladesh"
                  registration={register("location")}
                  error={errors.location?.message}
                />
                <InputField
                  label="Salary (per month)"
                  editable
                  placeholder="e.g. 80000"
                  registration={register("salary")}
                  error={errors.salary?.message}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SelectField
                  label="Job Type"
                  placeholder="Select job type"
                  options={JOB_TYPES}
                  registration={register("jobType")}
                  error={errors.jobType?.message}
                />
                <SelectField
                  label="Category"
                  placeholder="Select category"
                  options={categoryOptions}
                  registration={register("categoryId")}
                  error={errors.categoryId?.message}
                />
              </div>

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    label="Job Description"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.description?.message}
                  />
                )}
              />

              <div className="border-t border-gray-100" />

              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  disabled={isPending}
                  className={` bg-black disabled:cursor-not-allowed`}
                >
                  {isPending ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>Post Job</>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
