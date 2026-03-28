import bcrypt from 'bcrypt';
import { prisma } from '../../../lib/prisma';
import { signJWT } from '../../../lib/auth';

export async function POST(req) {
  try {
    const { email, password, username } = await req.json();

    // Validate input
    if (!email || !password || !username) {
      return Response.json(
        { error: 'Missing fields' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // Create JWT
    const token = signJWT({ userId: user.id });

    return Response.json({ token });
  } catch (err) {
    return Response.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}