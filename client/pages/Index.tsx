import { FormEvent, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  ChevronDown,
  Clock,
  Code2,
  ExternalLink,
  Layers,
  LineChart,
  Loader2,
  MapPin,
  MessageCircle,
  Monitor,
  ShieldCheck,
  Sparkles,
  Terminal,
  Twitter,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { blogPosts } from "@/data/blog-posts";

type StatCard = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type PortfolioItem = {
  company: string;
  role: string;
  timeframe: string;
  description: string;
  highlights: string[];
  link?: {
    href: string;
    label: string;
  };
  badge?: string;
  location?: string;
};

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

type PlatformSolution = {
  title: string;
  badge: string;
  description: string;
  details: string;
  bullets: string[];
  link: {
    href: string;
    label: string;
  };
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type ContactChannel = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FAQItem = {
  question: string;
  answer: string;
};

const stats: StatCard[] = [
  {
    value: "15+",
    label: "Years Experience",
    description: "Continuous technology and IT expertise since 2010",
    icon: Sparkles,
  },
  {
    value: "4",
    label: "Active Platforms",
    description: "Live products built and shipped across web and developer tools",
    icon: Building2,
  },
  {
    value: "100%",
    label: "Self-Taught",
    description: "No bootcamp, no CS degree — built everything from scratch",
    icon: Code2,
  },
  {
    value: "ZA",
    label: "Based In",
    description: "Building for South Africa and the global developer community",
    icon: MapPin,
  },
];

const portfolioItems: PortfolioItem[] = [
  {
    company: "SuperK53",
    role: "Founder & CEO",
    timeframe: "2020 - Present",
    description:
      "South Africa's Department of Transport certified K53 learner's license assessment platform with real-time scoring and analytics.",
    highlights: [
      "DoT Certified",
      "Digital Assessment",
      "Real-time Analytics",
      "DLTC Directory",
    ],
    link: {
      href: "https://superk53.co.za",
      label: "superk53.co.za",
    },
    badge: "Side Project",
    location: "Johannesburg, South Africa",
  },
  {
    company: "QuickBridge",
    role: "Founder & Developer",
    timeframe: "2025 - Present",
    description:
      "Peer-to-peer file, clipboard, and message transfer via WebRTC and QR-code pairing. No accounts, no installs, nothing stored on a server.",
    highlights: [
      "WebRTC P2P",
      "QR Pairing",
      "PIN Fallback",
      "PWA Installable",
    ],
    link: {
      href: "https://quickbridge.app",
      label: "quickbridge.app",
    },
    badge: "Live",
    location: "Remote / Global",
  },
  {
    company: "CalmPC",
    role: "Founder & Developer",
    timeframe: "2025 - Present",
    description:
      "Browser-based PC health checker with 73 step-by-step fix guides across 15 categories. Privacy-first — all checks run locally, nothing sent to a server.",
    highlights: [
      "73 Fix Guides",
      "No Account",
      "Health Score",
      "Shareable Report",
    ],
    link: {
      href: "https://calmpc.com",
      label: "calmpc.com",
    },
    badge: "Live",
    location: "Remote / Global",
  },
  {
    company: "CalmClip",
    role: "Founder & Developer",
    timeframe: "2025 - Present",
    description:
      "Browser-based video editor powered by FFmpeg WASM. Trim, caption, denoise, blur faces, and transcribe — all processed locally with no uploads.",
    highlights: [
      "FFmpeg WASM",
      "Whisper AI Captions",
      "Face Blur",
      "No Upload",
    ],
    link: {
      href: "https://calmclip.video",
      label: "calmclip.video",
    },
    badge: "Live",
    location: "Remote / Global",
  },
  {
    company: "GAAP Point-of-Sale",
    role: "Help Desk Technician",
    timeframe: "Jan 2016 - Present",
    description:
      "Providing remote IT support for point-of-sale systems, ensuring network reliability and uninterrupted retail operations across South Africa.",
    highlights: [
      "Computer Networking",
      "POS Systems",
      "Remote Support",
      "Enterprise Helpdesk",
    ],
    location: "Midrand (Remote)",
  },
];

const skillCategories: SkillCategory[] = [
  {
    title: "Digital Platform Development",
    icon: Monitor,
    items: [
      "Web Application Development",
      "User Experience Design",
      "Database Architecture",
      "API Integration",
    ],
  },
  {
    title: "Business Development",
    icon: Users,
    items: [
      "Startup Founding",
      "Product Strategy",
      "Market Analysis",
      "Customer Acquisition",
    ],
  },
  {
    title: "Compliance & Security",
    icon: ShieldCheck,
    items: [
      "SARS Compliance",
      "POPIA Compliance",
      "Department of Transport Certification",
      "Data Security",
    ],
  },
  {
    title: "Professional Certifications",
    icon: BadgeCheck,
    items: [
      "CompTIA A+",
      "CompTIA Network+",
      "Professional Helpdesk",
      "POS Systems Expert",
    ],
  },
];

const platformSolutions: PlatformSolution[] = [
  {
    title: "QuickBridge",
    badge: "Live",
    description:
      "Instant P2P file, clipboard & message transfer with no accounts.",
    details:
      "Pairs two devices via QR code or 6-digit PIN over a WebRTC data channel. Files, text, and clipboard stay entirely between the two browsers — no server ever sees your data.",
    bullets: [
      "WebRTC P2P Transfer",
      "QR + PIN Pairing",
      "Auto-clipboard Sync",
      "PWA Installable",
    ],
    link: {
      href: "https://quickbridge.app",
      label: "Visit QuickBridge",
    },
  },
  {
    title: "CalmPC",
    badge: "Live",
    description:
      "Browser-based PC health checker and step-by-step fix guide library.",
    details:
      "Runs a real device health scan using browser APIs, generates an animated score, and recommends from 73 guides across 15 categories. Everything runs locally — no uploads, no tracking.",
    bullets: [
      "73 Fix Guides",
      "Live Health Score",
      "Shareable Report",
      "No Account Needed",
    ],
    link: {
      href: "https://calmpc.com",
      label: "Visit CalmPC",
    },
  },
  {
    title: "CalmClip",
    badge: "Live",
    description:
      "Browser-based video editor — trim, caption, and enhance locally.",
    details:
      "FFmpeg WASM handles all processing in-browser. AI features include Whisper transcription, filler-word removal, word-by-word captions, and face blur — no file ever leaves your device.",
    bullets: [
      "FFmpeg WASM",
      "Whisper Captions",
      "Face Blur",
      "Silence Cutter",
    ],
    link: {
      href: "https://calmclip.video",
      label: "Visit CalmClip",
    },
  },
  {
    title: "SuperK53",
    badge: "Side Project",
    description:
      "K53 learner's license assessment platform for South Africans.",
    details:
      "Department of Transport certified digital examinations with comprehensive preparation, real-time scoring, and verified DLTC directory access.",
    bullets: [
      "DoT Certification",
      "64-Question Assessments",
      "Performance Analytics",
      "DLTC Directory",
    ],
    link: {
      href: "https://superk53.co.za",
      label: "Visit SuperK53",
    },
  },
];


const testimonials: Testimonial[] = [
  {
    quote:
      "SuperK53 helped me pass my learner's test on the first try. The practice questions mirrored the real exam perfectly!",
    name: "T. Mthembu",
    role: "SuperK53 Learner",
  },
  {
    quote:
      "The SuperK53 platform is incredibly detailed. I felt fully prepared walking into the DLTC. Passed with flying colours!",
    name: "K. Dlamini",
    role: "SuperK53 Learner",
  },
];

const contactChannels: ContactChannel[] = [
  {
    title: "Digital Platform Development",
    description:
      "Design, build, and launch platforms tailored to South African users.",
    icon: Layers,
  },
  {
    title: "Business Partnerships",
    description:
      "Collaborate on growth strategies and scalable technology solutions.",
    icon: LineChart,
  },
];

const faqItems: FAQItem[] = [
  {
    question: "How does SuperK53 help with learner's license preparation?",
    answer:
      "SuperK53 is a Department of Transport certified K53 assessment platform. It offers 64-question practice tests that mirror real exams, real-time scoring, performance analytics, and access to a verified DLTC testing centre directory.",
  },
  {
    question: "What kind of digital work do you take on?",
    answer:
      "I build web platforms and digital products — primarily for South African markets. My focus is on practical, useful tools that solve real problems. If you have an idea and need someone to bring it to life technically, feel free to reach out.",
  },
  {
    question: "What certifications do you hold?",
    answer:
      "I hold CompTIA A+ and CompTIA Network+ certifications, along with professional helpdesk credentials and POS systems expertise. With 15+ years of hands-on experience, I bring enterprise-level technical knowledge to every project.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "You can use the contact form below, reach out via WhatsApp, or find me on X (Twitter) as @just_clive_sa. I typically respond within 24 hours.",
  },
];

function SectionWrapper({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}

function SectionHeading({
  title,
  description,
  eyebrow,
  align = "center",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

function HighlightBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
      {children}
    </span>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl sm:p-8" tabIndex={0}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {item.badge ? <HighlightBadge>{item.badge}</HighlightBadge> : null}
          <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
            {item.company}
          </h3>
          <p className="mt-2 text-base font-medium text-muted-foreground">
            {item.role}
          </p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <CalendarDays className="h-4 w-4" aria-hidden />
            <span>{item.timeframe}</span>
          </div>
          {item.location ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {item.location}
            </p>
          ) : null}
        </div>
      </div>
      <p className="mt-6 text-base text-muted-foreground">{item.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {item.highlights.map((highlight) => (
          <span
            key={highlight}
            className="inline-flex items-center rounded-full border border-border/80 bg-background px-3 py-1 text-sm text-muted-foreground transition-colors group-hover:border-primary/40"
          >
            {highlight}
          </span>
        ))}
      </div>
      {item.link ? (
        <a
          href={item.link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${item.company} in a new tab`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          {item.link.label}
        </a>
      ) : null}
    </article>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = category.icon;
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg sm:p-6" tabIndex={0}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground">
          {category.title}
        </h3>
      </div>
      <ul className="grid gap-3 text-sm text-muted-foreground">
        {category.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 rounded-lg bg-background/80 px-3 py-2 shadow-sm"
          >
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlatformCard({ platform }: { platform: PlatformSolution }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card/80 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8" tabIndex={0}>
      <div className="flex flex-wrap items-center gap-3">
        <HighlightBadge>{platform.badge}</HighlightBadge>
        <h3 className="font-display text-2xl font-semibold text-foreground">
          {platform.title}
        </h3>
      </div>
      <p className="mt-4 text-base font-medium text-muted-foreground">
        {platform.description}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {platform.details}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {platform.bullets.map((bullet) => (
          <span
            key={bullet}
            className="inline-flex items-center rounded-full bg-background px-3 py-1 text-sm text-muted-foreground"
          >
            {bullet}
          </span>
        ))}
      </div>
      <a
        href={platform.link.href}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visit ${platform.title} in a new tab`}
        className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
      >
        <ExternalLink className="h-4 w-4" aria-hidden />
        {platform.link.label}
      </a>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card/70 p-8 shadow-sm">
      <p className="text-base leading-relaxed text-muted-foreground">
        “{testimonial.quote}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Users className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </blockquote>
  );
}

function ContactChannelCard({ channel }: { channel: ContactChannel }) {
  const Icon = channel.icon;
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/70 p-6 text-left shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">
        {channel.title}
      </h3>
      <p className="text-sm text-muted-foreground">{channel.description}</p>
    </div>
  );
}

function BlogPostCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>
        <h3 className="mb-3 font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default function Index() {
  const [contactStatus, setContactStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log("🚀 [CONTACT FORM] Form submission started");
    event.preventDefault();
    
    console.log("📝 [CONTACT FORM] Setting status to loading");
    setContactStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    console.log("📋 [CONTACT FORM] Form data collected - fields:", {
      hasName: !!data.name,
      hasEmail: !!data.email,
      messageLength: data.message?.length || 0,
    });

    try {
      console.log("🌐 [CONTACT FORM] Sending POST request to /api/contact");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("📡 [CONTACT FORM] Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      const result = await response.json();
      console.log("📦 [CONTACT FORM] Response data:", {
        success: result.success,
        hasMessage: !!result.message,
        hasError: !!result.error,
      });

      if (result.success) {
        console.log("✅ [CONTACT FORM] Success! Setting status to success");
        setContactStatus("success");
        console.log("🔄 [CONTACT FORM] Resetting form");
        event.currentTarget.reset();
        console.log("⏱️ [CONTACT FORM] Setting 5-second timeout to reset status");
        setTimeout(() => {
          console.log("🔄 [CONTACT FORM] Timeout complete - resetting status to idle");
          setContactStatus("idle");
        }, 5000);
      } else {
        console.log("❌ [CONTACT FORM] Request failed - error type:", typeof result.error);
        setContactStatus("error");
        setErrorMessage(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("💥 [CONTACT FORM] Network error occurred:", error instanceof Error ? error.message : 'Unknown error');
      setContactStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
    
    console.log("🏁 [CONTACT FORM] Form submission process completed");
  };

  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <ContactSection
        status={contactStatus}
        errorMessage={errorMessage}
        onSubmit={handleContactSubmit}
      />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src="https://macaly-fuagtp0bk4zo8xer5umsdn5d.macaly-app.com/network-bg.jpg"
          alt="Network topology background"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95" />
      </div>
      <div className="relative mx-auto flex min-h-[640px] w-full max-w-6xl flex-col items-center px-6 pb-24 pt-36 text-center">
        <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-primary/20 bg-background shadow-[0_25px_60px_rgba(15,23,42,0.18)]">
          <img
            src="/clive-profile.jpg"
            alt="Clive Just_Clive Makazhu"
            className="h-full w-full object-cover"
          />
          <span className="absolute -bottom-4 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
            <Terminal className="h-7 w-7" aria-hidden />
          </span>
        </div>
        <div className="mt-10 max-w-4xl space-y-6">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Clive "Just_Clive" Makazhu
          </h1>
          <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
            South African Developer &amp; Entrepreneur
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Building privacy-first tools people actually use —
            <span className="font-semibold text-primary"> QuickBridge</span>, <span className="font-semibold text-primary">CalmPC</span>, <span className="font-semibold text-primary">CalmClip</span>, and more.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#experience"
            title="View my projects"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-primary/90 active:translate-y-0 sm:px-10"
          >
            <Code2 className="h-4 w-4" />
            View My Work
          </a>
          <a
            href="#contact"
            title="Jump to the contact section"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-input bg-background/70 px-8 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg active:translate-y-0 sm:px-10"
          >
            Get In Touch
          </a>
        </div>
        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Twitter className="h-5 w-5 text-primary" aria-hidden />
          <a
            href="https://x.com/just_clive_sa"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Clive Makazhu on X"
            className="font-medium text-muted-foreground transition-colors hover:text-primary"
            aria-label="Follow @just_clive_sa on X"
          >
            @just_clive_sa
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      className="bg-gradient-to-b from-background to-background/60"
    >
      <SectionHeading
        eyebrow="About"
        title="Self-taught builder. Relentless shipper."
        description="I spot broken systems and build better ones. No fluff, no excuses. Just code that works."
      />
      <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          I'm a self-taught developer and one-man startup studio based in Johannesburg. I generate ideas fast, execute faster, and pivot when needed. 
          Most people love dreaming. I love building. Every project I touch starts the same way: 
          "This thing is slow, ugly, or stupid. I can build it better." And 9 times out of 10, I actually do.
        </p>
        <p>
          I work as a helpdesk tech by day while shipping products on the side. Right now I'm building a suite of privacy-first browser tools: 
          <span className="font-semibold text-primary"> QuickBridge</span> (P2P file transfer via WebRTC), 
          <span className="font-semibold text-primary"> CalmPC</span> (browser-based PC health checker), and 
          <span className="font-semibold text-primary"> CalmClip</span> (local video editor powered by FFmpeg WASM). 
          I've also built <span className="font-semibold text-primary">SuperK53</span>, a DoT-certified K53 platform for South Africa, plus developer tooling and npm packages.
        </p>
        <p>
          I'm deeply technical. I live inside codebases, APIs, and debugging sessions. I fix things other people are scared to touch. 
          I hold CompTIA A+ and Network+ certifications and have been in IT since 2010. The real goal? 
          Building systems that run themselves. Products that work while I sleep. That's the exit plan.
        </p>
        <p>
          I hate normal. I hate predictable. I pick the weird path on purpose. 
          I work best in chaos — deadlines, late-night sparks, sudden pivots, 10 tabs open in my brain. That's where I thrive.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-base font-medium text-muted-foreground">
          <MapPin className="h-5 w-5 text-primary" aria-hidden />
          <span>
            Johannesburg, South Africa • Building for the global developer community
          </span>
        </div>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="bg-background">
      <SectionHeading
        eyebrow="Other Work"
        title="Projects & Experience"
        description="Ventures and roles I've built or contributed to over the years."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {portfolioItems.map((item) => (
          <PortfolioCard key={`${item.company}-${item.role}`} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function SkillsSection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-background/60 to-background">
      <SectionHeading
        eyebrow="Capabilities"
        title="Technical Expertise & Business Skills"
        description="End-to-end capabilities across product development, compliance, IT support, and business growth."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <SkillCard key={category.title} category={category} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ServicesSection() {
  return (
    <SectionWrapper className="bg-background">
      <SectionHeading
        eyebrow="Solutions"
        title="Digital Platforms"
        description="Practical digital products built for South African users."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {platformSolutions.map((platform) => (
          <PlatformCard key={platform.title} platform={platform} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function TestimonialsSection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-background/60 to-background">
      <SectionHeading
        eyebrow="Testimonials"
        title="What Clients Say"
        description="Real feedback from South Africans who've used SuperK53."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={`${testimonial.name}-${testimonial.role}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function BlogSection() {
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  return (
    <SectionWrapper className="bg-background">
      <SectionHeading
        eyebrow="Blog & Insights"
        title="Latest Articles"
        description="Expert perspectives on technology, entrepreneurship, and digital innovation in South Africa."
      />
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
        >
          View All Articles
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper className="bg-gradient-to-b from-background to-background/60">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Quick answers to common questions about my services and platforms."
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border bg-card/70 shadow-sm transition-all hover:border-primary/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-5 text-left transition-all hover:bg-accent/10 focus-visible:bg-accent/10 sm:p-6"
              aria-expanded={openIndex === index}
            >
              <h3 className="pr-8 font-display text-lg font-semibold text-foreground">
                {item.question}
              </h3>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                  openIndex === index && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function ContactSection({
  status,
  errorMessage,
  onSubmit,
}: {
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <SectionWrapper id="contact" className="bg-background">
      <SectionHeading
        eyebrow="Contact"
        title="Get In Touch"
        description="Whether you need IT support, want to discuss digital platform development, or have questions about my businesses, I'm here to help."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="grid gap-6">
          {contactChannels.map((channel) => (
            <ContactChannelCard key={channel.title} channel={channel} />
          ))}
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-gradient-to-br from-green-500/10 to-green-600/5 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-600">
              <MessageCircle className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              WhatsApp Support
            </h3>
            <p className="text-sm text-muted-foreground">
              Instant messaging for urgent IT support and quick consultations. Click below to start a conversation.
            </p>
            <a
              href="https://wa.me/27670494876?text=Hi%20Clive,%20I%20need%20help%20with"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-8 shadow-lg">
          <h3 className="font-display text-2xl font-semibold text-foreground">
            Share your project or support request
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Have a question about IT support or digital platforms? I'd love to
            help you find the right solution.
          </p>
          <form className="mt-6 space-y-5" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@example.com"
                className="h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-foreground"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="What can I help you with?"
                className="h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me more about your IT support needs or platform goals..."
                className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-primary/90 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
          {status === "success" && (
            <div
              className="mt-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-600"
              role="status"
              aria-live="polite"
            >
              ✓ Thank you for reaching out! I'll respond shortly.
            </div>
          )}
          {status === "error" && (
            <div
              className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-600"
              role="alert"
              aria-live="assertive"
            >
              ✗ {errorMessage || "Failed to send message. Please try again."}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
