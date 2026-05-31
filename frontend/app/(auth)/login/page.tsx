'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ForgotPasswordSchema, LoginSchema } from '@/lib/types';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const user = await apiClient.post('/auth/login', { email, password });
      sessionStorage.setItem('user', JSON.stringify(user));
      router.push('/admin');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = ForgotPasswordSchema.safeParse({ email: forgotEmail });
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }
    setForgotLoading(true);
    try {
      await apiClient.post('/auth/reset-password-request', { email: forgotEmail });
      setForgotSubmitted(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
     <div className="flex flex-col items-center gap-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to access the ALAIA admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="youremail@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => setForgotOpen(true)}>
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-sm">
        <Link href="/" className="text-primary hover:underline">
          ← Back to website
        </Link>
      </p>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
          </DialogHeader>
          {forgotSubmitted ? (
            <p>If an account exists for that email, a reset link has been sent.</p>
          ) : (
            <form onSubmit={handleForgot} className="space-y-2">
              <Input
                id="forgot-password"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                disabled={forgotLoading}
              />
              <Button type="submit" className="w-full" disabled={forgotLoading}>
                Submit
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
