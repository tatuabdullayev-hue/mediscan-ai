// DoriYordam — prototype app logic.
// Data stays on the device (localStorage). Photos and questions go to an online service only when
// the user presses a button: Gemini (only with the user's own API key) or openFDA (public drug labels).

const T = {
  uz: {
    tagline: "Dorilar bo'yicha aqlli yordamchi",
    tabScan: "Skaner", tabCheck: "Moslik", tabChat: "AI yordamchi", tabSet: "Sozlamalar",
    heroEyebrow: "AI + 100 dan ortiq dori bazasi",
    scanTitle: "Dorini suratga oling — qolganini biz aytamiz",
    scanSub: "Qutidagi nomni o'qiymiz va internetdan dorining tarkibi, nima uchun ishlatilishi, qanday ichilishi, nojo'ya ta'sirlari va kimlarga mumkin emasligini topib, tushuntirib beramiz.",
    statDrugs: "ta dori", statRules: "ta xavf qoidasi",
    takePhoto: "Suratga olish yoki rasm yuklash", photoTip: "Nomi aniq ko'rinsin, yorug' joyda suratga oling",
    recognize: "Dorini aniqlash", orType: "yoki nomini yozing", typeName: "Masalan: Aspirin, Citramon, Цитрамон...", find: "Topish",
    group: "Farmakologik guruh", forms: "Tarkibi va shakli", use: "Nima uchun ishlatiladi", how: "Qanday ichiladi",
    side: "Nojo'ya ta'sirlari", contra: "Kimlarga mumkin emas", preg: "Homiladorlik va emizish", kids: "Bolalar", note: "Muhim",
    moreInfo: "Batafsil: mumkin emas, homiladorlik, bolalar",
    rx: "Retsept bilan", otc: "Retseptsiz", abx: "Antibiotik",
    srcDb: "Tekshirilgan baza", srcFda: "AQSh FDA ma'lumoti", srcAi: "AI ma'lumoti",
    sourceDb: "Manba: DoriYordam bazasi (JSST, BNF, FDA yo'riqnomalari asosida). Ma'lumot umumiy — dozani shifokoringiz belgilaydi.",
    sourceFda: "Manba: openFDA — AQSh Oziq-ovqat va dori boshqarmasi rasmiy yo'riqnomasi. O'zbekistondagi shakli farq qilishi mumkin.",
    sourceAi: "Manba: Gemini AI. Bu dori bazamizda yo'q — ma'lumotni dorixonachi yoki shifokor bilan tekshiring.",
    abxWarn: "Bu antibiotik. Faqat shifokor retsepti bilan, kursni oxirigacha iching. O'zboshimchalik bilan ichish antibiotikka chidamlilikni keltirib chiqaradi.",
    fdaEnglish: "Bu ma'lumot internetdan asl tilida (rus yoki ingliz) olindi. O'zbekchaga tarjima qilish uchun Sozlamalarda AI kalitini kiriting.",
    addToList: "Moslikni tekshirishga qo'shish", added: "Ro'yxatga qo'shildi", listen: "Ovozli o'qish",
    ocrLoading: "Surat o'qilmoqda — internetsiz OCR...", aiLoading: "AI dorini aniqlamoqda...",
    fdaLoading: "Bazada yo'q — internetdan (openFDA) qidirilmoqda...", translating: "O'zbekchaga tarjima qilinmoqda...",
    webLoading: "Internetdan qidirilmoqda: Vikipediya va AQSh FDA rasmiy yo'riqnomalari...",
    aiWebLoading: "AI dorini aniqlab, internetdan rasmiy yo'riqnomasini qidirmoqda...",
    about: "Umumiy ma'lumot", sources: "Manbalar", searchOnline: "Internetdan batafsil",
    srcWeb: "Internet manbalari", srcAiWeb: "AI + internet qidiruvi", srcAiRef: "AI + internet manbalari",
    sourceAiRef: "Manba: AI tushuntirishi. Uni quyidagi internet manbalari (Vikipediya, AQSh FDA) orqali tekshirishingiz mumkin. Dori qutisidagi yo'riqnomani ham o'qing.",
    sourceWeb: "Manba: internet (Vikipediya, AQSh FDA yo'riqnomasi). Ma'lumot umumiy — dori qutisidagi yo'riqnomani ham o'qing.",
    sourceAiWeb: "Manba: AI Google qidiruvi orqali rasmiy yo'riqnomalardan to'pladi. Quyidagi havolalar orqali tekshirishingiz mumkin.",
    notFound: "Dori aniqlanmadi. Yorug' joyda, nomini yaqindan va to'g'ri suratga oling yoki nomini qo'lda yozing.",
    ocrRead: "Suratdan o'qilgan matn",
    noMatchTyped: "Bu nom bazada ham, internetda ham topilmadi. Yozilishini tekshiring (lotin yoki kirill) yoki suratdan aniqlang.",
    checkTitle: "Dorilar mosligini tekshirish", checkSub: "Hozir ichayotgan barcha dorilaringizni qo'shing — xavfli birikmalarni darhol ko'rsatamiz.",
    typeShort: "Dori nomi...", add: "Qo'shish", myMeds: "Mening dorilarim", clearAll: "Hammasini tozalash",
    emptyList: "Hali dori qo'shilmagan", emptyHint: "Kamida 2 ta dori qo'shing yoki Skanerda dorini aniqlab, ro'yxatga qo'shing.",
    oneMore: "Tekshirish uchun yana kamida 1 ta dori qo'shing.",
    high: "Xavfli", moderate: "Ehtiyot bo'ling",
    sumHigh: n => `${n} ta xavfli birikma topildi`, sumMod: n => `${n} ta ehtiyot bo'lish kerak bo'lgan birikma`,
    sumHighSub: "Bu dorilarni birga ichishdan oldin shifokoringiz bilan maslahatlashing.",
    sumOk: "Xavfli birikma topilmadi", sumOkSub: "Bazamizdagi ma'lumotlarga ko'ra bu dorilar orasida ma'lum xavfli o'zaro ta'sir yo'q. Shunga qaramay, dorixonachi yoki shifokorga ayting.",
    advice: "Maslahat", already: "Bu dori ro'yxatda bor.", notInDbForCheck: "Bu dori bazada yo'q — mosligini tekshirib bo'lmaydi.",
    chatTitle: "AI tibbiy yordamchi", chatSub: "Kasalligingiz yoki belgilaringiz haqida yozing — oddiy tilda tushuntiraman.",
    chatPlaceholder: "Masalan: menda gastrit bor, nima yeyishim mumkin?",
    chatHello: "Assalomu alaykum! Men **DoriYordam AI** yordamchisiman.\n\nKasalligingiz, belgilaringiz yoki dorilaringiz haqida yozing — nima ekanini, nimalar yordam berishini va qachon shifokorga borish kerakligini oddiy tilda tushuntiraman.\n\nMen shifokor emasman va tashxis qo'ymayman.",
    shareMeds: "Dorilar ro'yxatimni AIga ko'rsatish (aniqroq javob uchun)",
    sugg: ["Menda 2-tur diabet bor, nima yeyishim mumkin?", "Qon bosimim 150/95, bu xavflimi?", "Gastritda nimalardan saqlanish kerak?", "Bolamning isitmasi 38.5, nima qilay?", "Tez-tez boshim og'riydi, sababi nima?"],
    emerg: "**Bu belgilar shoshilinch holat bo'lishi mumkin!** Darhol **103** ga qo'ng'iroq qiling yoki eng yaqin shifoxonaga boring. AI javobini kutmang.",
    emergMental: "**Siz yolg'iz emassiz.** Hozir xavf ostida bo'lsangiz, **103** ga qo'ng'iroq qiling yoki yaqin odamingizga ayting. Psixologik yordam: **1050** ishonch telefoni.",
    needKey: "AI ishlashi uchun **Sozlamalar** bo'limida Gemini API kalitini kiriting. Kalit faqat shu qurilmada saqlanadi.",
    errNet: "Internet aloqasi yo'q. Ulanishni tekshirib, qayta urinib ko'ring.",
    errKey: "API kaliti noto'g'ri yoki ruxsat yo'q. Sozlamalarda tekshiring.", errQuota: "AI so'rovlar limiti tugadi. Birozdan so'ng urinib ko'ring.",
    errModel: "AI model topilmadi. Sozlamalarda model nomini tekshiring.", errGeneric: "AI javob bera olmadi. Qayta urinib ko'ring.",
    setTitle: "Sozlamalar", aiKeyTitle: "AI kaliti (Google Gemini)",
    aiKeySub: "Bepul kalitni aistudio.google.com saytidan olasiz. Kalit faqat shu qurilmada saqlanadi va hech kimga yuborilmaydi (faqat Google'ga so'rov paytida).",
    modelLabel: "Model nomi", save: "Saqlash", saved: "Saqlandi", keyCleared: "Kalit o'chirildi. AI funksiyalari o'chiq.",
    privacyTitle: "Maxfiylik va xavfsizlik", wipe: "Barcha ma'lumotlarimni o'chirish",
    wipeConfirm: "Dorilar ro'yxati, sozlamalar va kalit o'chiriladi. Davom etasizmi?",
    sourcesTitle: "Ma'lumot manbalari",
    sourcesText: "Dori bazasi JSST Asosiy dorilar ro'yxati, Britaniya milliy formulyari (BNF), AQSh FDA yo'riqnomalari va Vidal ma'lumotnomasi asosida umumlashtirildi. Bazada bo'lmagan dorilar openFDA ochiq bazasidan qidiriladi.",
    privacy: [
      "Dorilar ro'yxatingiz faqat shu telefonda saqlanadi — bizda server yo'q.",
      "Ro'yxatdan o'tish, ism yoki telefon raqami talab qilinmaydi.",
      "Surat va savollar faqat siz tugmani bosganingizda yuboriladi.",
      "AI suhbati saqlanmaydi — sahifani yopsangiz o'chadi.",
      "Ilova tashxis qo'ymaydi va dori buyurmaydi. Qarorni shifokor qabul qiladi.",
    ],
    consentTitle: "DoriYordam'ga xush kelibsiz", consentSub: "Boshlashdan oldin ma'lumotlaringiz qanday himoya qilinishi bilan tanishing:",
    consentOk: "Tushundim, davom etish", emergLine: "Shoshilinch yordam: 103",
    disclaimer: "O'quv prototipi (AI in Medicine, 2026). Shifokor maslahatini almashtirmaydi.",
    popular: "Ommabop:",
  },
  en: {
    tagline: "Smart medicine assistant",
    tabScan: "Scan", tabCheck: "Interactions", tabChat: "AI assistant", tabSet: "Settings",
    heroEyebrow: "AI + 100+ medicine database",
    scanTitle: "Snap your medicine — we'll explain the rest",
    scanSub: "We read the name on the box and find its composition, uses, dosing, side effects and contraindications on the internet — explained in simple words.",
    statDrugs: "medicines", statRules: "safety rules",
    takePhoto: "Take a photo or upload an image", photoTip: "Make the name clearly visible and use good light",
    recognize: "Identify medicine", orType: "or type its name", typeName: "e.g. Aspirin, Citramon, Panadol...", find: "Find",
    group: "Drug class", forms: "Composition and form", use: "What it is used for", how: "How to take it",
    side: "Side effects", contra: "Who should not take it", preg: "Pregnancy and breastfeeding", kids: "Children", note: "Important",
    moreInfo: "More: contraindications, pregnancy, children",
    rx: "Prescription", otc: "Over the counter", abx: "Antibiotic",
    srcDb: "Verified database", srcFda: "US FDA label", srcAi: "AI information",
    sourceDb: "Source: DoriYordam database (based on WHO, BNF and FDA labels). General information — your doctor sets the dose.",
    sourceFda: "Source: openFDA — official US Food and Drug Administration label. Products in Uzbekistan may differ.",
    sourceAi: "Source: Gemini AI. This medicine is not in our database — verify with a pharmacist or doctor.",
    abxWarn: "This is an antibiotic. Take it only with a prescription and finish the course. Self-medication causes antibiotic resistance.",
    fdaEnglish: "",
    addToList: "Add to interaction check", added: "Added to list", listen: "Read aloud",
    ocrLoading: "Reading the photo — offline OCR...", aiLoading: "AI is identifying the medicine...",
    fdaLoading: "Not in our database — searching online (openFDA)...", translating: "Summarising...",
    webLoading: "Searching the internet: Wikipedia and official US FDA labels...",
    aiWebLoading: "AI is identifying the medicine and searching the web for its official leaflet...",
    about: "Overview", sources: "Sources", searchOnline: "More from the internet",
    srcWeb: "Internet sources", srcAiWeb: "AI + web search", srcAiRef: "AI + internet sources",
    sourceAiRef: "Source: AI explanation. You can verify it with the internet sources above (Wikipedia, US FDA). Also read the leaflet in the box.",
    sourceWeb: "Source: internet (Wikipedia, US FDA label). General information — also read the leaflet in the box.",
    sourceAiWeb: "Source: collected by AI from official leaflets via Google Search. You can verify using the links above.",
    notFound: "Medicine not recognised. Use good light, photograph the name up close and straight, or type the name.",
    ocrRead: "Text read from photo",
    noMatchTyped: "This name was not found in our database or online. Check the spelling or identify it from a photo.",
    checkTitle: "Check medicine interactions", checkSub: "Add every medicine you take now — we instantly flag dangerous combinations.",
    typeShort: "Medicine name...", add: "Add", myMeds: "My medicines", clearAll: "Clear all",
    emptyList: "No medicines yet", emptyHint: "Add at least 2 medicines, or identify one in Scan and add it here.",
    oneMore: "Add at least 1 more medicine to check.",
    high: "Dangerous", moderate: "Use caution",
    sumHigh: n => `${n} dangerous combination${n > 1 ? "s" : ""} found`, sumMod: n => `${n} combination${n > 1 ? "s" : ""} needing caution`,
    sumHighSub: "Talk to your doctor before taking these medicines together.",
    sumOk: "No dangerous combinations found", sumOkSub: "According to our database there are no known dangerous interactions between these medicines. Still, tell your pharmacist or doctor.",
    advice: "Advice", already: "This medicine is already in the list.", notInDbForCheck: "This medicine is not in our database — interactions cannot be checked.",
    chatTitle: "AI health assistant", chatSub: "Describe your condition or symptoms — I'll explain in simple words.",
    chatPlaceholder: "e.g. I have gastritis, what can I eat?",
    chatHello: "Hello! I'm the **DoriYordam AI** assistant.\n\nTell me about your condition, symptoms or medicines — I'll explain what it is, what helps and when to see a doctor, in simple words.\n\nI am not a doctor and I do not diagnose.",
    shareMeds: "Share my medicine list with the AI (for better answers)",
    sugg: ["I have type 2 diabetes, what can I eat?", "My blood pressure is 150/95, is it dangerous?", "What should I avoid with gastritis?", "My child has a fever of 38.5, what should I do?", "I often get headaches — why?"],
    emerg: "**These symptoms may be an emergency!** Call **103** now or go to the nearest hospital. Do not wait for the AI.",
    emergMental: "**You are not alone.** If you are in danger right now, call **103** or tell someone close to you. Psychological help line: **1050**.",
    needKey: "To use the AI, enter a Gemini API key in **Settings**. The key is stored only on this device.",
    errNet: "No internet connection. Check your connection and try again.",
    errKey: "The API key is invalid or not allowed. Check it in Settings.", errQuota: "AI request limit reached. Try again later.",
    errModel: "AI model not found. Check the model name in Settings.", errGeneric: "The AI could not answer. Please try again.",
    setTitle: "Settings", aiKeyTitle: "AI key (Google Gemini)",
    aiKeySub: "Get a free key at aistudio.google.com. The key is stored only on this device and sent only to Google with your requests.",
    modelLabel: "Model name", save: "Save", saved: "Saved", keyCleared: "Key removed. AI features are off.",
    privacyTitle: "Privacy and security", wipe: "Delete all my data",
    wipeConfirm: "Your medicine list, settings and key will be deleted. Continue?",
    sourcesTitle: "Information sources",
    sourcesText: "The medicine database was compiled from the WHO Model List of Essential Medicines, the British National Formulary (BNF), US FDA labels and the Vidal reference. Medicines not in the database are searched in the open openFDA database.",
    privacy: [
      "Your medicine list is stored only on this phone — we have no server.",
      "No sign-up, name or phone number is required.",
      "Photos and questions are sent only when you press a button.",
      "The AI chat is not saved — it disappears when you close the page.",
      "The app does not diagnose or prescribe. Decisions are made by a doctor.",
    ],
    consentTitle: "Welcome to DoriYordam", consentSub: "Before you start, here is how your data is protected:",
    consentOk: "I understand, continue", emergLine: "Emergency: 103",
    disclaimer: "Student prototype (AI in Medicine, 2026). Does not replace medical advice.",
    popular: "Popular:",
  },
};

