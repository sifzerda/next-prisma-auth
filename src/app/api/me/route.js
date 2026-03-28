// src/app/api/me/route.js
import { verifyJWT } from '../../../lib/auth';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = verifyJWT(token);
    return Response.json({ ...payload, userId: payload.userId });
  } catch {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}