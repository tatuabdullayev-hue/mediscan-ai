// DoriYordam — medicine database core: record builder, interaction rules, name matching.
// Drug records live in db1.js, db2.js, db3.js (loaded after this file).
// Information is general and educational, compiled from standard references (WHO EML, BNF, FDA labels, Vidal).

const DRUGS = [];
const FIELDS = ["group", "forms", "use", "how", "side", "contra", "preg", "kids", "note"];

function D(id, names, ingr, flags, uz, en) {
  const pack = arr => Object.fromEntries(FIELDS.map((f, i) => [f, arr[i] || ""]));
  DRUGS.push({ id, names, ingr, rx: flags.includes("rx"), abx: flags.includes("abx"), uz: pack(uz), en: pack(en) });
}

const INGR_NAMES = {
  paracetamol: "Paracetamol", ibuprofen: "Ibuprofen", aspirin: "Acetylsalicylic acid", caffeine: "Caffeine",
  metamizole: "Metamizole", diclofenac: "Diclofenac", ketorolac: "Ketorolac", nimesulide: "Nimesulide",
  meloxicam: "Meloxicam", naproxen: "Naproxen", ketoprofen: "Ketoprofen", tramadol: "Tramadol",
  drotaverine: "Drotaverine", butylscopolamine: "Hyoscine butylbromide",
  amoxicillin: "Amoxicillin", clavulanate: "Clavulanic acid", ampicillin: "Ampicillin", azithromycin: "Azithromycin",
  clarithromycin: "Clarithromycin", ciprofloxacin: "Ciprofloxacin", levofloxacin: "Levofloxacin", ceftriaxone: "Ceftriaxone",
  cefixime: "Cefixime", doxycycline: "Doxycycline", metronidazole: "Metronidazole", sulfamethoxazole: "Sulfamethoxazole",
  trimethoprim: "Trimethoprim", fluconazole: "Fluconazole", acyclovir: "Acyclovir", oseltamivir: "Oseltamivir",
  albendazole: "Albendazole", mebendazole: "Mebendazole",
  enalapril: "Enalapril", lisinopril: "Lisinopril", captopril: "Captopril", perindopril: "Perindopril",
  losartan: "Losartan", valsartan: "Valsartan", amlodipine: "Amlodipine", nifedipine: "Nifedipine",
  bisoprolol: "Bisoprolol", metoprolol: "Metoprolol", furosemide: "Furosemide", hydrochlorothiazide: "Hydrochlorothiazide",
  indapamide: "Indapamide", spironolactone: "Spironolactone", digoxin: "Digoxin", amiodarone: "Amiodarone",
  nitroglycerin: "Nitroglycerin", warfarin: "Warfarin", rivaroxaban: "Rivaroxaban", apixaban: "Apixaban",
  clopidogrel: "Clopidogrel", atorvastatin: "Atorvastatin", rosuvastatin: "Rosuvastatin", simvastatin: "Simvastatin",
  trimetazidine: "Trimetazidine", potassium: "Potassium", magnesium: "Magnesium",
  metformin: "Metformin", glibenclamide: "Glibenclamide", gliclazide: "Gliclazide", glimepiride: "Glimepiride",
  insulin: "Insulin", levothyroxine: "Levothyroxine", thiamazole: "Thiamazole", prednisolone: "Prednisolone",
  dexamethasone: "Dexamethasone", omeprazole: "Omeprazole", pantoprazole: "Pantoprazole", famotidine: "Famotidine",
  antacid: "Aluminium/magnesium hydroxide", diosmectite: "Diosmectite", loperamide: "Loperamide", charcoal: "Activated charcoal",
  pancreatin: "Pancreatin", domperidone: "Domperidone", metoclopramide: "Metoclopramide", lactulose: "Lactulose",
  cetirizine: "Cetirizine", loratadine: "Loratadine", chloropyramine: "Chloropyramine", diphenhydramine: "Diphenhydramine",
  salbutamol: "Salbutamol", ambroxol: "Ambroxol", acetylcysteine: "Acetylcysteine", xylometazoline: "Xylometazoline",
  diazepam: "Diazepam", phenazepam: "Phenazepam", sertraline: "Sertraline", fluoxetine: "Fluoxetine",
  amitriptyline: "Amitriptyline", carbamazepine: "Carbamazepine", piracetam: "Piracetam", phenobarbital: "Phenobarbital",
  bromisoval: "Ethyl bromisovalerate", betahistine: "Betahistine", iron: "Iron", folic: "Folic acid", vitd: "Colecalciferol (D3)",
  calcium: "Calcium carbonate", pyridoxine: "Pyridoxine (B6)", allopurinol: "Allopurinol", sildenafil: "Sildenafil",
};

