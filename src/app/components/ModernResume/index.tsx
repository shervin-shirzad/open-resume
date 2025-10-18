"use client";
import { useMemo } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { ResumePDF } from "components/ModernResume/ResumePDF"; // قالب جدید تو
import type { Resume } from "lib/redux/types";
import type { Settings } from "lib/redux/settingsSlice";

interface Props {
  resume: Resume;
  settings: Settings;
}

/**
 * این کامپوننت رزومه را در قالب مدرن (Modern Resume) رندر می‌کند.
 * در واقع این همان چیزی است که در صفحه‌ی رزومه‌ساز (resume-builder/page.tsx) ایمپورت می‌شود.
 */
export const Resume = ({ resume, settings }: Props) => {
  const pdf = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={false} />,
    [resume, settings]
  );

  return (
    <div style={{ width: "100%", height: "100%", background: "#f9f9f9" }}>
      <PDFViewer width="100%" height="100%">
        {pdf}
      </PDFViewer>
    </div>
  );
};

// 👇 این خط باعث می‌شود در فایل page.tsx بتوانی بنویسی:
// import { Resume as ModernResume } from "components/ModernResume";
export { Resume };
