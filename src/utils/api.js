const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function fetchAnnouncements() {
  const res = await fetch(`${API_BASE}/announcements`);
  if (!res.ok) throw new Error('Failed to fetch announcements');
  return res.json();
}

export async function fetchGallery() {
  const res = await fetch(`${API_BASE}/gallery`);
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

export async function fetchMagazines() {
  const res = await fetch(`${API_BASE}/magazines`);
  if (!res.ok) throw new Error('Failed to fetch magazines');
  return res.json();
}

export async function fetchLibrary() {
  const res = await fetch(`${API_BASE}/library`);
  if (!res.ok) throw new Error('Failed to fetch library');
  return res.json();
}

export async function fetchAdvertisements() {
  const res = await fetch(`${API_BASE}/advertisements`);
  if (!res.ok) throw new Error('Failed to fetch advertisements');
  return res.json();
}
