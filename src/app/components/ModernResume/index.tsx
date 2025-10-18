import { Page, View, Document } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import { ResumePDFProfile } from "components/Resume/ResumePDF/ResumePDFProfile";
import { ResumePDFWorkExperience } from "components/Resume/ResumePDF/ResumePDFWorkExperience";
import { ResumePDFEducation } from "components/Resume/ResumePDF/ResumePDFEducation";
import { ResumePDFProject } from "components/Resume/ResumePDF/ResumePDFProject";
import { ResumePDFSkills } from "components/Resume/ResumePDF/ResumePDFSkills";
import { ResumePDFCustom } from "components/Resume/ResumePDF/ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { SuppressResumePDFErrorMessage } from "components/Resume/ResumePDF/common/SuppressResumePDFErrorMessage";

export const ResumePDFTemplate14 = ({
  resume,
  settings,
  isPDF = false,
}: {
  resume: Resume;
  settings: Settings;
  isPDF?: boolean;
}) => {
  const { profile, workExperiences, educations, projects, skills, custom } =
    resume;

  const {
    fontFamily,
    fontSize,
    documentSize,
    formToHeading,
    formToShow,
    formsOrder,
    showBulletPoints,
    themeColor = DEFAULT_FONT_COLOR,
  } = settings;

  const showFormsOrder = formsOrder.filter((form) => formToShow[form]);

  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
    workExperiences: () => (
      <ResumePDFWorkExperience
        heading={formToHeading["workExperiences"]}
        workExperiences={workExperiences}
        themeColor={themeColor}
      />
    ),
    educations: () => (
      <ResumePDFEducation
        heading={formToHeading["educations"]}
        educations={educations}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["educations"]}
      />
    ),
    projects: () => (
      <ResumePDFProject
        heading={formToHeading["projects"]}
        projects={projects}
        themeColor={themeColor}
      />
    ),
    skills: () => (
      <ResumePDFSkills
        heading={formToHeading["skills"]}
        skills={skills}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["skills"]}
      />
    ),
    custom: () => (
      <ResumePDFCustom
        heading={formToHeading["custom"]}
        custom={custom}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["custom"]}
      />
    ),
  };

  return (
    <>
      <Document
        title={`${profile.name} Resume`}
        author={profile.name}
        producer="OpenResume"
      >
        <Page
          size={documentSize === "A4" ? "A4" : "LETTER"}
          style={{
            ...styles.flexCol,
            fontFamily,
            fontSize: fontSize + "pt",
            color: DEFAULT_FONT_COLOR,
          }}
        >
          {/* HEADER */}
          <View
            style={{
              backgroundColor: themeColor,
              color: "white",
              padding: spacing[6],
            }}
          >
            <ResumePDFProfile
              profile={profile}
              themeColor="white"
              isPDF={isPDF}
            />
          </View>

          {/* MAIN CONTENT */}
          <View
            style={{
              flexDirection: "row",
              padding: spacing[10],
              gap: spacing[8],
            }}
          >
            {/* LEFT COLUMN */}
            <View
              style={{
                width: "65%",
                paddingRight: spacing[6],
                borderRightWidth: 1,
                borderRightColor: themeColor,
              }}
            >
              {showFormsOrder.map((form) => {
                const Component = formTypeToComponent[form];
                if (["workExperiences", "projects", "custom"].includes(form)) {
                  return <Component key={form} />;
                }
                return null;
              })}
            </View>

            {/* RIGHT COLUMN */}
            <View
              style={{
                width: "35%",
                paddingLeft: spacing[6],
              }}
            >
              {educations?.length > 0 && (
                <ResumePDFEducation
                  heading={formToHeading["educations"]}
                  educations={educations}
                  themeColor={themeColor}
                  showBulletPoints={showBulletPoints["educations"]}
                />
              )}
              {skills?.length > 0 && (
                <ResumePDFSkills
                  heading={formToHeading["skills"]}
                  skills={skills}
                  themeColor={themeColor}
                  showBulletPoints={showBulletPoints["skills"]}
                />
              )}
            </View>
          </View>
        </Page>
      </Document>
      <SuppressResumePDFErrorMessage />
    </>
  );
};
