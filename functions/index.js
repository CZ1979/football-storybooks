const dotenv = require("dotenv");
dotenv.config();

const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

exports.generateStoryFromBook = onDocumentUpdated(
  {
    document: "books/{bookId}",
    region: "europe-west3",
  },
  async (event) => {
    try {
      const before = event.data?.before.data();
      const after = event.data?.after.data();
      const bookId = event.params.bookId;

      // Safety checks
      if (!before || !after) return;

      // 🚫 Endlosschleife verhindern
      if (after.status === "story_generating" || after.status === "story_ready") {
        logger.info("⏩ Status-Update ignoriert (bereits in Verarbeitung oder abgeschlossen)");
        return;
      }

      // Nur reagieren, wenn sich der Status wirklich auf "ready_for_story" geändert hat
      if (before.status === after.status || after.status !== "ready_for_story") return;

      logger.info(`📘 Buch ${bookId} ist bereit für Story-Generierung.`);

      // Status sofort auf "story_generating" setzen (damit keine zweite Function triggert)
      await event.data.after.ref.update({ status: "story_generating" });

      // ✅ Natives Fetch in Node 20 verwenden (kein node-fetch nötig)
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, book: after }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`n8n webhook failed (${res.status}): ${errText}`);
      }

      logger.info("✅ Erfolgreich an n8n gesendet");
    } catch (err) {
      logger.error("❌ Fehler beim Senden an n8n:", err.message);

      // Zurück auf ready_for_story setzen, aber Schleife vermeiden
      if (event.data?.after) {
        await event.data.after.ref.update({
          status: "error",
          lastError: err.message,
        });
      }
    }
  }
);


// ===== HTTPS-Proxy für n8n → Firestore =====
const admin = require('firebase-admin');
const { onRequest } = require('firebase-functions/v2/https');

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

const N8N_FIREBASE_PROXY_SECRET = process.env.N8N_FIREBASE_PROXY_SECRET;

exports.updateBookFromN8N = onRequest({ region: 'europe-west3' }, async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    // sehr simple Auth: Shared Secret im Header
    const secret = req.get('x-proxy-secret');
    if (!secret || secret !== N8N_FIREBASE_PROXY_SECRET) {
      return res.status(401).send('Unauthorized');
    }

    // 🧩 Body robuster einlesen – egal ob n8n ihn als JSON oder Text sendet
    let body = {};
    try {
      if (typeof req.body === 'object') {
        body = req.body;
      } else if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      } else {
        body = {};
      }
    } catch (err) {
      console.error('❌ Body parse error:', err.message);
      return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
    }

    const { bookId, status, storyText, lastError } = body;
    if (!bookId || !status) {
      return res.status(400).json({ ok: false, error: 'bookId & status required' });
    }

    const update = { status };
    if (typeof storyText === 'string') update.storyText = storyText;
    if (typeof lastError === 'string') update.lastError = lastError;
    if (lastError === null) update.lastError = admin.firestore.FieldValue.delete();

    await db.collection('books').doc(bookId).update(update);

    return res.json({ ok: true });
  } catch (e) {
    console.error('🔥 updateBookFromN8N failed:', e);
    return res.status(500).json({ ok: false, error: e.message });
  }
});