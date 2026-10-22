// DoriYordam AI proxy — Google Apps Script web app.
// Keeps the Gemini API key in Script Properties (GEMINI_API_KEY), so the public website never contains it.
// Setup: Project Settings → Script properties → add GEMINI_API_KEY; then Deploy → Web app → "Anyone".

const MODEL = "gemini-flash-lite-latest";   // fast, low-cost model; the client cannot change it
const MAX_BODY = 3000000;                   // ~3 MB: enough for one resized photo

function doPost(e) {
  const key = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!key) return reply(503, { error: { message: "AI server is not configured (GEMINI_API_KEY missing)" } });

  const raw = (e && e.postData && e.postData.contents) || "";
  if (raw.length > MAX_BODY) return reply(413, { error: { message: "Request too large" } });

  let p;
  try { p = JSON.parse(raw); } catch (err) { return reply(400, { error: { message: "Invalid JSON" } }); }

  // Forward only the fields the app uses.
  const payload = { contents: p.contents, systemInstruction: p.systemInstruction, generationConfig: p.generationConfig, tools: p.tools };
  const res = UrlFetchApp.fetch("https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent", {
    method: "post",
    contentType: "application/json",
    headers: { "x-goog-api-key": key },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  let body;
  try { body = JSON.parse(res.getContentText()); } catch (err) { body = { error: { message: "Bad upstream response" } }; }
  return reply(res.getResponseCode(), body);
}

function doGet() {
  return reply(200, { ok: true, service: "DoriYordam AI proxy" });
}

// Apps Script cannot set HTTP status codes, so the real status travels inside the JSON.
function reply(status, body) {
  return ContentService.createTextOutput(JSON.stringify({ status: status, body: body })).setMimeType(ContentService.MimeType.JSON);
}
