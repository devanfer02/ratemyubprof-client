import dict from "@/constants/dics.json"

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function isBadWord(str: string): boolean {
  const comment = str.toLowerCase();
  
  return dict.some(word => comment.includes(word.toLowerCase()));
}