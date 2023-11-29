export const isValidProductUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname
    if (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.') ||
      hostname.endsWith('amazon')
    ) {
      return true
    }
  } catch (error) {
    return false
  }

  return false
}
