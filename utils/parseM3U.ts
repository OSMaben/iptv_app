export const parseM3U = (data: any) => {
  const lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("http")) {
      return lines[i].trim();
    }
  }
  return null;
};
