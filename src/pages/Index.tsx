import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { BlogCard } from '@/components/BlogCard';
import { Loader2, PenLine } from 'lucide-react';

const Index = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['published-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center animate-fade-in">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <PenLine className="h-4 w-4" />
              Welcome to BlogCraft
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Thoughts, Stories &{' '}
              <span className="gradient-text">Ideas</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore articles on technology, design, and creative thinking.
              A space for learning, sharing, and growing together.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
              <p className="text-destructive">Failed to load posts. Please try again later.</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  createdAt={post.created_at}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto max-w-md space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <PenLine className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="font-serif text-2xl font-semibold">No posts yet</h2>
                <p className="text-muted-foreground">
                  Check back soon for new content. Great things are on the way!
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BlogCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
