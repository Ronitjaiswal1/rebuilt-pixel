/**
 * "Prepared for [Name]" personalisation for live pitches.
 *
 * The name comes from `?client=Name` (or the editable field in Pitch mode),
 * is sanitised, and is kept in sessionStorage so it survives navigation within
 * the meeting. It is read on the client only, so every page stays static and
 * cacheable for offline use.
 */

const STORAGE_KEY = "rp:client";
const EVENT = "rp:client-change";
export const CLIENT_NAME_MAX = 48;

let memoryValue = "";

/** Keep letters (any script), digits, spaces and a few name punctuation marks. */
export function sanitizeClientName(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw
    .normalize("NFC")
    .replace(/[^\p{L}\p{M}\p{N} &.,'’()\-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, CLIENT_NAME_MAX)
    .trim();
}

function safeGet(): string {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? memoryValue;
  } catch {
    return memoryValue;
  }
}

export function setClientName(raw: string): void {
  const value = sanitizeClientName(raw);
  memoryValue = value;
  try {
    if (value) window.sessionStorage.setItem(STORAGE_KEY, value);
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage blocked: the memory value still works for this page */
  }
  window.dispatchEvent(new Event(EVENT));
}

let paramApplied = false;

/** Applies ?client= once per page load, then returns the stored name. */
export function readClientName(): string {
  if (typeof window === "undefined") return "";
  if (!paramApplied) {
    paramApplied = true;
    const param = new URLSearchParams(window.location.search).get("client");
    if (param !== null) {
      const value = sanitizeClientName(param);
      memoryValue = value;
      try {
        if (value) window.sessionStorage.setItem(STORAGE_KEY, value);
        else window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }
  return sanitizeClientName(safeGet());
}

export function subscribeClientName(callback: () => void): () => void {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
