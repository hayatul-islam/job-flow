"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { DropdownItemConfig } from "@/types";
import { Briefcase, FileText, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const MENU_ITEMS: DropdownItemConfig[] = [
  {
    label: "Profile",
    sublabel: "View & edit profile",
    href: "/profile",
    icon: <User size={14} />,
  },

  {
    label: "My posts",
    sublabel: "Active job listings",
    href: "/my-posts",
    icon: <FileText size={14} />,
    roles: ["EMPLOYER"],
  },

  {
    label: "My applied",
    sublabel: "Track your applications",
    href: "/my-applied",
    icon: <Briefcase size={14} />,
    roles: ["JOB_SEEKER"],
  },
];

export default function UserDropdown() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const visibleItems = MENU_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(user.role),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-[14px] font-medium shrink-0">
            {user.firstName?.[0]}
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-60 ">
        <DropdownMenuLabel className="px-4 py-3.5 font-normal border-b border-black/5">
          <h6 className="font-medium">
            {user.firstName} {user.lastName}
          </h6>
          <p className="text-xs mt-0.5 truncate">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuGroup className="p-1.5">
          {visibleItems.map((item) => (
            <DropdownMenuItem
              key={item.href}
              asChild
              className="rounded-lg p-0 cursor-pointer"
            >
              <Link
                href={item.href}
                className="flex items-center gap-2.5 px-2.5 py-2 w-full rounded-lg hover:bg-black/5"
              >
                <span className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center shrink-0 text-black/80">
                  {item.icon}
                </span>
                <div className="flex flex-col">
                  <h6 className=" font-normal">{item.label}</h6>
                  {item.sublabel && (
                    <p className="text-[11px] leading-tight">{item.sublabel}</p>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-black/5 mx-0" />

        <DropdownMenuGroup className="p-1.5">
          <DropdownMenuItem>
            <Button
              onClick={logout}
              className="h-10 w-full border border-red-50 bg-transparent hover:bg-red-50"
            >
              <LogOut size={14} className="text-red-400" />

              <span className="text-sm text-red-500">Logout</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
