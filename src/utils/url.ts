
export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const generateMediaStoreUrl = (url: string) => {
  return `http://localhost:8080/uploads/${url}.png`
}
