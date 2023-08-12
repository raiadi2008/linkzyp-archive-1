import { ISite } from "@/utils/interfaces"
import { Dispatch, SetStateAction } from "react"

import ProfileSettings from "@/components/settings/profile/profile"
import WorkExperience from "@/components/settings/work-experience/work-experience"
import Education from "@/components/settings/education/education"
import SkillsAndCourses from "@/components/settings/skills-and-courses/skills-and-courses"
import Projects from "@/components/settings/projects/projects"
import Certificates from "@/components/settings/cetificates/certificates"
import ProfileSettingsLoading from "@/components/settings/profile/loading"
import WorkExperienceLoading from "@/components/settings/work-experience/loading"
import EducationLoading from "@/components/settings/education/loading"
import SkillsAndCoursesLoading from "@/components/settings/skills-and-courses/loading"
import ProjectsLoading from "@/components/settings/projects/loading"
import CertificatesLoading from "@/components/settings/cetificates/loading"

export default function CurrentSettingsSection(
  tab: string | null,
  siteInfo: ISite | null,
  valuesChanged: boolean,
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setValuesChanged: Dispatch<SetStateAction<boolean>>,
  updateSiteInfo: Dispatch<SetStateAction<ISite | null>>
) {
  switch (tab) {
    case "profile":
      if (!isLoading && siteInfo) {
        return (
          <ProfileSettings
            siteInfo={siteInfo}
            valuesChanged={valuesChanged}
            setValuesChanged={setValuesChanged}
            setSiteInfo={updateSiteInfo}
            setIsLoading={setIsLoading}
          />
        )
      } else {
        return <ProfileSettingsLoading />
      }
    case "experience":
      if (!isLoading && siteInfo) {
        return (
          <WorkExperience
            siteInfo={siteInfo}
            valuesChanged={valuesChanged}
            setValuesChanged={setValuesChanged}
            setSiteInfo={updateSiteInfo}
            setIsLoading={setIsLoading}
          />
        )
      } else {
        return <WorkExperienceLoading />
      }
    case "education":
      if (!isLoading && siteInfo) {
        return (
          <Education
            siteInfo={siteInfo}
            valuesChanged={valuesChanged}
            setValuesChanged={setValuesChanged}
            setSiteInfo={updateSiteInfo}
            setIsLoading={setIsLoading}
          />
        )
      } else {
        return <EducationLoading />
      }
    case "skills-and-courses":
      if (!isLoading && siteInfo) {
        return (
          <SkillsAndCourses
            siteInfo={siteInfo}
            valuesChanged={valuesChanged}
            setValuesChanged={setValuesChanged}
            setSiteInfo={updateSiteInfo}
            setIsLoading={setIsLoading}
          />
        )
      } else {
        return <SkillsAndCoursesLoading />
      }
    case "projects":
      if (!isLoading && siteInfo) {
        return (
          <Projects
            siteInfo={siteInfo}
            valuesChanged={valuesChanged}
            setValuesChanged={setValuesChanged}
            setSiteInfo={updateSiteInfo}
            setIsLoading={setIsLoading}
          />
        )
      } else {
        return <ProjectsLoading />
      }
    case "certificates":
      if (!isLoading && siteInfo) {
        return (
          <Certificates
            siteInfo={siteInfo}
            valuesChanged={valuesChanged}
            setValuesChanged={setValuesChanged}
            setSiteInfo={updateSiteInfo}
            setIsLoading={setIsLoading}
          />
        )
      } else {
        return <CertificatesLoading />
      }
  }
}