// ---------- helpers ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem("dy_" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("dy_" + k, JSON.stringify(v)); } catch {} },
  wipe() { try { Object.keys(localStorage).filter(k => k.startsWith("dy_")).forEach(k => localStorage.removeItem(k)); } catch {} },
};
let lang = store.get("lang", "en");
let myMeds = store.get("meds", []);   // drug ids (strings) or full objects for online/AI drugs
let chatHistory = [];                  // memory only
const t = (k, ...a) => { const v = T[lang][k]; return typeof v === "function" ? v(...a) : v; };
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ic = (name, cls = "") => `<svg class="ic ${cls}"><use href="#i-${name}"/></svg>`;

function md(s) {
  const lines = esc(s).split(/\n/);
  let html = "", inList = false;
  for (let line of lines) {
    line = line.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|\s)\*(\S.*?\S)\*(?=\s|$)/g, "$1<i>$2</i>");
    const li = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)/);
    if (li) { if (!inList) { html += "<ul>"; inList = true; } html += `<li>${li[1]}</li>`; continue; }
    if (inList) { html += "</ul>"; inList = false; }
    if (line.replace(/^#+\s*/, "").trim()) html += `<p>${line.replace(/^#+\s*/, "")}</p>`;
  }
  return html + (inList ? "</ul>" : "");
}

