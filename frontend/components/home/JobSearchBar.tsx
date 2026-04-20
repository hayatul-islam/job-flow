"use client";
import {
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Code2,
  FileText,
  GitMerge,
  Layers,
  LayoutDashboard,
  PenTool,
  Search,
  Wifi,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const JOB_TYPES = [
  { value: "", label: "All types", Icon: Layers },
  { value: "REMOTE", label: "Remote", Icon: Wifi },
  { value: "FULL_TIME", label: "Full-time", Icon: Building2 },
  { value: "HYBRID", label: "Hybrid", Icon: GitMerge },
  { value: "PART_TIME", label: "Part-time", Icon: Clock },
  { value: "INTERNSHIP", label: "Internship", Icon: FileText },
];

const QUICK_TAGS: {
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
  { label: "Internship", Icon: FileText, jobType: "INTERNSHIP" },
];

type DropDirection = "above" | "below";

export default function SearchBarLight() {
  const router = useRouter();

  const [q, setQ] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [direction, setDirection] = useState<DropDirection>("below");

  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    JOB_TYPES.find((t) => t.value === jobType) ?? JOB_TYPES[0];

  const computeDirection = useCallback((): DropDirection => {
    if (!triggerRef.current || !panelRef.current) return "below";
    const rect = triggerRef.current.getBoundingClientRect();
    const panelH = panelRef.current.scrollHeight || 220;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    return spaceBelow < panelH && spaceAbove > spaceBelow ? "above" : "below";
  }, []);

  const openDropdown = useCallback(() => {
    setDirection(computeDirection());
    setOpen(true);
  }, [computeDirection]);

  const closeDropdown = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    const handleResize = () => {
      if (open) setDirection(computeDirection());
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, closeDropdown, computeDirection]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (jobType) params.set("jobType", jobType);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") closeDropdown();
  };

  const handleQuickTag = (tag: (typeof QUICK_TAGS)[number]) => {
    if (tag.q) setQ((prev) => (prev === tag.q ? "" : tag.q!));
    if (tag.jobType)
      setJobType((prev) => (prev === tag.jobType ? "" : tag.jobType!));
  };

  const isTagActive = (tag: (typeof QUICK_TAGS)[number]) =>
    (tag.jobType && jobType === tag.jobType) || (tag.q && q === tag.q);

  const panelPositionStyle: React.CSSProperties =
    direction === "above"
      ? { bottom: "calc(100% + 8px)", top: "auto" }
      : { top: "calc(100% + 8px)", bottom: "auto" };

  return (
    <div className="max-w-3xl mx-auto mb-16">
      <Card className="p-0 flex flex-col sm:flex-row ">
        <div className="flex flex-1 items-center gap-3 px-5 py-1">
          <Search className="w-5 h-5 shrink-0 text-primary" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Job title, skills, or company…"
            className="flex-1 bg-transparent text-sm outline-none py-3"
          />
        </div>

        <div className="hidden sm:block w-px self-stretch my-3 bg-primary/10" />
        <div className="block sm:hidden h-px mx-5 bg-primary/10" />

        <div
          ref={triggerRef}
          className="relative flex items-center gap-2 px-4 py-1 cursor-pointer select-none min-w-[160px]"
          onClick={() => (open ? closeDropdown() : openDropdown())}
        >
          <Briefcase className="w-4 h-4 shrink-0 text-primary" />

          <span
            className={`flex-1 py-3 text-sm ${jobType ? "text-black/90" : "text-black/50"}`}
          >
            {jobType ? selectedOption.label : "Job type"}
          </span>

          <ChevronDown
            className="w-4 h-4 shrink-0 transition-transform duration-200 text-black/50"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />

          <div
            ref={panelRef}
            className="absolute left-0 right-0 z-50 overflow-hidden rounded-xl bg-white border border-primary/20 shadow-lg min-w-[180px]"
            style={{
              ...panelPositionStyle,
              opacity: open ? 1 : 0,
              pointerEvents: open ? "all" : "none",
              transform: open
                ? "translateY(0)"
                : direction === "above"
                  ? "translateY(4px)"
                  : "translateY(-4px)",
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {JOB_TYPES.map((type) => {
              const active = jobType === type.value;
              return (
                <div
                  key={type.value}
                  className={`group flex items-center gap-2.5 px-3.5 py-2.5 text-sm cursor-pointer hover:bg-black/3 hover:text-black ${active ? "bg-black/3 text-black" : "bg-transparent text-black/70"}`}
                  onClick={() => {
                    setJobType(type.value);
                    closeDropdown();
                  }}
                >
                  <type.Icon
                    className={`w-3.5 h-3.5 shrink-0 group-hover:text-primary ${active ? "text-primary" : "text-black/50"}`}
                  />
                  <span className="flex-1">{type.label}</span>
                  {active && <Check className="w-3.5 h-3.5 text-primary" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-2">
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-2 mt-3 px-1">
        <span className="text-xs text-primary/80">Popular:</span>
        {QUICK_TAGS.map((tag) => {
          const active = isTagActive(tag);
          return (
            <button
              key={tag.label}
              onClick={() => handleQuickTag(tag)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-[1.03] text-primary border  ${active ? "bg-primary/10 border-primary/40" : "bg-primary/5 border-primary/5"}`}
            >
              <tag.Icon className="w-3 h-3" />
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
