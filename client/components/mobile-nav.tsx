import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#about", label: "About", section: "about" },
  { href: "/#experience", label: "Projects", section: "experience" },
  { href: "/blog", label: "Blog", section: null },
  { href: "/#contact", label: "Contact", section: "contact" },
];

interface MobileNavProps {
  activeSection: string;
}

export function MobileNav({ activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.substring(2);
      
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
      }
    }
    setIsOpen(false);
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.section === null && location.pathname === "/blog") {
      return true;
    }
    return location.pathname === "/" && activeSection === item.section;
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-menu"
            className={cn(
              "fixed right-0 top-[76px] z-50 w-full max-w-sm border-l border-border bg-background shadow-xl transition-transform duration-300 ease-in-out",
              isOpen ? "translate-x-0" : "translate-x-full"
            )}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col p-6 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
                    isActive(item) ? "bg-accent/50 text-foreground font-semibold" : "text-foreground"
                  )}
                  aria-current={isActive(item) ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={(e) => handleClick(e, "/#contact")}
                className="mt-4 block rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Let's Connect
              </a>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