// ---------- i18n ----------
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach(el => el.textContent = t(el.dataset.t));
  document.querySelectorAll("[data-tp]").forEach(el => el.placeholder = t(el.dataset.tp));
  document.querySelectorAll(".seg button").forEach(b => b.classList.toggle("on", b.dataset.lang === lang));
  const pl = T[lang].privacy.map(p => `<li>${ic("check")}<span>${esc(p)}</span></li>`).join("");
  $("#privacyList").innerHTML = pl; $("#consentList").innerHTML = pl;
  $("#suggest").innerHTML = T[lang].sugg.map(s => `<button type="button">${ic("sparkles")}${esc(s)}</button>`).join("");
  const quick = ["aspirin", "paracetamol", "citramon", "analgin", "ceftriaxone", "amoxiclav", "enalapril", "metformin"];
  $("#quickChips").innerHTML = `<span class="muted small" style="align-self:center">${t("popular")}</span>` +
    quick.map(id => DRUGS.find(d => d.id === id)).filter(Boolean).map(d => `<button type="button" data-id="${d.id}">${esc(d.names[0])}</button>`).join("");
  renderList(); renderChat();
  if (current) renderDrug(current);
}

// ---------- navigation ----------
function showView(name) {
  document.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x.dataset.view === name));
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + name));
  window.scrollTo({ top: 0 });
}
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => showView(b.dataset.view)));
document.querySelectorAll(".seg button").forEach(b => b.onclick = () => { lang = b.dataset.lang; store.set("lang", lang); applyLang(); });
$("#btnFont").onclick = () => {
  const on = document.body.classList.toggle("big");
  $("#btnFont").setAttribute("aria-pressed", on); store.set("big", on);
};
if (store.get("big", false)) { document.body.classList.add("big"); $("#btnFont").setAttribute("aria-pressed", "true"); }

// ---------- autocomplete ----------
function autocomplete(input, list, onPick) {
  let items = [], idx = -1;
  const close = () => { list.hidden = true; idx = -1; };
  input.addEventListener("input", () => {
    items = searchDrugs(input.value);
    if (!items.length) return close();
    list.innerHTML = items.map((x, i) => `<li role="option" data-i="${i}">${ic("pill")}<span>${esc(x.label)}</span><small>${esc(x.d[lang].group.split("(")[0])}</small></li>`).join("");
    list.hidden = false; idx = -1;
  });
  input.addEventListener("keydown", e => {
    if (list.hidden) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); idx = (idx + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      list.querySelectorAll("li").forEach((li, i) => li.classList.toggle("on", i === idx));
    } else if (e.key === "Enter" && idx >= 0) { e.preventDefault(); e.stopImmediatePropagation(); pick(idx); }
    else if (e.key === "Escape") close();
  });
  list.addEventListener("mousedown", e => { const li = e.target.closest("li"); if (li) { e.preventDefault(); pick(+li.dataset.i); } });
  input.addEventListener("blur", () => setTimeout(close, 120));
  function pick(i) { const x = items[i]; input.value = x.label; close(); onPick(x.d); }
}

