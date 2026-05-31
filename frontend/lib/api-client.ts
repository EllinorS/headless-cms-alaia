// Base URL for the backend — read from .env.local, falls back to localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Internal function that makes the actual network call
// endpoint = the route to call, e.g. '/contact'
// options = method, body, etc. — empty by default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(API_URL + endpoint, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers as Record<string, string>) },
    credentials: 'include',
  });

  // If the server responds with an error (400, 500...), throw an exception
  if (!response.ok) {
    // Try to read the error message from the server, otherwise use the HTTP status text
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'An error occurred');
  }

  const body = await response.json();
  return (body?.data ?? body) as T;
}

// Exported object with one method per HTTP verb
// Each method calls request() with the right parameters
export const apiClient = {
  get: (endpoint: string) =>
    request(endpoint, { method: 'GET' }),

  post: (endpoint: string, data?: unknown) =>
    // JSON.stringify converts the JS object to text to send in the request body
    request(endpoint, { method: 'POST', body: JSON.stringify(data) }),

  put: (endpoint: string, data: unknown) =>
  request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),

  patch: (endpoint: string, data: unknown) =>
    request(endpoint, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (endpoint: string) =>
    request(endpoint, { method: 'DELETE' }),
};