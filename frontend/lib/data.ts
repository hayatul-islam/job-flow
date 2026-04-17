import {
  Blend,
  Briefcase,
  Clock,
  GraduationCap,
  Home,
  LucideIcon,
} from "lucide-react";

export const JOB_FILTER_TABS = [
  "ALL",
  "FULL_TIME",
  "PART_TIME",
  "REMOTE",
  "HYBRID",
  "INTERNSHIP",
];

export const LOCATIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Remote",
];

export const STATS = [
  { value: "12,400+", label: "Active Jobs" },
  { value: "3,200+", label: "Companies" },
  { value: "98k+", label: "Job Seekers" },
];

export const JOB_TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  INTERNSHIP: "Internship",
};

export const JOB_TYPE_COLOR: Record<string, string> = {
  FULL_TIME: "bg-blue-50 text-blue-800",
  PART_TIME: "bg-amber-50 text-amber-800",
  REMOTE: "bg-green-50 text-green-800",
  HYBRID: "bg-purple-50 text-purple-800",
  INTERNSHIP: "bg-pink-50 text-pink-800",
};

export const JOB_TYPE_CONFIG: Record<
  string,
  { label: string; icon: LucideIcon; className: string }
> = {
  FULL_TIME: {
    label: "Full Time",
    icon: Briefcase,
    className: "bg-blue-50 text-blue-800",
  },
  PART_TIME: {
    label: "Part Time",
    icon: Clock,
    className: "bg-yellow-50 text-yellow-800",
  },
  REMOTE: {
    label: "Remote",
    icon: Home,
    className: "bg-purple-50 text-purple-800",
  },
  HYBRID: {
    label: "Hybrid",
    icon: Blend,
    className: "bg-indigo-50 text-indigo-800",
  },
  INTERNSHIP: {
    label: "Internship",
    icon: GraduationCap,
    className: "bg-green-50 text-green-800",
  },
};
