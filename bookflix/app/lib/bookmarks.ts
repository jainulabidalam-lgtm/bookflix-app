export async function toggleBookmark(bookId: string) {
  try {
    const res = await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId })
    });
    return await res.json();
  } catch (e) {
    console.error("Toggle Bookmark error:", e);
    return { error: e };
  }
}

export async function isBookmarked(bookId: string) {
  // We can optimize this by checking the local list or fetching
  // For simplicity, let's just fetch My List and check
  const myList = await getMyList();
  return myList.some((b: any) => b.id === bookId);
}

export async function getMyList() {
  try {
    const res = await fetch("/api/bookmarks");
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.warn("Could not fetch bookmarks:", e);
    return [];
  }
}
