'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { apiClient } from '@/lib/api-client';
import { InviteUserSchema, User } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function UsersPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('COACH');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  async function loadUsers() {
    try {
      setUsers(await apiClient.get('/auth/users'));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load users.');
    }
  }

  useEffect(() => {
    apiClient
      .get('/auth/users')
      .then(setUsers)
      .catch(() => toast.error('Failed to load users.'));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = InviteUserSchema.safeParse({ email, firstName, lastName, role });
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/auth/users/invite', { email, firstName, lastName, role });
      toast.success(`Invitation sent to ${email}.`);
      setEmail('');
      setFirstName('');
      setLastName('');
      setRole('COACH');
      await loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('delete this user?')) return;

    try {
      await apiClient.delete(`/auth/users/${id}`);
      toast.success('User deleted.');
      await loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete user.');
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1">Invite a New User</p>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>
            The user will receive an email to set their password before their first login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="COACH">Coach</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Invitation...
                </>
              ) : (
                'Send Invitation'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-10">
        <CardHeader>
          <CardDescription>Existing users</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No users yet.</p>
          ) : (
            <ul>
              {users.map((u, i) => (
                <li key={u.id}>
                  {i > 0 && <Separator className="my-1" />}
                  <div className="flex items-center justify-between py-2">
                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {u.firstName} {u.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant="secondary">{u.role}</Badge>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