// ---------- Gemini API ----------
// Default to the fast "lite" model: answers in ~2 s instead of 30–60 s with the larger thinking models.
function aiConfig() { return { key: store.get("key", ""), model: store.get("model", "") || "gemini-flash-lite-latest" }; }
let searchToolOff = false;   // set when the key's plan does not allow Google Search grounding (free tier)

// search: true lets Gemini use Google Search and returns { text, sources } instead of text.
async function gemini(contents, { system, json, search } = {}) {
  const { key, model } = aiConfig();
  if (!key) throw new Error("nokey");
  const body = { contents, generationConfig: { temperature: 0.3 } };
  if (system) body.systemInstruction = { parts: [{ text: system }] };
  if (json && !search) body.generationConfig.responseMimeType = "application/json";
  if (search) body.tools = [{ google_search: {} }];
  let res;
  try {
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key }, body: JSON.stringify(body),
    });
  } catch { throw new Error("net"); }
  if (res.status === 429) throw new Error("quota");
  if (res.status === 404) throw new Error("model");
  if ([400, 401, 403].includes(res.status)) {
    const txt = await res.text();
    throw new Error(/API key|API_KEY|PERMISSION/i.test(txt) ? "key" : "generic");
  }
  if (!res.ok) throw new Error("generic");
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "";
  if (!text) throw new Error("generic");
  if (!search) return text;
  const chunks = data.candidates[0].groundingMetadata?.groundingChunks || [];
  const sources = chunks.map(c => c.web).filter(Boolean).map(w => ({ title: w.title || w.uri, url: w.uri }));
  return { text, sources };
}
const aiErr = e => ({ nokey: t("needKey"), net: t("errNet"), key: t("errKey"), quota: t("errQuota"), model: t("errModel") }[e.message] || t("errGeneric"));
const parseJson = s => {
  s = s.replace(/^\s*```(?:json)?/i, "").replace(/```\s*$/, "").trim();
  const a = s.indexOf("{"), b = s.lastIndexOf("}");
  return JSON.parse(a >= 0 && b > a ? s.slice(a, b + 1) : s);
};

// ---------- openFDA (public US drug labels) ----------
const FDA_FIELDS = {
  use: ["indications_and_usage", "purpose"], how: ["dosage_and_administration", "directions"],
  side: ["adverse_reactions", "warnings", "stop_use"], contra: ["contraindications", "do_not_use"],
  preg: ["pregnancy", "pregnancy_or_breast_feeding"], kids: ["pediatric_use"],
};
function cleanFda(s) {
  // Drop the upper-case section heading ("1 INDICATIONS AND USAGE"), cross-references and table pointers.
  const words = String(s || "").replace(/\s+/g, " ").trim().split(" ");
  let i = 0;
  while (i < words.length && /^[A-Z0-9&/,().:•-]+$/.test(words[i])) i++;
  if (i === words.length) i = 0;
  s = words.slice(i).join(" ").replace(/\[see[^\]]*\]/gi, ",").replace(/,(\s*,)+/g, ",").replace(/\(\s*[\d.,\s]+\)/g, "").replace(/\s+([.,;])/g, "$1");
  s = s.split(/(?<=\.)\s+(?=[A-Z])/).filter(x => !/prescribing information|Table \d|^\d+(\.\d+)+\s/i.test(x)).join(" ").trim();
  if (s.length <= 420) return s;
  const cut = s.slice(0, 420), dot = cut.lastIndexOf(". ");
  return (dot > 150 ? cut.slice(0, dot + 1) : cut + "…");
}
async function fdaLookup(name) {
  const q = name.trim().replace(/"/g, "");
  if (!/^[a-z0-9 .+-]{3,}$/i.test(q)) return null;
  const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(q)}"+openfda.brand_name:"${encodeURIComponent(q)}"&limit=1`;
  let res;
  try { res = await fetch(url); } catch { throw new Error("net"); }
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const r = (await res.json())?.results?.[0];
  if (!r) return null;
  const pick = keys => cleanFda(keys.map(k => r[k]?.[0]).find(Boolean));
  const o = r.openfda || {};
  const generic = (o.generic_name?.[0] || q).toLowerCase();
  const info = Object.fromEntries(Object.entries(FDA_FIELDS).map(([f, keys]) => [f, pick(keys)]));
  info.group = o.pharm_class_epc?.[0]?.replace(/\s*\[EPC\]/, "") || "";
  info.forms = cleanFda(r.active_ingredient?.[0] || o.substance_name?.join(", ") || "") || (o.dosage_form?.[0] || "");
  info.note = "";
  const title = s => s.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase());
  return { id: "fda:" + normName(generic), names: [title(o.brand_name?.[0] || name), generic], ingr: generic.split(/,| and /).map(s => s.trim()),
    rx: (o.product_type?.[0] || "").includes("PRESCRIPTION"), abx: /antibacterial|antibiotic/i.test(info.group), src: "fda", en: info, uz: { ...info } };
}
async function translateDrug(d) {
  // Summarise English FDA text into simple Uzbek with Gemini (only if the user has a key).
  const prompt = `Translate and simplify this medicine information into Uzbek (Latin script) for an elderly patient.
Keep each field 1–2 short sentences, keep medical facts accurate, do not add doses that are not in the text.
Return ONLY JSON with the same keys: group, forms, use, how, side, contra, preg, kids, about.
${JSON.stringify(d.en)}`;
  const out = parseJson(await gemini([{ role: "user", parts: [{ text: prompt }] }], { json: true }));
  d.uz = { ...d.en, ...out, note: "" };
  d.translated = true;
  return d;
}

// ---------- 1. SCAN ----------
let photoFile = null, current = null;

function setStatus(msg, kind) {
  const el = $("#scanStatus");
  el.className = "status" + (kind === "error" ? " error" : kind === "busy" || kind === "info" ? " info" : "");
  if (!msg) { el.innerHTML = ""; return; }
  const icon = kind === "busy" ? '<span class="spinner"></span>' : kind === "error" ? ic("alert") : ic("info");
  el.innerHTML = icon + `<div>${md(msg)}</div>`;
}

function setPhoto(file) {
  photoFile = file || null;
  const img = $("#photoPreview");
  if (photoFile) { img.src = URL.createObjectURL(photoFile); }
  img.hidden = !photoFile; $("#dropHint").hidden = !!photoFile; $("#btnClearPhoto").hidden = !photoFile;
  $("#btnRecognize").disabled = !photoFile;
  setStatus("");
}
$("#photoInput").addEventListener("change", e => { setPhoto(e.target.files[0]); });
$("#btnClearPhoto").addEventListener("click", e => { e.preventDefault(); $("#photoInput").value = ""; setPhoto(null); });
const dz = $("#dropzone");
["dragenter", "dragover"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add("drag"); }));
["dragleave", "drop"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove("drag"); }));
dz.addEventListener("drop", e => { const f = e.dataTransfer.files[0]; if (f && f.type.startsWith("image/")) setPhoto(f); });

async function fileToBase64Jpeg(file, max = 1280) {
  const img = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.85).split(",")[1];
}

$("#btnRecognize").onclick = async () => {
  if (!photoFile) return;
  const btn = $("#btnRecognize"); btn.disabled = true; $("#drugResult").innerHTML = "";
  try { if (aiConfig().key) await recognizeWithAI(); else await recognizeWithOCR(); }
  finally { btn.disabled = false; }
};

