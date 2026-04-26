import {
  Blend,
  Briefcase,
  Building2,
  Clock,
  Code2,
  GitMerge,
  GraduationCap,
  Home,
  Layers,
  LayoutDashboard,
  LucideIcon,
  PenTool,
  Wifi,
} from "lucide-react";

export const JOB_FILTER_TABS = [
  "ALL",
  "FULL_TIME",
  "PART_TIME",
  "REMOTE",
  "HYBRID",
  "INTERNSHIP",
];

export const LOCATIONS_OPTIONS = [
  { label: "Dhaka", value: "Dhaka" },
  { label: "Chattogram", value: "Chattogram" },
  { label: "Sylhet", value: "Sylhet" },
  { label: "Rajshahi", value: "Rajshahi" },
  { label: "Khulna", value: "Khulna" },
  { label: "Barishal", value: "Barishal" },
  { label: "Rangpur", value: "Rangpur" },
  { label: "Mymensingh", value: "Mymensingh" },
];

export const JOB_FILTER_TAGS_OPTIONS = [
  { label: "Full Time", value: "FULL_TIME" },
  { label: "Part time", value: "PART_TIME" },
  { label: "Remote", value: "REMOTE" },
  { label: "Hybrid", value: "HYBRID" },
  { label: "Internship", value: "INTERNSHIP" },
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

export const SEARCH_JOB_TYPES = [
  { value: "", label: "All types", Icon: Layers },
  { value: "REMOTE", label: "Remote", Icon: Wifi },
  { value: "FULL_TIME", label: "Full-time", Icon: Building2 },
  { value: "HYBRID", label: "Hybrid", Icon: GitMerge },
  { value: "PART_TIME", label: "Part-time", Icon: Clock },
  { value: "INTERNSHIP", label: "Internship", Icon: GraduationCap },
];

export const SEARCH_QUICK_TAGS: {
  label: string;
  Icon: React.ElementType;
  q?: string;
  jobType?: string;
}[] = [
  { label: "Remote", Icon: Wifi, jobType: "REMOTE" },
  { label: "Hybrid", Icon: GitMerge, jobType: "HYBRID" },
  { label: "Design", Icon: PenTool, q: "designer" },
  { label: "Engineering", Icon: Code2, q: "engineer" },
  { label: "Product", Icon: LayoutDashboard, q: "product manager" },
  { label: "Internship", Icon: GraduationCap, jobType: "INTERNSHIP" },
];
