// .env einlesen (muss ganz am Anfang stehen)
const dotenv = require("dotenv");
dotenv.config();

/**
 * Firebase Imports
 */
const { setGlobalOptions } = require("firebase-functions");
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const fetch = require("node-fetch");

// Optionales Logging (du kannst logger entfernen, wenn du willst)
const logger = require("firebase-functions/logger");

// Globale Optionen (Kostenkontrolle etc.)
setGlobalOptions({ maxInstances: 10 });

// n8n Webhook URL aus .env laden
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

exports.onBookReadyForStory = onDocumentUpdated(
  {
    document: "books/{bookId}",
    region: "europe-west3",
  },
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    const bookId = event.params.bookId;

    // Safety checks
    if (!before || !after) return;
    if (before.status === after.status) return;
    if (after.status !== "ready_for_story") return;

    logger.info(`📘 Buch ${bookId} ist bereit für Story-Generierung.`);

    // Status aktualisieren, damit die Funktion nicht mehrfach auslöst
    await event.data.after.ref.update({ status: "story_generating" });

    try {
      // Daten an n8n senden
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, book: after }),
      });

      if (!res.ok) {
        throw new Error(`n8n webhook failed (${res.status})`);
      }

      logger.info("✅ Erfolgreich an n8n gesendet");
    } catch (err) {
      logger.error("❌ Fehler beim Senden an n8n:", err.message);
      await event.data.after.ref.update({
        status: "ready_for_story",
        lastError: err.message,
      });
    }
  }
);
