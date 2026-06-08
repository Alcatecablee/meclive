import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowRight, Search, X, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { NewsletterForm } from "@/components/newsletter-form";

export default function Blog() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogPosts.map((post) => post.category)));
    return ["All", ...uniqueCategories.sort()];
  }, []);

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam, categories]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag));
      const matchesSearch = 
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesTags && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Blog & Insights - Just Clive | Technology, Entrepreneurship & Digital Innovation</title>
        <meta name="description" content="Expert perspectives on technology, entrepreneurship, and digital innovation in South Africa. Learn about K53 driving tests, SARS tax optimization, remote IT support, and more." />
        <meta name="keywords" content="South Africa blog, technology insights, entrepreneurship tips, K53 learner's license, SARS tax refund, remote IT support, QuickBridge, CalmPC, CalmClip" />
        <link rel="canonical" href="https://justc.live/blog" />
        <meta property="og:title" content="Blog & Insights - Just Clive" />
        <meta property="og:description" content="Expert perspectives on technology, entrepreneurship, and digital innovation in South Africa" />
        <meta property="og:url" content="https://justc.live/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_ZA" />
        <meta property="og:site_name" content="Clive Makazhu - Developer & Builder" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog & Insights - Just Clive" />
        <meta name="twitter:description" content="Expert perspectives on technology, entrepreneurship, and digital innovation in South Africa" />
      </Helmet>

      <section className="bg-gradient-to-br from-background via-background to-primary/5 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="space-y-4 text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Blog & Insights
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Expert perspectives on technology, entrepreneurship, and digital innovation in South Africa
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles by title, content, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-background py-4 pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-accent"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-accent text-foreground hover:bg-accent/70"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filter by Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-muted text-muted-foreground border-2 border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-sm text-primary hover:underline"
                >
                  Clear tag filters
                </button>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedTags.length > 0 && ` with tag${selectedTags.length > 1 ? "s" : ""} "${selectedTags.join('", "')}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <Search className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-2xl font-semibold text-foreground">
                No articles found
              </h3>
              <p className="mb-6 max-w-md text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedTags([]);
                }}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
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
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="mb-3 font-display text-xl font-semibold leading-tight text-foreground">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary transition-all group-hover:gap-2">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-b from-background to-primary/5 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-2xl">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
