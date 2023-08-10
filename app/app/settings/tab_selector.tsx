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

export default function CurrentSettingsSection(
  tab: string | null,
  siteInfo: ISite | null,
  setValuesChanged: Dispatch<SetStateAction<boolean>>,
  updateSiteInfo: Dispatch<SetStateAction<ISite | null>>
) {
  switch (tab) {
    case "profile":
      if (siteInfo) {
        return <ProfileSettings siteInfo={siteInfo} />
      } else {
        return <ProfileSettingsLoading />
      }
    case "experience":
      if (siteInfo) {
        return <WorkExperience siteInfo={siteInfo} />
      } else {
        return <WorkExperienceLoading />
      }
    case "education":
      if (siteInfo) {
        return <Education siteInfo={siteInfo} />
      } else {
        return <EducationLoading />
      }
    case "skills-and-courses":
      if (siteInfo) {
        return <SkillsAndCourses siteInfo={siteInfo} />
      } else {
        return <SkillsAndCoursesLoading />
      }
    case "projects":
      if (siteInfo) {
        return <Projects siteInfo={siteInfo} />
      } else {
        return <ProjectsLoading />
      }
    case "certificates":
      if (siteInfo) {
        return <Certificates siteInfo={siteInfo} />
      } else {
        return <div>Loading...</div>
      }
  }
}
