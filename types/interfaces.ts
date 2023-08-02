import { Dispatch, SetStateAction } from "react"

export interface IExperience {
  starts_at?: Date
  ends_at?: Date
  company?: string
  company_linkedin_profile_url?: string
  title?: string
  description?: string
  location?: string
  logo?: string
}

export interface IEducation {
  starts_at?: Date
  ends_at?: Date
  field_of_study?: string
  degree_name?: string
  school?: string
  logo?: string
}

export interface IProject {
  starts_at?: Date
  ends_at?: Date
  title?: string
  description?: string
  url?: string
}

export interface ICertificate {
  starts_at?: Date
  ends_at?: Date
  name?: string
  authority?: string
  url?: string
}

export interface ISite {
  id?: string
  userId?: string
  profile_picture?: string
  linkedin_url: string
  first_name?: string
  last_name?: string
  full_name?: string
  occupation?: string
  summary?: string
  country?: string
  experiences: IExperience[]
  education: IEducation[]
  courses: string[]
  skills: string[]
  projects: IProject[]
  certificates: ICertificate[]
}

export interface ISiteUpdates {
  siteInfo: ISite | null
  updateSiteInfo: Dispatch<SetStateAction<ISite | null>>
}
