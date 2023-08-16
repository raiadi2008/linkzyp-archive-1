import { LinksEnum } from "@/constants/links_enum"
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
  currently_working?: boolean
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

export interface ILinksAndSocial {
  url: string
  name: string
  type: LinksEnum
}

export interface IFaq {
  question: string
  answer: string
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
  experiences?: IExperience[]
  education?: IEducation[]
  courses?: string[]
  skills?: string[]
  projects?: IProject[]
  certificates?: ICertificate[]
  links_and_social?: ILinksAndSocial[]
  faqs?: IFaq[]
}

export interface ISiteUpdates {
  siteInfo: ISite
  valuesChanged: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setValuesChanged: Dispatch<SetStateAction<boolean>>
  setSiteInfo: Dispatch<SetStateAction<ISite | null>>
}
