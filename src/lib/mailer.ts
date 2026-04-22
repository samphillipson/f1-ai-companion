import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/verify?token=${token}`;

  try {
    const data = await resend.emails.send({
      from: 'F1 AI Companion <onboarding@resend.dev>', // resend.dev is the default test domain provided by Resend
      to: [email],
      subject: 'Verify your email address - F1 AI Companion',
      html: `
        <div>
          <h2>Welcome to F1 AI Companion!</h2>
          <p>Please verify your email address by clicking the link below:</p>
          <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #e10600; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <br /><br />
          <p>Or copy and paste this URL into your browser:</p>
          <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        </div>
      `,
    });

    console.log("Verification email sent:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error };
  }
}
