import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  createdAt: string;
  imageUrl?: string | null;
  index?: number;
}

export function BlogCard({ title, slug, excerpt, createdAt, imageUrl, index = 0 }: BlogCardProps) {
  return (
    <Link to={`/blog/${slug}`}>
      <Card 
        className="group glass-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg animate-slide-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader className={imageUrl ? "pb-3 pt-4" : "pb-3"}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={createdAt}>
              {format(new Date(createdAt), 'MMMM d, yyyy')}
            </time>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold leading-tight transition-colors group-hover:text-primary">
            {title}
          </h2>
          {excerpt && (
            <p className="line-clamp-3 text-muted-foreground">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
