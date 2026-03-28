// src/app/api/logout/route.js
export async function POST() {
  return Response.json({ message: 'Logged out' });
}