import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS = {
  "For Job Seekers": [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Salary Guide", href: "/salary" },
    { label: "Career Tips", href: "/blog" },
  ],
  "For Employers": [
    { label: "Post a Job", href: "/post-job" },
    { label: "Pricing", href: "/pricing" },
    { label: "Employer Dashboard", href: "/dashboard/employer" },
    { label: "Hire in Bulk", href: "/enterprise" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BriefcaseIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-xl font-serif">
                Job<span className="text-primary">.</span>Flow
              </span>
            </Link>
            <p className="text-white/30 text-xs font-light leading-relaxed max-w-[200px]">
              Bangladesh's most trusted job platform connecting talent with
              opportunity.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/35 hover:text-white/70 text-sm font-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs font-light">
            © {new Date().getFullYear()} work.ly. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-light">
            Made with ♥ in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