// ---------- Internet search with AI (Gemini + Google Search) ----------
// One request: Gemini reads the photo (or the typed name), searches the web for the official leaflet
// and returns the facts in both languages together with the web pages it used.
const AI_WEB_PROMPT = `Use Google Search to find the official information (patient leaflet / instructions for use) for this medicine
as sold in Uzbekistan or CIS countries. Prefer official sources: manufacturer leaflet, Vidal, Drugs.com, FDA/DailyMed, EMA, WHO.
Return ONLY one JSON object, no markdown:
{"found": true, "name": "brand name as printed", "generic": "international generic name(s) in English, lowercase, comma separated",
 "strength": "e.g. 500 mg", "rx": boolean, "antibiotic": boolean,
 "uz": {"group":"", "forms":"", "use":"", "how":"", "side":"", "contra":"", "preg":"", "kids":"", "note":""},
 "en": {"group":"", "forms":"", "use":"", "how":"", "side":"", "contra":"", "preg":"", "kids":"", "note":""}}
"forms" = composition: active ingredient(s) with amounts and the available forms. "uz" must be in Uzbek (Latin script), "en" in English.
Use simple words for patients, 1–3 sentences per field, only facts from the sources. "how" = usual adult dosing from the leaflet plus "as prescribed by your doctor".
If it is not a medicine or you cannot find reliable information, return {"found": false}.`;

async function aiWebLookup({ image, name, generic }) {
  const parts = [{ text: AI_WEB_PROMPT + (name ? `\nMedicine: "${name}"${generic ? ` (active ingredient: ${generic})` : ""}` : "\nThe medicine is shown in the photo (labels may be in Latin, Cyrillic Russian or Uzbek).") }];
  if (image) parts.push({ inline_data: { mime_type: "image/jpeg", data: image } });
  let res = null, src = "aiweb";
  if (!searchToolOff) {
    try { res = await gemini([{ role: "user", parts }], { search: true }); }
    catch (e) {
      // Free plans have no Google Search quota (429) and some models lack the tool (400): continue without it.
      if (e.message !== "generic" && e.message !== "quota") throw e;
      searchToolOff = true;
    }
  }
  if (!res) { res = { text: await gemini([{ role: "user", parts }], { json: true }), sources: [] }; src = "ai"; }
  const j = parseJson(res.text);
  if (!j || !j.found) return null;
  const pack = o => Object.fromEntries(FIELDS.map(f => [f, (o && o[f]) || ""]));
  const ingr = (j.generic || j.name || "").toLowerCase().split(/[,+]| and /).map(s => s.trim()).filter(Boolean);
  const seen = new Set();
  let sources = res.sources.filter(s => !seen.has(s.url) && seen.add(s.url)).slice(0, 5);
  if (!sources.length && (j.generic || j.name)) {
    // No web search on this plan: attach free reference pages (Wikipedia, FDA label) so the user can verify.
    setStatus(t("webLoading"), "busy");
    const ref = await webLookup((j.generic || j.name).split(",")[0].trim()).catch(() => null);
    if (ref?.sources?.length) { sources = ref.sources; src = "airef"; }
  }
  return { d: { id: "ai:" + normName(j.name || j.generic), names: [j.name || j.generic, j.generic].filter(Boolean), ingr,
    rx: !!j.rx, abx: !!j.antibiotic, src, uz: pack(j.uz), en: pack(j.en), sources, translated: true }, strength: j.strength };
}

async function recognizeWithAI() {
  setStatus(t("aiWebLoading"), "busy");
  try {
    const r = await aiWebLookup({ image: await fileToBase64Jpeg(photoFile) });
    if (!r) { setStatus(t("notFound"), "error"); return; }
    setStatus(""); showDrug(r.d, r.strength);
  } catch (e) {
    setStatus(aiErr(e), "error");
    await new Promise(r => setTimeout(r, 1400));
    return recognizeWithOCR();   // fallback: on-device OCR + free internet sources
  }
}

// ---------- Internet search without AI (Wikipedia + openFDA) ----------
const DRUG_WORD = /(лекарств|препарат|антибиот|анальгет|противо|средство|drug|medication|medicine|antibiotic|analges|inhibitor|agonist|antagonist|blocker|dori|vosita|preparat)/i;
const WIKI_API = l => `https://${l}.wikipedia.org/w/api.php?format=json&origin=*&`;

async function wikiSummary(l, title) {
  const r = await fetch(`https://${l}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`);
  if (!r.ok) return null;
  const j = await r.json();
  if (!j.extract || j.type === "disambiguation") return null;
  return { lang: l, title: j.title, extract: j.extract.length > 650 ? j.extract.slice(0, j.extract.lastIndexOf(".", 650) + 1) : j.extract,
    desc: j.description || "", url: j.content_urls?.desktop?.page };
}
async function wikiFind(q) {
  const langs = /[а-яё]/i.test(q) ? ["ru", "uz", "en"] : ["en", "uz", "ru"];
  for (const l of langs) {
    const r = await fetch(WIKI_API(l) + `action=query&list=search&srlimit=3&srsearch=${encodeURIComponent(q)}`);
    if (!r.ok) continue;
    for (const hit of ((await r.json()).query?.search || []).slice(0, 2)) {
      const s = await wikiSummary(l, hit.title);
      if (s && DRUG_WORD.test(s.extract + " " + s.desc)) return s;
    }
  }
  return null;
}
async function wikiIn(page, target) {
  if (page.lang === target) return page;
  const r = await fetch(WIKI_API(page.lang) + `action=query&prop=langlinks&redirects=1&lllang=${target}&titles=${encodeURIComponent(page.title)}`);
  if (!r.ok) return null;
  const pages = Object.values((await r.json()).query?.pages || {});
  const title = pages[0]?.langlinks?.[0]?.["*"];
  return title ? wikiSummary(target, title) : null;
}

// Article sections → card fields ("Medical uses" → use, "Побочные эффекты" → side, ...).
const WIKI_SECTIONS = {
  use: /^(medical uses?|uses|indications|применение|медицинское применение|показания|qo.?llanilishi)/i,
  how: /^(dosage|administration|dosing|способ применения|дозировк|режим дозирования)/i,
  side: /^(adverse effects|side effects|побочн|nojo.?ya)/i,
  contra: /^(contraindications|противопоказания)/i,
  preg: /^(pregnancy|беременн)/i,
  kids: /^(children|pediatric|применение у детей)/i,
  forms: /^(available forms|dosage forms|formulations|форм[аы] выпуска|состав)/i,
};
async function wikiSections(page) {
  if (!page) return {};
  const r = await fetch(WIKI_API(page.lang) + `action=query&prop=extracts&explaintext=1&redirects=1&titles=${encodeURIComponent(page.title)}`);
  if (!r.ok) return {};
  const text = Object.values((await r.json()).query?.pages || {})[0]?.extract || "";
  const parts = text.split(/\n={2,}\s*(.+?)\s*={2,}\n/), out = {};
  for (let i = 1; i < parts.length; i += 2) {
    const field = Object.keys(WIKI_SECTIONS).find(f => WIKI_SECTIONS[f].test(parts[i]));
    const body = (parts[i + 1] || "").replace(/\s+/g, " ").trim();
    if (!field || out[field] || body.length < 40) continue;
    out[field] = body.length > 450 ? body.slice(0, body.lastIndexOf(".", 450) + 1 || 450) : body;
  }
  return out;
}
const filled = o => Object.fromEntries(Object.entries(o || {}).filter(([, v]) => v));

