import { cookies } from 'next/headers';
import { checkPassword, createSessionValue, SESSION_COOKIE } from '@/lib/auth';
import { rateLimit, clientIp, tooManyRequests } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const MAX_PASSWORD_LENGTH = 256;

export async function POST(req) {
  try {
    // 10 login attempts per IP per 15 minutes. Tight enough to stop online
    // brute force, loose enough that a distracted admin can still get in.
    const ip = clientIp(req);
    const rl = rateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000);
    if (!rl.ok) return tooManyRequests(rl, 'Too many attempts. Try again later.');

    const { password } = await req.json();

    if (typeof password !== 'string' || password.length > MAX_PASSWORD_LENGTH) {
      return Response.json({ error: 'Incorrect password' }, { status: 401 });
    }

    if (!checkPassword(password)) {
      return Response.json({ error: 'Incorrect password' }, { status: 401 });
    }
    const { value, maxAge } = await createSessionValue();
    const store = await cookies();
    const isProd = process.env.NODE_ENV === 'production';
    store.set(SESSION_COOKIE, value, {
      httpOnly: true,
      sameSite: 'strict',
      secure: isProd,
      path: '/',
      maxAge,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Bad request' }, { status: 400 });
  }
}
