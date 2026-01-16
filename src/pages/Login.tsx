import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (result.error) {
        // Handle specific error cases
        let errorMessage = result.error.message;
        
        // Provide more helpful error messages
        if (result.error.message?.includes('500') || result.error.status === 500) {
          errorMessage = 'Server error. This might be due to email confirmation settings. Please check your Supabase Auth settings or contact support.';
        } else if (result.error.message?.includes('email')) {
          errorMessage = 'Invalid email address or email already in use.';
        } else if (result.error.message?.includes('password')) {
          errorMessage = 'Password must be at least 6 characters.';
        } else if (result.error.message?.includes('signup')) {
          errorMessage = 'Unable to create account. Please check your Supabase configuration.';
        }
        
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        if (isSignUp) {
          // Check if user was created (email confirmation might be disabled)
          // Wait a bit for the auth state to update
          setTimeout(() => {
            if (user) {
              toast({
                title: 'Account created',
                description: 'Redirecting to admin panel...',
              });
              navigate('/admin');
            } else {
              toast({
                title: 'Account created',
                description: 'Please check your email to verify your account before signing in.',
              });
              // Switch to login mode after signup
              setIsSignUp(false);
            }
          }, 500);
        } else {
          toast({
            title: 'Welcome back',
            description: 'Redirecting to admin panel...',
          });
          navigate('/admin');
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center section-padding">
        <Card ref={cardRef} className="w-full max-w-md product-card">
          <CardHeader className="text-center">
            <CardTitle className="heading-lg">Admin {isSignUp ? 'Sign Up' : 'Login'}</CardTitle>
            <CardDescription className="body-md">
              {isSignUp ? 'Create an account to manage your store' : 'Sign in to access the admin panel'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="heading-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="h-12 bg-secondary border-border focus:border-foreground rounded-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="heading-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="h-12 bg-secondary border-border focus:border-foreground rounded-none"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to store
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;

