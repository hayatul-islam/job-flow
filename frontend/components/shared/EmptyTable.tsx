// components/shared/EmptyState.tsx
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyTable({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
        <Icon size={24} className="text-gray-400" />
      </div>
      <div>
        <h6 className="text-center">{title}</h6>
        <p className="text-xs mt-0.5 text-center">{description}</p>
      </div>
      {actionLabel &&
        (actionHref ? (
          <Link href={actionHref}>
            <Button className="h-9 text-xs px-4 bg-black text-white">
              {actionLabel}
            </Button>
          </Link>
        ) : (
          <Button
            onClick={onAction}
            className="h-9 text-xs px-4 bg-black text-white"
          >
            {actionLabel}
          </Button>
        ))}
    </div>
  );
}
