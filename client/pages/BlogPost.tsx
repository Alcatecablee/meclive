import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect, useMemo } from "react";
import { Calendar, Clock, ArrowLeft, ExternalLink, Share2, List, Eye, Link as LinkIcon, Check } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { calculateReadTime, stripHtmlTags, getViewCount, incrementViewCount, formatViewCount } from "@/lib/blog-utils";
import { Breadcrumb } from "@/components/breadcrumb";

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  
  const headings = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');
    
    return Array.from(headingElements).map((heading, index) => {
      const text = heading.textContent || '';
      const id = heading.id || `heading-${index}`;
      const level = parseInt(heading.tagName.substring(1));
      return { id, text, level };
    });
  }, [content]);

  useEffect(() => {
    const contentDiv = document.querySelector('.prose');
    if (!contentDiv) return;

    const headingElements = contentDiv.querySelectorAll('h2, h3');
    headingElements.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-border bg-card/50 p-6">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
        <List className="h-4 w-4" />
        Table of Contents
      </div>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${heading.level === 3 ? 'ml-4' : ''}`}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={`text-left w-full py-1 transition-colors hover:text-primary ${
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progressPercentage = (scrollTop / trackLength) * 100;
      setProgress(Math.min(progressPercentage, 100));
    };

    calculateProgress();
    window.addEventListener('scroll', calculateProgress);
    window.addEventListener('resize', calculateProgress);

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  );
}

function SocialShareButtons({ post }: { post: { id: string; title: string; excerpt: string } }) {
  const [copied, setCopied] = useState(false);
  const postUrl = `https://justc.live/blog/${post.id}`;
  const shareText = post.title;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + postUrl)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/50 p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Share2 className="h-4 w-4" />
        Share this article
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-[#1DA1F2] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#1a8cd8] hover:shadow-md"
          aria-label="Share on Twitter"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Twitter
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#006399] hover:shadow-md"
          aria-label="Share on LinkedIn"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#20bd5a] hover:shadow-md"
          aria-label="Share on WhatsApp"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-accent hover:shadow-md"
          aria-label={copied ? "Link copied" : "Copy link to clipboard"}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="h-4 w-4" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);
  const [viewCount, setViewCount] = useState(0);
  
  const accurateReadTime = post ? calculateReadTime(stripHtmlTags(post.content)) : '';
  
  const breadcrumbItems = post ? [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
    { label: post.title.length > 50 ? post.title.substring(0, 50) + "..." : post.title }
  ] : [];
  
  const relatedPosts = post 
    ? blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2)
    : [];
  
  if (relatedPosts.length < 2) {
    const otherPosts = blogPosts.filter((p) => p.id !== post?.id && p.category !== post?.category);
    relatedPosts.push(...otherPosts.slice(0, 2 - relatedPosts.length));
  }

  useEffect(() => {
    if (post?.id) {
      const newCount = incrementViewCount(post.id);
      setViewCount(newCount);
    }
  }, [post?.id]);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <h1 className="mb-4 font-display text-3xl font-bold">Post Not Found</h1>
        <Link
          to="/blog"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgressBar />
      <article className="flex flex-col">
        <Helmet>
        <title>{post.title} - Just Clive Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, South Africa, ${post.title.split(' ').slice(0, 5).join(', ')}`} />
        <link rel="canonical" href={`https://justc.live/blog/${post.id}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://justc.live/blog/${post.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://justc.live${post.image}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Clive Makazhu" />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://justc.live${post.image}`} />
        <meta name="twitter:creator" content="@just_clive_sa" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": `https://justc.live${post.image}`,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Person",
              "name": "Clive Makazhu",
              "url": "https://justc.live",
              "sameAs": [
                "https://x.com/just_clive_sa",
                "https://quickbridge.app",
                "https://calmpc.com",
                "https://calmclip.video",
                "https://superk53.co.za"
              ]
            },
            "publisher": {
              "@type": "Person",
              "name": "Clive Makazhu",
              "url": "https://justc.live"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://justc.live/blog/${post.id}`
            }
          })}
        </script>
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-4xl px-6">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {accurateReadTime}
              </span>
              <span className="flex items-center gap-1" title={`This post has been viewed ${viewCount} ${viewCount === 1 ? 'time' : 'times'}`}>
                <Eye className="h-4 w-4" />
                {formatViewCount(viewCount)}
              </span>
            </div>
            
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            <div className="min-w-0">
              <div className="mb-12 overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-auto w-full"
                />
              </div>

              <SocialShareButtons post={post} />

              <div
                className="prose prose-lg mt-12 max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {relatedPosts.length > 0 && (
                <div className="mt-16 border-t border-border pt-16">
                  <h2 className="mb-8 font-display text-2xl font-bold">Related Articles</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.id}`}
                        className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              {relatedPost.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {relatedPost.readTime}
                            </span>
                          </div>
                          <h3 className="mb-2 font-display text-lg font-semibold leading-tight text-foreground">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-10 text-center">
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      View all posts
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <aside className="hidden lg:block">
              <TableOfContents content={post.content} />
            </aside>
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