// ---------- Interaction rules (by active ingredient / class) ----------
const G = {
  nsaid: ["ibuprofen", "diclofenac", "ketorolac", "nimesulide", "meloxicam", "naproxen", "ketoprofen"],
  anticoag: ["warfarin", "rivaroxaban", "apixaban"],
  acei: ["enalapril", "lisinopril", "captopril", "perindopril"],
  arb: ["losartan", "valsartan"],
  diuretic: ["furosemide", "hydrochlorothiazide", "indapamide"],
  steroid: ["prednisolone", "dexamethasone"],
  ssri: ["sertraline", "fluoxetine"],
  benzo: ["diazepam", "phenazepam"],
  sedative: ["chloropyramine", "diphenhydramine", "phenobarbital", "amitriptyline"],
  quinolone: ["ciprofloxacin", "levofloxacin"],
  binders: ["iron", "calcium", "antacid", "magnesium"],
  sulfonylurea: ["glibenclamide", "gliclazide", "glimepiride"],
  diabetes: ["metformin", "glibenclamide", "gliclazide", "glimepiride", "insulin"],
  betablock: ["bisoprolol", "metoprolol"],
  macrolide: ["clarithromycin", "azithromycin"],
  qt: ["clarithromycin", "azithromycin", "amiodarone", "domperidone", "fluconazole", "levofloxacin", "ciprofloxacin"],
  statinStrong: ["simvastatin", "atorvastatin"],
  ppi: ["omeprazole"],
};
G.raas = [...G.acei, ...G.arb];

const R = (a, b, sev, uz, en, tipUz, tipEn) => ({ a, b, sev, uz, en, tipUz, tipEn });

