// audio.js — on-device Arabic pronunciation via the Web Speech API.
//
// The source courses ship recorded clips for a fixed word list; using the
// browser's speech synthesiser instead gives spoken audio for *every* word,
// works offline, and carries no licensing concerns. A real Arabic voice is
// used when the device provides one.

let arVoice = null;

function refreshVoice() {
  if (typeof speechSynthesis === 'undefined') return;
  const voices = speechSynthesis.getVoices() || [];
  // Prefer an Arabic voice; fall back to any voice whose lang starts with "ar".
  arVoice =
    voices.find((v) => /^ar(-|_|$)/i.test(v.lang)) ||
    voices.find((v) => /arabic/i.test(v.name)) ||
    null;
}

if (typeof speechSynthesis !== 'undefined') {
  refreshVoice();
  speechSynthesis.addEventListener?.('voiceschanged', refreshVoice);
}

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Some entries carry typographic helpers (tatwīl dashes on affixes, the
// definite-article "الْـ" form). Clean them so the synthesiser reads sensibly.
function clean(text) {
  return String(text).replace(/ـ/g, '').trim();
}

export function speak(text) {
  if (!canSpeak()) return;
  try {
    const utt = new SpeechSynthesisUtterance(clean(text));
    utt.lang = arVoice?.lang || 'ar-SA';
    if (arVoice) utt.voice = arVoice;
    utt.rate = 0.8;   // a touch slow, for learners
    utt.pitch = 1;
    speechSynthesis.cancel(); // stop anything already playing
    speechSynthesis.speak(utt);
  } catch (_) {
    /* ignore — audio is a non-critical enhancement */
  }
}
