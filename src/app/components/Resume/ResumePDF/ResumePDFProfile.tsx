import { useState, ChangeEvent } from "react";
import { View, Image } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, summary, location, avatar } = profile;
  const iconProps = { email, phone, location, url };

  // فقط برای نمایش روی سایت: انتخاب تصویر جدید
  const [localAvatar, setLocalAvatar] = useState<string | undefined>(avatar);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setLocalAvatar(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ResumePDFSection style={{ marginTop: spacing["4"] }}>
      {/* بخش تصویر پروفایل */}
      <div style={{ marginBottom: "1rem" }}>
        {!isPDF && (
          <>
            <label
              style={{ fontWeight: "bold", display: "block", marginBottom: 4 }}
            >
              تصویر پروفایل
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </>
        )}
        {(localAvatar || avatar) && (
          isPDF ? (
            <Image
              src={avatar || localAvatar}
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
          ) : (
            <img
              src={localAvatar || avatar}
              alt="Profile"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ccc",
                marginTop: 8,
              }}
            />
          )
        )}
      </div>

      <ResumePDFText
        bold={true}
        themeColor={themeColor}
        style={{ fontSize: "20pt" }}
      >
        {name}
      </ResumePDFText>
      {summary && <ResumePDFText>{summary}</ResumePDFText>}

      <View
        style={{
          ...styles.flexRowBetween,
          flexWrap: "wrap",
          marginTop: spacing["0.5"],
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null;

          let iconType = key as IconType;
          if (key === "url") {
            if (value.includes("github")) {
              iconType = "url_github";
            } else if (value.includes("linkedin")) {
              iconType = "url_linkedin";
            }
          }

          const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;

            let src = "";
            switch (key) {
              case "email": src = `mailto:${value}`; break;
              case "phone": src = `tel:${value.replace(/[^\d+]/g, "")}`; break;
              default: src = value.startsWith("http") ? value : `https://${value}`;
            }

            return <ResumePDFLink src={src} isPDF={isPDF}>{children}</ResumePDFLink>;
          };

          return (
            <View key={key} style={{ ...styles.flexRow, alignItems: "center", gap: spacing["1"] }}>
              <ResumePDFIcon type={iconType} isPDF={isPDF} />
              <Wrapper>
                <ResumePDFText>{value}</ResumePDFText>
              </Wrapper>
            </View>
          );
        })}
      </View>
    </ResumePDFSection>
  );
};