const RULES = [
  // Bleeding
  R(G.anticoag, G.anticoag, "high", "Ikki qonni suyultiruvchi dori birga — og'ir qon ketish xavfi.", "Two blood thinners together — severe bleeding risk.",
    "Faqat bittasi qolishi kerak. Darhol shifokorga ayting.", "Only one should be used. Tell your doctor right away."),
  R(G.anticoag, ["aspirin"], "high", "Qon ketish xavfi keskin ortadi (ichki qon ketish ham).", "Sharply increases bleeding risk, including internal bleeding.",
    "Birga ichishni faqat shifokor buyurgan bo'lsa davom ettiring.", "Only continue together if your doctor prescribed both."),
  R(G.anticoag, G.nsaid, "high", "Qon ketish va oshqozondan qon ketish xavfi ortadi.", "Increases bleeding and stomach bleeding risk.",
    "Og'riq uchun paratsetamolni qisqa muddat ishlatish xavfsizroq — shifokordan so'rang.", "Short-term paracetamol is a safer pain option — ask your doctor."),
  R(G.anticoag, ["clopidogrel"], "high", "Qon ketish xavfi juda yuqori.", "Very high bleeding risk.",
    "Bunday birikmani faqat kardiolog qisqa muddatga buyuradi.", "Only a cardiologist prescribes this, short-term."),
  R(["warfarin"], ["metronidazole", "fluconazole", "amiodarone", "sulfamethoxazole"], "high", "Bu dori varfarin ta'sirini kuchli oshiradi — qon ketish xavfi.", "This drug strongly boosts warfarin — bleeding risk.",
    "Shifokor INR tahlilini tez-tez tekshirishi va dozani o'zgartirishi kerak.", "Your doctor should check INR more often and adjust the dose."),
  R(["warfarin"], ["ciprofloxacin", "levofloxacin", "azithromycin", "clarithromycin", "doxycycline"], "moderate", "Antibiotik varfarin ta'sirini oshirishi mumkin.", "The antibiotic may increase warfarin's effect.",
    "Davolanish paytida INR tahlilini tekshiring.", "Check INR during the course."),
  R(["warfarin"], ["paracetamol"], "moderate", "Bir necha kun muntazam ko'p dozada paratsetamol varfarin ta'sirini oshiradi.", "Regular high-dose paracetamol for several days can raise warfarin's effect.",
    "Vaqti-vaqti bilan kichik dozada ichish odatda xavfsiz.", "Occasional low doses are usually fine."),
  R(["warfarin"], ["carbamazepine"], "moderate", "Karbamazepin varfarin ta'sirini susaytiradi — tromb xavfi.", "Carbamazepine weakens warfarin — clot risk.",
    "INR ni tekshirib, dozani shifokor moslashtirishi kerak.", "INR must be checked and the dose adjusted."),
  R(["clopidogrel"], ["omeprazole"], "moderate", "Omeprazol klopidogrel ta'sirini susaytiradi — tromb xavfi ortishi mumkin.", "Omeprazole weakens clopidogrel — clot risk may rise.",
    "Shifokor pantoprazolga almashtirishi mumkin.", "Your doctor may switch to pantoprazole."),
  R(["clopidogrel"], ["aspirin"], "moderate", "Qon ketish xavfi ortadi. Ba'zan shifokor ataylab birga buyuradi (stentdan keyin).", "Higher bleeding risk. Sometimes prescribed together on purpose (after a stent).",
    "O'zboshimchalik bilan qo'shmang.", "Do not combine on your own."),
  R(["clopidogrel"], G.nsaid, "moderate", "Qon ketish va oshqozondan qon ketish xavfi ortadi.", "Increases bleeding and stomach bleeding risk.",
    "Og'riq uchun boshqa variantni shifokordan so'rang.", "Ask your doctor about another pain reliever."),
  R(["aspirin"], G.nsaid, "moderate", "Oshqozondan qon ketish xavfi ortadi; ibuprofen aspirinning yurakni himoya qilish ta'sirini susaytiradi.", "Raises stomach bleeding risk; ibuprofen can block aspirin's heart-protecting effect.",
    "Yurak uchun aspirin ichsangiz, og'riqqa boshqa dori tanlang.", "If you take aspirin for your heart, choose another pain reliever."),
  R(G.nsaid, G.nsaid, "high", "Ikki yallig'lanishga qarshi dori (NYaQD) birga — oshqozon yarasi, qon ketish va buyrak zararlanishi xavfi.", "Two NSAIDs together — risk of ulcers, bleeding and kidney damage.",
    "Faqat bittasini tanlang.", "Use only one of them."),
  R(G.nsaid, G.steroid, "moderate", "Gormon + NYaQD oshqozon yarasi va qon ketish xavfini oshiradi.", "Steroid + NSAID increases ulcer and bleeding risk.",
    "Shifokor oshqozonni himoya qiluvchi dori (omeprazol) qo'shishi mumkin.", "Your doctor may add stomach protection (omeprazole)."),
  R(G.nsaid, G.ssri, "moderate", "Antidepressant + NYaQD oshqozondan qon ketish xavfini oshiradi.", "Antidepressant + NSAID increases stomach bleeding risk.",
    "Og'riq uchun paratsetamol xavfsizroq.", "Paracetamol is safer for pain."),
  R(G.anticoag, G.ssri, "moderate", "Qon ketish xavfi ortadi.", "Increased bleeding risk.",
    "Ko'karish yoki qon ketish belgilarini kuzating.", "Watch for bruising or bleeding."),
  // Kidneys, potassium
  R(G.nsaid, G.raas, "moderate", "Qon bosimi dorisining ta'siri susayadi, buyrakka zarar xavfi ortadi.", "Reduces the blood pressure medicine's effect and can harm the kidneys.",
    "Qisqa muddat ichsangiz ham ko'p suv iching, bosimni o'lchang.", "Even short-term: drink enough water and monitor blood pressure."),
  R(G.nsaid, G.diuretic, "moderate", "Siydik haydovchi ta'siri susayadi, buyrakka yuklama ortadi.", "Weakens the diuretic and strains the kidneys.",
    "Shishlar ko'paysa, shifokorga ayting.", "Tell your doctor if swelling increases."),
  R(G.raas, ["spironolactone"], "high", "Qonda kaliy xavfli darajada oshishi mumkin (yurak ritmi buzilishi).", "Potassium can rise to dangerous levels (heart rhythm problems).",
    "Faqat shifokor nazoratida, qonda kaliyni muntazam tekshirib.", "Only under medical supervision with regular potassium tests."),
  R([...G.raas, "spironolactone"], ["potassium"], "high", "Kaliy preparati + bu dori — qonda kaliy xavfli oshadi.", "Potassium supplement + this drug — dangerous rise in potassium.",
    "Kaliyli dorini shifokorsiz ichmang, qonda kaliyni tekshiring.", "Do not take potassium without your doctor; check blood potassium."),
  R(G.raas, G.raas, "high", "Bir xil tizimga ta'sir qiluvchi ikki bosim dorisi — buyrak zararlanishi va kaliy ortishi xavfi.", "Two drugs acting on the same system — kidney damage and high potassium risk.",
    "Odatda birga buyurilmaydi. Shifokorga ayting.", "Usually not prescribed together. Tell your doctor."),
  R(["trimethoprim"], [...G.raas, "spironolactone"], "moderate", "Biseptol bilan birga qonda kaliy ortishi mumkin.", "With co-trimoxazole, potassium may rise.",
    "Keksalarda kaliyni tekshirish tavsiya etiladi.", "Potassium checks are advisable in the elderly."),
  // Heart rhythm
  R(G.diuretic, ["digoxin"], "high", "Siydik haydovchi kaliyni kamaytiradi, bu digoksin zaharlanishiga olib kelishi mumkin.", "The diuretic lowers potassium, which can cause digoxin toxicity.",
    "Qonda kaliyni muntazam tekshiring.", "Check potassium regularly."),
  R(["amiodarone", "spironolactone", "clarithromycin"], ["digoxin"], "high", "Qonda digoksin miqdori oshadi — zaharlanish xavfi.", "Raises digoxin levels — toxicity risk.",
    "Digoksin dozasini shifokor kamaytirishi kerak. Ko'ngil aynishi yoki ko'rish buzilsa, shifokorga.", "The doctor should reduce the digoxin dose. See a doctor if nausea or vision changes occur."),
  R(G.qt, G.qt, "high", "Ikkala dori ham yurak ritmiga ta'sir qiladi (QT uzayishi) — xavfli aritmiya ehtimoli.", "Both drugs affect heart rhythm (QT prolongation) — risk of dangerous arrhythmia.",
    "Birga ichishdan oldin shifokor EKG tekshirishi kerak.", "A doctor should check an ECG before combining them."),
  R(["amiodarone"], G.betablock, "moderate", "Yurak juda sekin urishi mumkin.", "Heart rate may become very slow.",
    "Pulsni kuzating, 50 dan past bo'lsa shifokorga.", "Monitor pulse; see a doctor if below 50."),
  R(["sildenafil"], ["nitroglycerin"], "high", "Qon bosimi halokatli darajada tushishi mumkin!", "Blood pressure can drop to life-threatening levels!",
    "Hech qachon birga ichmang. Sildenafildan keyin 24 soat nitrat ishlatilmaydi.", "Never combine. No nitrates within 24 hours of sildenafil."),
  // Statins
  R(["clarithromycin"], ["simvastatin"], "high", "Klaritromitsin simvastatin miqdorini keskin oshiradi — mushak parchalanishi (rabdomioliz) xavfi.", "Clarithromycin sharply raises simvastatin levels — risk of muscle breakdown.",
    "Antibiotik kursi davomida simvastatin to'xtatiladi — shifokordan so'rang.", "Simvastatin is paused during the antibiotic course — ask your doctor."),
  R(["clarithromycin", "fluconazole", "amiodarone"], ["atorvastatin", "simvastatin"], "moderate", "Statin miqdori qonda ortadi — mushak og'rig'i va shikastlanishi xavfi.", "Statin levels rise — risk of muscle pain and damage.",
    "Mushak og'rig'i paydo bo'lsa, shifokorga ayting.", "Tell your doctor if muscle pain appears."),
  // Nervous system
  R(["tramadol"], [...G.ssri, "amitriptyline"], "high", "Serotonin sindromi (isitma, titrash, qo'zg'alish) va tutqanoq xavfi.", "Risk of serotonin syndrome (fever, tremor, agitation) and seizures.",
    "Shifokor boshqa og'riq qoldiruvchi tanlashi kerak.", "Your doctor should choose another pain reliever."),
  R(G.ssri, G.ssri, "high", "Ikki antidepressant birga — serotonin sindromi xavfi.", "Two antidepressants together — serotonin syndrome risk.",
    "Faqat psixiatr buyurgan bo'lsa.", "Only if a psychiatrist prescribed it."),
  R(G.benzo, ["tramadol"], "high", "Nafasning susayishi va to'xtashi xavfi, kuchli uyquchanlik.", "Risk of slowed or stopped breathing, severe drowsiness.",
    "Birga ichmang. Spirt bilan esa yanada xavfli.", "Do not combine. Even more dangerous with alcohol."),
  R(G.benzo, G.benzo, "high", "Bir guruhdagi ikki tinchlantiruvchi — nafas susayishi va qaramlik xavfi.", "Two drugs of the same class — breathing depression and dependence risk.",
    "Faqat bittasini iching.", "Take only one."),
  R([...G.benzo, "tramadol"], G.sedative, "moderate", "Uyquchanlik va bosh aylanishi kuchayadi, yiqilish xavfi.", "Increased drowsiness and dizziness, risk of falls.",
    "Mashina haydamang, spirtli ichimlikdan saqlaning.", "Do not drive; avoid alcohol."),
  R(["carbamazepine"], ["clarithromycin", "fluconazole"], "moderate", "Karbamazepin miqdori ortadi — bosh aylanishi, ko'rish ikkilanishi, zaharlanish.", "Carbamazepine levels rise — dizziness, double vision, toxicity.",
    "Shifokor dozani nazorat qilishi kerak.", "The doctor should monitor the dose."),
  R(["metoclopramide"], ["domperidone"], "moderate", "Bir xil ta'sirli ikki dori — nojo'ya ta'sirlar ortadi.", "Two drugs with the same action — more side effects.",
    "Faqat bittasini iching.", "Take only one."),
  // Absorption
  R(G.quinolone, G.binders, "moderate", "Temir, kalsiy, magniy yoki antatsid antibiotik so'rilishini kamaytiradi — davolash samarasiz bo'ladi.", "Iron, calcium, magnesium or antacids block the antibiotic's absorption — treatment may fail.",
    "Antibiotikni ulardan 2 soat oldin yoki 6 soat keyin iching.", "Take the antibiotic 2 h before or 6 h after them."),
  R(["doxycycline"], G.binders, "moderate", "So'rilish kamayadi — antibiotik samarasi pasayadi.", "Absorption is reduced — the antibiotic works less.",
    "Oralig'i 2–3 soat bo'lsin.", "Separate by 2–3 hours."),
  R(["levothyroxine"], [...G.binders, "omeprazole", "pantoprazole"], "moderate", "Gormon so'rilishi kamayadi.", "Thyroid hormone absorption is reduced.",
    "Oralig'i kamida 4 soat bo'lsin, TTG tahlilini tekshirib turing.", "Separate by at least 4 hours and monitor TSH."),
  R(["azithromycin"], ["antacid"], "moderate", "Antatsid antibiotik so'rilishini kamaytiradi.", "Antacids reduce the antibiotic's absorption.",
    "Oralig'i 2 soat bo'lsin.", "Separate by 2 hours."),
  R(["charcoal", "diosmectite"], [...G.diabetes.filter(x => x !== "insulin"), "levothyroxine", "warfarin", "digoxin", "carbamazepine"], "moderate", "Adsorbent boshqa dorini yutib, ta'sirini kamaytiradi.", "The adsorbent binds the other drug and reduces its effect.",
    "Oralig'i kamida 2 soat bo'lsin.", "Separate by at least 2 hours."),
  // Blood sugar
  R(G.sulfonylurea, [...G.quinolone, "clarithromycin", "fluconazole"], "moderate", "Qand keskin tushib ketishi mumkin (gipoglikemiya).", "May cause a sharp drop in blood sugar (hypoglycaemia).",
    "Qandni tez-tez o'lchang, yoningizda shirinlik bo'lsin.", "Check blood sugar often and keep something sweet nearby."),
  R(G.diabetes, G.steroid, "moderate", "Gormon qonda qandni oshiradi — diabet nazorati buziladi.", "The steroid raises blood sugar — diabetes control worsens.",
    "Qandni kuniga bir necha marta o'lchang, dozani shifokor o'zgartirishi mumkin.", "Check sugar several times a day; the dose may need changing."),
  R(["insulin", ...G.sulfonylurea], G.betablock, "moderate", "Beta-blokator qand tushishi belgilarini (titrash, yurak urishi) yashirishi mumkin.", "The beta-blocker can hide signs of low sugar (tremor, palpitations).",
    "Qandni glyukometr bilan muntazam tekshiring.", "Check blood sugar with a meter regularly."),
  R(G.sulfonylurea, G.sulfonylurea, "high", "Bir guruhdagi ikki qand tushiruvchi — og'ir gipoglikemiya xavfi.", "Two drugs from the same class — severe hypoglycaemia risk.",
    "Faqat bittasini iching.", "Take only one."),
  // Other
  R(["allopurinol"], ["amoxicillin", "ampicillin"], "moderate", "Teri toshmasi ehtimoli ortadi.", "Higher chance of skin rash.",
    "Toshma toshsa, shifokorga ayting.", "Tell your doctor if a rash appears."),
  R(["metronidazole"], ["phenobarbital"], "moderate", "Metronidazol ta'siri susayishi mumkin.", "Metronidazole may work less well.",
    "Shifokorga korvalol ichishingizni ayting.", "Tell your doctor you take Corvalol."),
];