const STOP = new Set(("таблетки таблетка покрытые пленочной плёночной оболочкой капсулы капсула раствор инъекций применения инструкция внутрь " +
  "препарат лекарственный хранить рецепту отпускается производитель упаковка содержит вспомогательные вещества " +
  "tablets tablet capsules capsule coated solution injection contains pharmaceutical pharma limited industries " +
  "tabletka tabletkalar kapsula ichish uchun saqlash qobiq bilan qoplangan").split(" "));
function ocrCandidates(text) {
  const words = (text.match(/[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё-]{4,}/g) || []).map(w => w.replace(/-+$/, ""));
  const uniq = [...new Set(words.map(w => w.toLowerCase()))].filter(w => !STOP.has(w));
  return uniq.sort((a, b) => b.length - a.length).slice(0, 4);
}

async function webLookup(q) {
  // 1) Wikipedia understands brand names in Russian/Uzbek/English and redirects them to the active ingredient.
  const wiki = await wikiFind(q).catch(() => null);
  const enPage = wiki ? await wikiIn(wiki, "en").catch(() => null) : null;
  const enName = (enPage?.title || (/^[a-z0-9 .-]+$/i.test(q) ? q : "")).toLowerCase();
  // 2) openFDA gives the official label: composition, indications, dosing, side effects, contraindications.
  let fda = null;
  try { fda = enName ? await fdaLookup(enName) : null; if (!fda && enName !== q.toLowerCase()) fda = await fdaLookup(q); } catch {}
  if (!wiki && !fda) return null;
  const uzPage = lang === "uz" && wiki ? await wikiIn(wiki, "uz").catch(() => null) : null;
  const title = s => s.charAt(0).toUpperCase() + s.slice(1);
  const d = fda || { names: [], ingr: [enName || normName(wiki.title)], rx: false, abx: false, en: {}, uz: {} };
  d.id = "web:" + normName(enName || wiki.title);
  d.names = [title(q), ...(d.names || [])].filter((n, i, a) => a.findIndex(x => normName(x) === normName(n)) === i);
  d.src = "web";
  d.rxKnown = !!fda;   // prescription status is only known from the FDA label
  d.abx = d.abx || /антибиот|antibiot|antibacter/i.test(wiki?.extract || "");
  // Official FDA label first, Wikipedia article sections fill the gaps (drugs not sold in the USA).
  const enSec = await wikiSections(enPage).catch(() => ({}));
  d.en = { ...Object.fromEntries(FIELDS.map(f => [f, ""])), ...enSec, ...filled(fda?.en), about: enPage?.extract || (wiki?.lang !== "uz" ? wiki?.extract : "") || "" };
  // Uzbek view: Uzbek article if there is one, otherwise the Russian article (widely understood), otherwise English.
  const ruPage = lang === "uz" && !uzPage && wiki ? (wiki.lang === "ru" ? wiki : await wikiIn(wiki, "ru").catch(() => null)) : null;
  const locSec = await wikiSections(uzPage || ruPage).catch(() => ({}));
  d.uz = { ...d.en, ...filled(locSec), about: uzPage?.extract || ruPage?.extract || wiki?.extract || d.en.about };  d.sources = [wiki, enPage, uzPage, ruPage].filter(Boolean).map(p => ({ title: `Wikipedia (${p.lang.toUpperCase()}): ${p.title}`, url: p.url }));
  if (fda) d.sources.push({ title: `U.S. FDA label (DailyMed): ${fda.names[1] || fda.names[0]}`, url: `https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=${encodeURIComponent(fda.names[1] || enName)}` });
  d.sources = d.sources.filter((s, i, a) => s.url && a.findIndex(x => x.url === s.url) === i);
  if (fda && aiConfig().key) { try { setStatus(t("translating"), "busy"); await translateDrug(d); if (uzPage) d.uz.about = uzPage.extract; } catch {} }
  return d;
}

// Online search for a typed/recognised name: AI + Google when a key is saved, otherwise Wikipedia + openFDA.
async function searchOnline(name, generic, { noAI } = {}) {
  if (aiConfig().key && !noAI) {
    setStatus(t("aiWebLoading"), "busy");
    try { const r = await aiWebLookup({ name, generic }); if (r) { setStatus(""); showDrug(r.d, r.strength); return true; } }
    catch (e) { if (e.message === "net") { setStatus(t("errNet"), "error"); return false; } }
  }
  setStatus(t("webLoading"), "busy");
  let d = null;
  try { d = await webLookup(name) || (generic && generic !== name ? await webLookup(generic) : null); }
  catch { setStatus(t("errNet"), "error"); return false; }
  if (!d) return false;
  setStatus(""); showDrug(d);
  return true;
}

let ocrWorker = null;
async function recognizeWithOCR() {
  setStatus(t("ocrLoading"), "busy");
  try {
    if (!window.Tesseract) throw new Error("net");
    if (!ocrWorker) ocrWorker = await Tesseract.createWorker(["eng", "rus"]);
    const { data } = await ocrWorker.recognize(photoFile);
    const text = (data.text || "").replace(/\s+/g, " ").trim();
    const d = findDrugByText(text, { fuzzy: false });
    if (d) { setStatus(""); return showDrug(d); }
    // Not in the offline database: look the printed words up on the internet,
    // and only then accept an approximate offline match (OCR may misread letters).
    for (const word of ocrCandidates(text)) if (await searchOnline(word, null, { noAI: true })) return;
    const near = findDrugByText(text);
    if (near) { setStatus(""); return showDrug(near); }
    setStatus(t("notFound") + (text ? `\n\n${t("ocrRead")}: "${text.slice(0, 120)}"` : ""), "error");
  } catch (e) {
    setStatus(e.message === "net" ? t("errNet") : t("notFound"), "error");
  }
}

async function manualFind(v) {
  v = (v ?? $("#manualName").value).trim();
  if (!v) return;
  $("#manualSuggest").hidden = true;
  const d = findDrugByText(v);
  if (d) { setStatus(""); return showDrug(d); }
  $("#drugResult").innerHTML = "";
  if (!(await searchOnline(v))) setStatus(t("noMatchTyped"), "error");
}
$("#btnManual").onclick = () => manualFind();
$("#manualName").addEventListener("keydown", e => { if (e.key === "Enter") manualFind(); });
autocomplete($("#manualName"), $("#manualSuggest"), d => { setStatus(""); showDrug(d); });
$("#quickChips").addEventListener("click", e => {
  const b = e.target.closest("button[data-id]"); if (!b) return;
  const d = DRUGS.find(x => x.id === b.dataset.id); $("#manualName").value = d.names[0]; setStatus(""); showDrug(d);
});

const label = d => d.names[0];
const info = d => (lang === "uz" ? d.uz : d.en) || d.uz;
const ingrText = d => d.ingr.map(i => INGR_NAMES[i] || i.replace(/\b\w/g, c => c.toUpperCase())).join(" + ");
const inList = d => myMeds.some(m => (m.id || m) === d.id);

