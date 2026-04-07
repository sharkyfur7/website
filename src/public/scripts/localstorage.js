export function setValue(key, value, expire_minutes) {
  const entry = {
    value: value ?? "",
    expires: expire_minutes ? Date.now() + expire_minutes * 60 * 1000 : null,
  };
  localStorage.setItem(key, JSON.stringify(entry));
}

export function getValue(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const { value, expires } = JSON.parse(raw);
    if (expires && Date.now() > expires) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  } catch {
    return raw; // fallback for non-wrapped values
  }
}
