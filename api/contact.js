export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, units, message } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

  const body = `New CasaFresh assessment request:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nAC Units: ${units || 'Not specified'}\nMessage: ${message || 'No message'}`;

  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { name, email: 'jorgelameiras207@gmail.com' },
      to: [{ email: 'jorgelameiras208@gmail.com', name: 'Jorge' }],
      replyTo: { email, name },
      subject: `CasaFresh: New assessment request from ${name}`,
      textContent: body
    })
  });

  if (r.ok) return res.status(200).json({ success: true });
  return res.status(500).json({ error: 'Failed to send email' });
}