// ---------- Name matching (Latin + Cyrillic, tolerant to OCR mistakes) ----------
function normName(s) {
  return (s || "").toLowerCase().replace(/[ё]/g, "е").replace(/[’ʻʼ‘`']/g, "").replace(/[^a-zа-я0-9]+/g, " ").trim();
}

const NAME_INDEX = [];
function buildIndex() {
  NAME_INDEX.length = 0;
  for (const d of DRUGS) for (const n of d.names) NAME_INDEX.push({ d, n: normName(n) });
}

// fuzzy: also accept near-misses (typos, OCR errors, Uzbek spelling such as "Paratsetamol").
function findDrugByText(text, { fuzzy = true } = {}) {
  if (!NAME_INDEX.length) buildIndex();
  const t = " " + normName(text) + " ";
  let best = null, bestLen = 0;
  for (const { d, n } of NAME_INDEX) {
    if (n.length >= 3 && t.includes(" " + n) && n.length > bestLen) { best = d; bestLen = n.length; }
  }
  if (best || !fuzzy) return best;
  const words = t.trim().split(" ").filter(w => w.length >= 4);
  let bestScore = 0;
  for (const { d, n } of NAME_INDEX) {
    const first = n.split(" ")[0];
    if (first.length < 6) continue;
    for (const w of words) {
      const sc = 1 - levenshtein(w, first) / Math.max(w.length, first.length);
      if (sc > bestScore) { bestScore = sc; best = d; }
    }
  }
  // Strict threshold: a wrong medicine is worse than "not found" (e.g. Мексидол must not match Месипол).
  return bestScore > 0.8 ? best : null;
}

// Prefix search for the autocomplete list.
function searchDrugs(q, limit = 8) {
  if (!NAME_INDEX.length) buildIndex();
  const n = normName(q);
  if (n.length < 2) return [];
  const seen = new Set(), out = [];
  for (const pass of [x => x.n.startsWith(n), x => x.n.includes(n)]) {
    for (const x of NAME_INDEX) {
      if (out.length >= limit) break;
      if (!seen.has(x.d.id) && pass(x)) { seen.add(x.d.id); out.push({ d: x.d, label: x.d.names[DRUGS_NAME_IDX(x)] }); }
    }
  }
  return out;
}
function DRUGS_NAME_IDX(x) { const i = x.d.names.findIndex(nm => normName(nm) === x.n); return i < 0 ? 0 : i; }

function levenshtein(a, b) {
  const m = a.length, n = b.length, dp = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[m][n];
}

// ---------- Interaction check ----------
function checkInteractions(list) {
  const out = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const A = list[i], B = list[j];
      const shared = A.ingr.filter(x => B.ingr.includes(x));
      if (shared.length) {
        const ing = shared.map(x => INGR_NAMES[x] || x).join(", ");
        const mild = shared.every(x => ["vitd", "calcium", "magnesium", "iron", "folic", "pyridoxine", "potassium"].includes(x));
        out.push({ A, B, sev: mild ? "moderate" : "high", dup: true,
          uz: `Ikkala dorida ham bir xil modda bor: ${ing}. Birga ichsangiz dozasi oshib ketadi.`,
          en: `Both medicines contain the same ingredient: ${ing}. Taking both leads to an overdose.`,
          tipUz: "Faqat bittasini iching.", tipEn: "Take only one of them." });
        continue;
      }
      const hit = r => A.ingr.some(x => r.a.includes(x) && B.ingr.some(y => y !== x && r.b.includes(y))) ||
                       B.ingr.some(x => r.a.includes(x) && A.ingr.some(y => y !== x && r.b.includes(y)));
      const rule = RULES.find(hit);
      if (rule) out.push({ A, B, ...rule });
    }
  }
  return out.sort((x, y) => (x.sev === "high" ? 0 : 1) - (y.sev === "high" ? 0 : 1));
}
