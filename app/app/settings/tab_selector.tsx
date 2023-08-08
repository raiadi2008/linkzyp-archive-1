import { ISite } from "@/utils/interfaces"
import { Dispatch, SetStateAction } from "react"

import ProfileSettings from "@/components/settings/profile/profile"
import WorkExperience from "@/components/settings/work-experience/work-experience"
import Education from "@/components/settings/education/education"
import SkillsAndCourses from "@/components/settings/skills-and-courses/skills-and-courses"
import Projects from "@/components/settings/projects/projects"
import Certificates from "@/components/settings/cetificates/certificates"

export default function CurrentSettingsSection(
  tab: string | null,
  siteInfo: ISite | null,
  setValuesChanged: Dispatch<SetStateAction<boolean>>,
  updateSiteInfo: Dispatch<SetStateAction<ISite | null>>
) {
  switch (tab) {
    case "profile":
      if (siteInfo) {
        return (
          <ProfileSettings
            siteInfo={siteInfo}
            setValuesChanged={setValuesChanged}
            updateSiteInfo={updateSiteInfo}
          />
        )
      } else {
        return <div>Loading...</div>
      }
    case "experience":
      if (siteInfo) {
        return (
          <WorkExperience
            setValuesChanged={setValuesChanged}
            siteInfo={siteInfo}
            updateSiteInfo={updateSiteInfo}
          />
        )
      } else {
        return <div>Loading...</div>
      }
    case "education":
      if (siteInfo) {
        return (
          <Education
            setValuesChanged={setValuesChanged}
            siteInfo={siteInfo}
            updateSiteInfo={updateSiteInfo}
          />
        )
      } else {
        return <div>Loading...</div>
      }
    case "skills-and-courses":
      if (siteInfo) {
        return (
          <SkillsAndCourses
            setValuesChanged={setValuesChanged}
            siteInfo={siteInfo}
            updateSiteInfo={updateSiteInfo}
          />
        )
      } else {
        return <div>Loading...</div>
      }
    case "projects":
      if (siteInfo) {
        return (
          <Projects
            setValuesChanged={setValuesChanged}
            siteInfo={siteInfo}
            updateSiteInfo={updateSiteInfo}
          />
        )
      } else {
        return <div>Loading...</div>
      }
    case "certificates":
      if (siteInfo) {
        return (
          <Certificates
            setValuesChanged={setValuesChanged}
            siteInfo={siteInfo}
            updateSiteInfo={updateSiteInfo}
          />
        )
      } else {
        return <div>Loading...</div>
      }
  }
}
