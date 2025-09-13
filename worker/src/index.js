// Cloudflare Worker: contact form handler using MailChannels

const ALLOWED_ORIGINS = new Set([
  "http://localhost:5173",
  "http://localhost:4173",
  "https://icombe.github.io",
]);

function cors(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://icombe.github.io";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function escapeHtml(s = "") {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendMail(env, { name, email, message }) {
  const to = env.RECEIVER_EMAIL; // set via: wrangler secret put RECEIVER_EMAIL
  if (!to) throw new Error("Missing RECEIVER_EMAIL secret");

  const subject = `Portfolio contact from ${name || "Visitor"}`;
  const text =
    `From: ${name || "Anonymous"} <${email || "no-email"}>\n\n` +
    `${message}\n\n— Sent from icombe.github.io/personal-portfolio`;
  const html =
    `<p><strong>From:</strong> ${escapeHtml(name || "Anonymous")} &lt;${escapeHtml(email || "no-email")}&gt;</p>` +
    `<pre style="white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace;">${escapeHtml(message)}</pre>` +
    `<p>— Sent from icombe.github.io/personal-portfolio</p>`;

  const body = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: "no-reply@workers.dev", name: "Portfolio Contact" },
    ...(email ? { reply_to: { email, name: name || "Visitor" } } : {}),
    subject,
    content: [
      { type: "text/plain", value: text },
      { type: "text/html", value: html },
    ],
  };

  const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errTxt = await res.text().catch(() => "");
    throw new Error(`MailChannels error ${res.status}: ${errTxt.slice(0, 200)}`);
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("origin") || "";
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors(origin) });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: cors(origin) });
    }

    try {
      const data = await request.json().catch(() => ({}));
      const name = (data.name || "").toString().trim();
      const email = (data.email || "").toString().trim();
      const message = (data.message || "").toString().trim();
      const hp = (data.website || "").toString().trim(); // honeypot

      console.log("CONTACT req", { name, email, len: message.length, hp: Boolean(hp) });

      if (hp) return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { ...cors(origin), "content-type": "application/json" } });
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), {
          status: 400,
          headers: { ...cors(origin), "content-type": "application/json" },
        });
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), {
          status: 400,
          headers: { ...cors(origin), "content-type": "application/json" },
        });
      }
      if (message.length > 5000) {
        return new Response(JSON.stringify({ ok: false, error: "Message too long" }), {
          status: 413,
          headers: { ...cors(origin), "content-type": "application/json" },
        });
      }

      await sendMail(env, { name, email, message });
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...cors(origin), "content-type": "application/json" },
      });
    } catch (err) {
      console.error("CONTACT error", err);
      return new Response(JSON.stringify({ ok: false, error: (err && err.message) || "Send failed" }), {
        status: 502,
        headers: { ...cors(origin), "content-type": "application/json" },
      });
    }
  },
};