function showDrug(d, strength) {
  current = { d, strength };
  renderDrug(current);
  $("#drugResult").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderDrug({ d, strength }) {
  const x = info(d), src = d.src || "db";
  const showUzWarning = (src === "fda" || src === "web") && lang === "uz" && !d.translated && (x.use || x.side);
  const fact = (key, icon, cls) => x[key] ? `<div class="fact ${cls || key}"><span class="fact-ic">${ic(icon)}</span><div><h4>${t(key)}</h4><p>${esc(x[key])}</p></div></div>` : "";
  const srcTag = {
    db: `<span class="tag db">${ic("check-sm")}${t("srcDb")}</span>`,
    fda: `<span class="tag fda">${ic("globe")}${t("srcFda")}</span>`,
    web: `<span class="tag fda">${ic("globe")}${t("srcWeb")}</span>`,
    aiweb: `<span class="tag ai">${ic("globe")}${t("srcAiWeb")}</span>`,
    airef: `<span class="tag ai">${ic("sparkles")}${t("srcAiRef")}</span>`,
    ai: `<span class="tag ai">${ic("sparkles")}${t("srcAi")}</span>`,
  }[src];
  const sources = (d.sources || []).length ? `<div class="sources"><h4>${ic("link", "sm")}${t("sources")}</h4><ol>${d.sources.map(s =>
    `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a></li>`).join("")}</ol></div>` : "";
  const extra = fact("contra", "ban") + fact("preg", "heart") + fact("kids", "baby");
  $("#drugResult").innerHTML = `
    <article class="drug-card">
      <div class="drug-top">
        <span class="drug-avatar">${ic("pill")}</span>
        <div style="min-width:0">
          <h2 class="drug-name">${esc(label(d))}${strength ? ` <span class="drug-gen">${esc(strength)}</span>` : ""}</h2>
          <div class="drug-gen">${esc(ingrText(d))}</div>
          <div class="tags">
            ${srcTag}
            ${d.rx ? `<span class="tag rx">${ic("file")}${t("rx")}</span>` : d.rxKnown === false ? "" : `<span class="tag otc">${t("otc")}</span>`}
            ${d.abx ? `<span class="tag abx">${ic("alert")}${t("abx")}</span>` : ""}
          </div>
        </div>
      </div>
      <div class="drug-body">
        ${showUzWarning ? `<div class="callout ai">${ic("info")}<span>${esc(t("fdaEnglish"))}</span></div>` : ""}
        ${d.abx ? `<div class="callout abx">${ic("alert")}<span>${esc(t("abxWarn"))}</span></div>` : ""}
        <div class="facts">
          ${fact("about", "info")}${fact("group", "layers")}${fact("forms", "flask")}${fact("use", "stetho")}${fact("how", "clock")}${fact("side", "activity")}
        </div>
        ${extra ? `<details class="more" open><summary>${ic("chevron")}${t("moreInfo")}</summary><div class="facts">${extra}</div></details>` : ""}
        ${x.note ? `<div class="callout note">${ic("bulb")}<span><b>${t("note")}:</b> ${esc(x.note)}</span></div>` : ""}
      </div>
      <div class="drug-actions">
        <button class="btn primary" id="btnAddScanned" ${inList(d) ? "disabled" : ""}>${ic(inList(d) ? "check-sm" : "plus")}<span>${inList(d) ? t("added") : t("addToList")}</span></button>
        ${src === "db" ? `<button class="btn soft" id="btnOnline">${ic("globe")}<span>${t("searchOnline")}</span></button>` : ""}
      </div>
      ${sources}
      <div class="source">${esc(t({ db: "sourceDb", fda: "sourceFda", web: "sourceWeb", aiweb: "sourceAiWeb", airef: "sourceAiRef", ai: "sourceAi" }[src]))}</div>
    </article>`;
  $("#btnAddScanned").onclick = () => { addMed(d); renderDrug(current); };
  if ($("#btnOnline")) $("#btnOnline").onclick = async () => {
    $("#btnOnline").disabled = true;
    const generic = d.ingr.map(i => INGR_NAMES[i] || i).join(", ");
    if (!(await searchOnline(d.names[0], generic))) { setStatus(t("noMatchTyped"), "error"); $("#btnOnline").disabled = false; }
  };
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/\*\*/g, ""));
  const voices = speechSynthesis.getVoices();
  const v = voices.find(v => v.lang.toLowerCase().startsWith(lang)) || (lang === "uz" ? voices.find(v => v.lang.startsWith("tr")) : null);
  if (v) u.voice = v;
  u.lang = lang === "uz" ? "uz-UZ" : "en-US"; u.rate = 0.92;
  speechSynthesis.speak(u);
}

// ---------- 2. INTERACTION CHECK ----------
const medObj = m => typeof m === "string" ? DRUGS.find(d => d.id === m) : m;
function addMed(d) {
  if (inList(d)) return false;
  myMeds.push(d.src ? d : d.id); store.set("meds", myMeds); renderList(); return true;
}
function addTyped(d) {
  const err = $("#addError"); err.textContent = "";
  if (!d) {
    const v = $("#addName").value.trim(); if (!v) return;
    d = findDrugByText(v);
    if (!d) { err.textContent = t("notInDbForCheck"); return; }
  }
  if (!addMed(d)) { err.textContent = t("already"); return; }
  $("#addName").value = "";
}
$("#btnAdd").onclick = () => addTyped();
$("#addName").addEventListener("keydown", e => { if (e.key === "Enter") addTyped(); });
autocomplete($("#addName"), $("#addSuggest"), d => addTyped(d));
$("#btnClearList").onclick = () => { myMeds = []; store.set("meds", myMeds); renderList(); };

function renderList() {
  const list = myMeds.map(medObj).filter(Boolean);
  const warns = list.length >= 2 ? checkInteractions(list) : [];
  const flag = id => warns.some(w => w.sev === "high" && (w.A.id === id || w.B.id === id)) ? "high" : warns.some(w => w.A.id === id || w.B.id === id) ? "moderate" : "";
  $("#btnClearList").hidden = !list.length;
  $("#myList").innerHTML = list.length
    ? list.map(d => `<div class="med-item ${flag(d.id) ? "flag-" + flag(d.id) : ""}">
        <span class="drug-avatar">${ic("pill")}</span>
        <div style="min-width:0"><b>${esc(label(d))}</b><small>${esc(ingrText(d))}</small></div>
        <button class="icon-btn" aria-label="remove" data-id="${esc(d.id)}">${ic("x")}</button></div>`).join("")
    : `<div class="empty"><span class="drop-icon">${ic("pill", "lg")}</span><b>${t("emptyList")}</b><span class="small">${t("emptyHint")}</span></div>`;
  $("#myList").querySelectorAll("button[data-id]").forEach(b => b.onclick = () => {
    myMeds = myMeds.filter(m => (m.id || m) !== b.dataset.id); store.set("meds", myMeds); renderList();
  });

  const badge = $("#badge");
  badge.hidden = !warns.length; badge.textContent = warns.length;
  if (list.length < 2) { $("#checkSummary").innerHTML = list.length ? `<div class="status info">${ic("info")}<div>${t("oneMore")}</div></div>` : ""; $("#checkResult").innerHTML = ""; return; }
  const nHigh = warns.filter(w => w.sev === "high").length, nMod = warns.length - nHigh;
  $("#checkSummary").innerHTML = warns.length
    ? `<div class="summary ${nHigh ? "high" : "moderate"}"><span class="page-icon">${ic("alert")}</span><div><b>${nHigh ? t("sumHigh", nHigh) : t("sumMod", nMod)}</b>${nHigh && nMod ? `<span class="small">+ ${t("sumMod", nMod)}. </span>` : ""}<span class="small">${t("sumHighSub")}</span></div></div>`
    : `<div class="summary ok"><span class="page-icon">${ic("shield")}</span><div><b>${t("sumOk")}</b><span class="small">${t("sumOkSub")}</span></div></div>`;
  $("#checkResult").innerHTML = warns.map(w => `
    <div class="warn ${w.sev}" role="alert">
      <span class="lvl">${ic(w.sev === "high" ? "alert" : "info", "sm")}${t(w.sev)}</span>
      <div class="pair">${esc(label(w.A))}<span class="plus">+</span>${esc(label(w.B))}</div>
      <div>${esc(lang === "uz" ? w.uz : w.en)}</div>
      <div class="tip">${ic("bulb")}<span><b>${t("advice")}:</b> ${esc(lang === "uz" ? w.tipUz : w.tipEn)}</span></div>
    </div>`).join("");
}

