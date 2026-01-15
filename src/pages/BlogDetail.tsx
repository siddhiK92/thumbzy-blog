import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Post not found');
      return data;
    },
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error || !post ? (
          <div className="mx-auto max-w-2xl py-20 text-center">
            <h1 className="font-serif text-3xl font-bold">Post not found</h1>
            <p className="mt-4 text-muted-foreground">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="mt-8">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        ) : (
          <article className="mx-auto max-w-3xl animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>
            </Button>

            <header className="mb-10 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.created_at}>
                  {format(new Date(post.created_at), 'MMMM d, yyyy')}
                </time>
              </div>
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            <div className="blog-content">
              {post.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </article>
        )}
      </main>

      <footer className="border-t border-border/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ThumbzyBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetail;
