import { Page, View, Document } from "@react-pdf/renderer";
import { styles, spacing } from "components/ModernResume/ResumePDF/styles";
import { ResumePDFProfile } from "components/ModernResume/ResumePDF/ResumePDFProfile";
import { ResumePDFWorkExperience } from "components/ModernResume/ResumePDF/ResumePDFWorkExperience";
import { ResumePDFEducation } from "components/ModernResume/ResumePDF/ResumePDFEducation";
import { ResumePDFProject } from "components/ModernResume/ResumePDF/ResumePDFProject";
import { ResumePDFSkills } from "components/ModernResume/ResumePDF/ResumePDFSkills";
import { ResumePDFCustom } from "components/ModernResume/ResumePDF/ResumePDFCustom";
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
import type { Settings, ShowForm } from "lib/redux/settingsSlice";
import type { Resume } from "lib/redux/types";
import { SuppressResumePDFErrorMessage } from "components/ModernResume/ResumePDF/common/SuppressResumePDFErrorMessage";

export const ResumePDF = ({
  resume,
  settings,
  isPDF = false,
}: {
  resume: Resume;
  settings: Settings;
  isPDF?: boolean;
}) => {
  const { profile, workExperiences, educations, projects, skills, custom } = resume;
  const { name } = profile;
  const {
    fontFamily,
    fontSize,
    documentSize,
    formToHeading,
    showBulletPoints,
  } = settings;
  const themeColor = settings.themeColor || DEFAULT_FONT_COLOR;

  return (
    <>
      <Document title={`${name} Resume`} author={name} producer="OpenResume">
        <Page
          size={documentSize === "A4" ? "A4" : "LETTER"}
          style={{
            ...styles.flexCol,
            color: DEFAULT_FONT_COLOR,
            fontFamily,
            fontSize: fontSize + "pt",
          }}
        >
          {/* نوار رنگی بالای صفحه */}
          {Boolean(settings.themeColor) && (
            <View
              style={{
                width: spacing["full"],
                height: spacing[3.5],
                backgroundColor: themeColor,
              }}
            />
          )}

          {/* ساختار دو ستونه */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: spacing["full"],
              flexGrow: 1,
            }}
          >
            {/* ستون چپ */}
            <View
              style={{
                width: "32%",
                backgroundColor: "#f8f8f8",
                padding: spacing[3],
                borderRight: `2px solid ${themeColor}`,
              }}
            >
              <ResumePDFProfile
                profile={profile}
                themeColor={themeColor}
                isPDF={isPDF}
              />

              <View style={{ marginTop: spacing[3] }}>
                <ResumePDFSkills
                  heading={formToHeading["skills"]}
                  skills={skills}
                  themeColor={themeColor}
                  showBulletPoints={showBulletPoints["skills"]}
                />
              </View>

              {custom?.length ? (
                <View style={{ marginTop: spacing[3] }}>
                  <ResumePDFCustom
                    heading={formToHeading["custom"]}
                    custom={custom}
                    themeColor={themeColor}
                    showBulletPoints={showBulletPoints["custom"]}
                  />
                </View>
              ) : null}
            </View>

            {/* ستون راست */}
            <View
              style={{
                width: "68%",
                padding: `${spacing[5]} ${spacing[6]}`,
                backgroundColor: "#ffffff",
              }}
            >
              <ResumePDFWorkExperience
                heading={formToHeading["workExperiences"]}
                workExperiences={workExperiences}
                themeColor={themeColor}
              />

              <View style={{ marginTop: spacing[4] }}>
                <ResumePDFEducation
                  heading={formToHeading["educations"]}
                  educations={educations}
                  themeColor={themeColor}
                  showBulletPoints={showBulletPoints["educations"]}
                />
              </View>

              {projects?.length ? (
                <View style={{ marginTop: spacing[4] }}>
                  <ResumePDFProject
                    heading={formToHeading["projects"]}
                    projects={projects}
                    themeColor={themeColor}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </Page>
      </Document>

      <SuppressResumePDFErrorMessage />
    </>
  );
};
