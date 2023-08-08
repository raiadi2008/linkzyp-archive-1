import {
  ICertificate,
  IEducation,
  IExperience,
  IProject,
  ISite,
} from "./interfaces"

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

/**
 * @param date any | null | undefined
 * @returns date | null
 * @description converts a JSON object into a date object
 * @example
 * convertJSONIntoDate({ year: 2020, month: 1, day: 1 }
 */

export function convertJSONIntoDate(
  date: any | null | undefined
): Date | null | undefined {
  if (!date) return null
  try {
    const year: number = date["year"]
    const month: number = date["month"] - 1
    const day: number = date["day"]

    const result = new Date(year, month - 1, day)
    return result
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param data any
 * @description converts json recieved to ISite
 * @returns ISite | null
 */

export function convertResponseIntoLinkedinData(data: any) {
  try {
    const result = {
      id: data["id"],
      userId: data["userId"],
      username: data["username"],
      profile_picture: data["profile_picture"],
      first_name: data["first_name"],
      last_name: data["last_name"],
      linkedin_url: data["linkedin_url"],
      occupation: data["occupation"],
      experiences: data["experiences"] as IExperience[],
      education: data["education"] as IEducation[],
      projects: data["projects"] as IProject[],
      certificates: data["certificates"] as ICertificate[],
      skills: data["skills"] as string[],
      courses: data["courses"] as string[],
    } as ISite
    return result
  } catch (e) {
    console.error(e)
    return null
  }
}
