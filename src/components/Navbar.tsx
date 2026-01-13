import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, LayoutDashboard, PenLine } from 'lucide-react';

export function Navbar() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <PenLine className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-semibold tracking-tight">
            Blog<span className="text-primary">Craft</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {user && isAdmin ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-2"
              >
                <Link to="/admin">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              asChild
            >
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
