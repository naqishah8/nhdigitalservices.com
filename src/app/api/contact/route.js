import nodemailer from 'nodemailer';

// SMTP credentials live in env vars. The form submits through our own mail
// server (Postfix on mail.nhdigitalservices.com:587, SASL-authed as the
// `info` user). Replies go back to whoever filled the form, not to us.
const SMTP_HOST = process.env.SMTP_HOST || 'mail.nhdigitalservices.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || 'info';
const SMTP_PASS = process.env.SMTP_PASS || '';
const CONTACT_TO = process.env.CONTACT_TO || 'info@nhdigitalservices.com';
const CONTACT_FROM = process.env.CONTACT_FROM || 'info@nhdigitalservices.com';

const transporter = SMTP_PASS
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      requireTLS: SMTP_PORT === 587,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req) {
  try {
    const { name, email, service, message, website } = await req.json();

    // Honeypot — bots fill every field, so presence means drop silently.
    if (website) return Response.json({ ok: true });

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (!transporter) {
      console.error('[contact] SMTP_PASS not configured');
      return Response.json(
        { error: 'Mail service not configured' },
        { status: 500 }
      );
    }

    const subject = `New inquiry: ${service || 'General'} — ${name}`;
    const text = [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Service: ${service || '—'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const html = `
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; font-size:14px; line-height:1.6; color:#1f2937;">
        <tr><td style="padding-bottom:12px;"><strong>Name:</strong> ${escapeHtml(name)}</td></tr>
        <tr><td style="padding-bottom:12px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding-bottom:12px;"><strong>Service:</strong> ${escapeHtml(service || '—')}</td></tr>
        <tr><td style="padding-top:8px; border-top:1px solid #e5e7eb;"><strong>Message</strong></td></tr>
        <tr><td style="padding-top:8px; white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: `"NH Digital Services — Website" <${CONTACT_FROM}>`,
      to: CONTACT_TO,
      replyTo: `"${name}" <${email}>`,
      subject,
      text,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return Response.json(
      { error: 'Could not send message' },
      { status: 500 }
    );
  }
}
