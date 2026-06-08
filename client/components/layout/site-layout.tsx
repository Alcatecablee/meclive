import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Phone, ExternalLink, Twitter } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#about", label: "About", title: "Go to About section", section: "about" },
  {
    href: "/#experience",
    label: "Projects",
    title: "View projects and work",
    section: "experience",
  },
  { href: "/blog", label: "Blog", title: "Read expert insights and articles", section: null },
  { href: "/#contact", label: "Contact", title: "Reach the contact section", section: "contact" },
];

const footerLinks = [
  { href: "https://quickbridge.app", label: "QuickBridge" },
  { href: "https://calmpc.app", label: "CalmPC" },
  { href: "https://calmclip.app", label: "CalmClip" },
  { href: "https://superk53.co.za", label: "SuperK53" },
];

export default function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["about", "experience", "contact"];
    
    const checkInitialSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    checkInitialSection();

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      if (intersectingEntries.length > 0) {
        const mostVisible = intersectingEntries.reduce((prev, current) => 
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        setActiveSection(mostVisible.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.section === null && location.pathname === "/blog") {
      return true;
    }
    return location.pathname === "/" && activeSection === item.section;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-3 text-left">
            <img 
              src="/favicon-32x32.png" 
              alt="Just Clive Logo" 
              className="h-10 w-10 rounded-full shadow-md"
            />
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                Just Clive
              </p>
              <p className="text-xs text-muted-foreground">
                Entrepreneur &amp; Technology Leader
              </p>
            </div>
          </Link>
          <nav
            className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                title={item.title}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "transition-colors hover:text-foreground",
                  isActive(item) && "text-foreground font-semibold"
                )}
                aria-current={isActive(item) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/#contact"
              title="Open the contact section"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 md:inline-flex"
            >
              Let's Connect
            </a>
            <MobileNav activeSection={activeSection} />
          </div>
        </div>
      </header>
      <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
      <footer className="border-t border-border bg-background/80 py-12 sm:py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/favicon-32x32.png" 
                alt="Just Clive Logo" 
                className="h-10 w-10 rounded-full shadow-md"
              />
              <div>
                <p className="font-display text-lg font-semibold tracking-tight">
                  Clive "Just_Clive" Makazhu
                </p>
                <p className="text-xs text-muted-foreground">
                  South African Developer &amp; Entrepreneur
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Entrepreneur &amp; technology leader building innovative digital
              solutions for South African consumers and businesses from
              Johannesburg.
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href="https://wa.me/27670494876"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with Clive on WhatsApp"
                className="inline-flex min-h-[44px] items-center gap-2 py-1 transition-colors hover:text-primary"
                aria-label="Chat with Clive on WhatsApp"
              >
                <Phone className="h-4 w-4" aria-hidden />
                WhatsApp Chat
              </a>
              <a
                href="mailto:hello@justc.live"
                title="Email Clive Makazhu"
                className="inline-flex items-center gap-2 transition hover:text-primary"
              >
                <Mail className="h-4 w-4" aria-hidden />
                hello@justc.live
              </a>
              <a
                href="https://x.com/just_clive_sa"
                target="_blank"
                rel="noopener noreferrer me"
                title="Follow Clive on X"
                className="inline-flex items-center gap-2 transition hover:text-primary"
                aria-label="Follow Clive on X"
              >
                <Twitter className="h-4 w-4" aria-hidden />
                @just_clive_sa
              </a>
            </div>
          </div>
          <div className="grid gap-6 text-sm text-muted-foreground">
            <p className="text-sm font-semibold text-foreground">Quick Links</p>
            <div className="flex flex-col gap-3">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 transition hover:text-primary"
              >
                Blog & Insights
              </Link>
              <a
                href="/#about"
                className="inline-flex items-center gap-2 transition hover:text-primary"
              >
                About
              </a>
              <a
                href="/#experience"
                className="inline-flex items-center gap-2 transition hover:text-primary"
              >
                Projects
              </a>
            </div>
          </div>
          <div className="grid gap-6 text-sm text-muted-foreground">
            <p className="text-sm font-semibold text-foreground">Platforms</p>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visit ${link.label}`}
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex w-full max-w-6xl items-center justify-between px-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Clive "Just_Clive" Makazhu. All rights reserved.
          </p>
          <a
            href="https://www.macaly.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Discover Macaly"
            className="rounded-full border border-border bg-background px-4 py-2 transition hover:border-primary/40 hover:text-primary"
          >
            Built with Macaly
          </a>
        </div>
      </footer>
    </div>
  );
}