// ---------- 3. AI ASSISTANT ----------
const EMERG = /(ko'?kra[kg].{0,15}og'ri|yura[kg].{0,15}og'ri|nafas.{0,12}(qis|ololma|yetisha)|bo'g'il|hush(dan|imni)|falaj|yuzim qiyshay|gapira olmay|qon qus|ko'p qon|tutqanoq|zahar|chest pain|heart attack|can'?t breathe|short(ness)? of breath|faint|unconscious|stroke|paraly|seizure|vomit(ing)? blood|severe bleeding|poison|боль в груди|не могу дышать|задыха|инсульт|без сознания)/i;
const MENTAL = /(o'zimni o'ldir|o'lgim kel|yashagim kelmay|joniga qasd|suicid|kill myself|end my life|want to die|покончить с собой|не хочу жить)/i;

function systemPrompt() {
  const meds = $("#shareMeds").checked ? myMeds.map(medObj).filter(Boolean).map(label).join(", ") : "";
  return `You are "DoriYordam AI", a friendly health information assistant for people in Uzbekistan, many of them elderly.
Rules:
- Reply in the user's language (Uzbek Latin, Russian or English). Interface language: ${lang === "uz" ? "Uzbek" : "English"}.
- Use very simple words, short paragraphs and bullet lists. Use **bold** for key words. Keep answers under 200 words.
- Structure: what the condition is (1–2 sentences); what generally helps (lifestyle, diet including Uzbek foods like plov, non, somsa, sweet tea where relevant); warning signs that need a doctor.
- You do NOT diagnose and do NOT prescribe. Never give personal doses or tell someone to start/stop a medicine; say to ask their doctor.
- Do not recommend antibiotics without a doctor; mention antibiotic resistance if asked.
- If symptoms could be an emergency, start the answer by telling them to call 103 immediately.
- End with one short line recommending which kind of doctor to see (e.g. terapevt, endokrinolog, kardiolog, gastroenterolog) when relevant.
${meds ? `- The user currently takes: ${meds}. Mention relevant cautions with these medicines.` : ""}`;
}

function renderChat(typing) {
  const items = [{ role: "model", text: t("chatHello") }, ...chatHistory];
  $("#chatLog").innerHTML = items.map((m, i) => {
    if (m.role === "alert") return `<div class="callout emerg">${ic("alert")}<div>${md(m.text)}</div></div>`;
    if (m.role === "user") return `<div class="msg-row user"><div class="msg user">${md(m.text)}</div></div>`;
    return `<div class="msg-row"><span class="avatar">${ic("bot")}</span><div class="msg bot">${md(m.text)}${i > 0 ? `<div class="msg-tools"><button data-i="${i}">${ic("volume", "sm")}${t("listen")}</button></div>` : ""}</div></div>`;
  }).join("") + (typing ? `<div class="msg-row"><span class="avatar">${ic("bot")}</span><div class="msg bot"><span class="typing"><i></i><i></i><i></i></span></div></div>` : "");
  $("#chatLog").querySelectorAll(".msg-tools button").forEach(b => b.onclick = () => speak(items[b.dataset.i].text));
  $("#suggest").hidden = chatHistory.length > 0;
}

async function sendChat(text) {
  text = text.trim();
  if (!text) return;
  chatHistory.push({ role: "user", text });
  const norm = text.replace(/[’ʻʼ‘`]/g, "'");
  if (MENTAL.test(norm)) chatHistory.push({ role: "alert", text: t("emergMental") });
  else if (EMERG.test(norm)) chatHistory.push({ role: "alert", text: t("emerg") });
  renderChat(true);
  $("#chatLog").lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" });
  $("#btnSend").disabled = true;
  try {
    const contents = chatHistory.filter(m => m.role !== "alert").map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    chatHistory.push({ role: "model", text: await gemini(contents, { system: systemPrompt() }) });
  } catch (e) {
    chatHistory.push({ role: "alert", text: aiErr(e) });
  } finally {
    $("#btnSend").disabled = false; renderChat();
    $("#chatLog").lastElementChild?.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}
$("#chatForm").addEventListener("submit", e => { e.preventDefault(); const v = $("#chatInput").value; $("#chatInput").value = ""; autosize(); sendChat(v); });
$("#chatInput").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#chatForm").requestSubmit(); } });
$("#chatInput").addEventListener("input", autosize);
function autosize() { const el = $("#chatInput"); el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 160) + "px"; }
$("#suggest").addEventListener("click", e => { const b = e.target.closest("button"); if (b) sendChat(b.textContent); });
$("#shareMeds").checked = store.get("shareMeds", false);
$("#shareMeds").onchange = e => store.set("shareMeds", e.target.checked);

// ---------- SETTINGS ----------
$("#apiKey").value = store.get("key", "");
$("#apiModel").value = store.get("model", "");
$("#btnSaveKey").onclick = () => {
  const k = $("#apiKey").value.trim();
  store.set("key", k); store.set("model", $("#apiModel").value.trim());
  const s = $("#keyStatus"); s.className = "status info";
  s.innerHTML = ic(k ? "check" : "info") + `<div>${k ? t("saved") : t("keyCleared")}</div>`;
};
$("#btnWipe").onclick = () => {
  if (!confirm(t("wipeConfirm"))) return;
  store.wipe(); myMeds = []; chatHistory = []; current = null; lang = "en";
  $("#apiKey").value = ""; $("#apiModel").value = ""; $("#drugResult").innerHTML = ""; $("#keyStatus").innerHTML = "";
  applyLang(); $("#consent").hidden = false;
};

// ---------- start ----------
$("#btnConsent").onclick = () => { store.set("consent", true); $("#consent").hidden = true; };
if (!store.get("consent", false)) $("#consent").hidden = false;
applyLang();
if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("sw.js").catch(() => {});
