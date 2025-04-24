export function formatDate(raw: string): string {
  // Remove timezone and microseconds
  const clean = raw.split(" ")[0] + "T" + raw.split(" ")[1];
  const date = new Date(clean);
  
  const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  
  return formatted
  
}

