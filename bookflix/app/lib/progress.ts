export async function saveProgress(bookId: string, progress: number, lastPosition: string) {
  try {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, progress, lastPosition })
    });
    return await res.json();
  } catch (e) {
    console.warn("Could not save progress:", e);
  }
}

export async function getProgress(bookId: string) {
  try {
    const res = await fetch(`/api/progress?bookId=${encodeURIComponent(bookId)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn("Could not fetch progress:", e);
    return null;
  }
}

export async function getContinueReading() {
  try {
    const res = await fetch("/api/continue-reading");
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}
