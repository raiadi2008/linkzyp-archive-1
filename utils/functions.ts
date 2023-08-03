function padZero(num: number): string {
  return num.toString().padStart(2, "0")
}

export function formatDateAs_YYYY_MM_DD(dateString: Date | string): string {
  try {
    const dateObject = new Date(dateString)

    if (isNaN(dateObject.getTime())) {
      // Invalid date, return today's date
      return getTodayFormattedDate()
    }

    const year = dateObject.getUTCFullYear()
    const month = padZero(dateObject.getUTCMonth() + 1)
    const day = padZero(dateObject.getUTCDate())

    return `${year}-${month}-${day}`
  } catch (error) {
    // Any error occurred, return today's date
    return getTodayFormattedDate()
  }
}

export function getTodayFormattedDate(): string {
  const today = new Date()
  const year = today.getUTCFullYear()
  const month = padZero(today.getUTCMonth() + 1)
  const day = padZero(today.getUTCDate())

  return `${year}-${month}-${day}`
}

export function getDateWithoutTime(
  dateString: string | null | undefined
): Date | undefined {
  if (!dateString) return undefined
  const dateObject = new Date(dateString)

  // Ignore the time part
  const year = dateObject.getUTCFullYear()
  const month = dateObject.getUTCMonth()
  const day = dateObject.getUTCDate()

  return new Date(Date.UTC(year, month, day))
}

export function convert_YYYY_MM_DD_toDate(
  dateString: string | null | undefined
): Date | undefined {
  if (!dateString) return undefined
  try {
    const dateObject = new Date(dateString)
    console.log("dateObject", dateObject)
    return dateObject
  } catch (error) {
    return undefined
  }
}

export function removeItemAtIndex<T>(array: T[], index: number): T[] {
  if (index >= 0 && index < array.length) {
    array.splice(index, 1)
  }
  return array
}
