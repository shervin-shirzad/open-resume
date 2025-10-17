import { Page, View, Document, Text } from "@react-pdf/renderer";
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
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: spacing[3],
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

          {/* ساختار دو ستونه با ارتفاع یکسان */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: spacing["full"],
              flexGrow: 1,
              minHeight: "100%",
            }}
          >
            {/* ستون چپ - اطلاعات پایه */}
            <View
              style={{
                flex: 1,
                maxWidth: "32%",
                backgroundColor: "#f8f8f8",
                padding: spacing[3],
                borderRight: `2px solid ${themeColor}`,
              }}
            >
              <ResumePDFProfile
                profile={profile}
                themeColor={themeColor}
                isPDF={isPDF}
                showSummary={false} // توضیحات درباره من به ستون راست منتقل شد
              />

              <View style={{ marginTop: spacing[3] }}>
                <ResumePDFSkills
                  heading={formToHeading["skills"]}
                  skills={skills}
                  themeColor={themeColor}
                  showBulletPoints={showBulletPoints["skills"]}
                />
              </View>

              {custom ? (
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

            {/* ستون راست - محتوای اصلی */}
            <View
              style={{
                flex: 2,
                padding: `${spacing[5]} ${spacing[6]}`,
                backgroundColor: "#ffffff",
              }}
            >
              {/* درباره من */}
              {profile.summary && (
                <View style={{ marginBottom: spacing[4] }}>
                  <Text
                    style={{
                      fontSize: fontSize,
                      fontFamily,
                      color: themeColor,
                      lineHeight: 1.4,
                    }}
                  >
                    {profile.summary}
                  </Text>
                </View>
              )}

              {/* تجربه کاری */}
              <ResumePDFWorkExperience
                heading={formToHeading["workExperiences"]}
                workExperiences={workExperiences}
                themeColor={themeColor}
              />

              {/* تحصیلات */}
              <View style={{ marginTop: spacing[4] }}>
                <ResumePDFEducation
                  heading={formToHeading["educations"]}
                  educations={educations}
                  themeColor={themeColor}
                  showBulletPoints={showBulletPoints["educations"]}
                />
              </View>

              {/* پروژه‌ها */}
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
