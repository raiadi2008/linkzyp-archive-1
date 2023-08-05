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
  title?: string
  description?: string
  url?: string
}

export interface ICertificate {
  name?: string
  authority?: string
  url?: string
}

export interface ISite {
  id?: string
  userId?: string
  domain?: string
  username?: string
  themeId?: string
  profile_picture?: string
  linkedin_url?: string
  first_name?: string
  last_name?: string
  occupation?: string
  experiences: IExperience[]
  education: IEducation[]
  courses: string[]
  skills: string[]
  projects: IProject[]
  certificates: ICertificate[]
}

export interface ISiteUpdates {
  siteInfo: ISite
  updateSiteInfo: Dispatch<SetStateAction<ISite | null>>
}
