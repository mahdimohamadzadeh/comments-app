export const useCalculateDate = (dateString) => {
  const date = new Date(dateString)
  // Parse ISO 8601 string to Date object
  const now = new Date()
  const secondsDate = Math.floor((now - date) / 1000)

  if (secondsDate < 60) {
    return 'just now'
  }

  const minutes = Math.floor(secondsDate / 60)
  if (minutes < 60) {
    return `${minutes} mins ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hours ago`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days} days ago`
  }

  const weeks = Math.floor(days / 7)
  if (weeks < 4) {
    return `${weeks} weeks ago`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months} months ago`
  }

  const years = Math.floor(days / 365)
  return `${years} years ago`
}
