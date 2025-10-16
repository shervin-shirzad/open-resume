"use client";
import { useState, useMemo } from "react";
import { ResumeIframeCSR } from "components/ModernResume/ResumeIFrame";
import { ResumePDF } from "components/ModernResume/ResumePDF";
import {
  ResumeControlBarCSR,
  ResumeControlBarBorder,
} from "components/ModernResume/ResumeControlBar";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { useAppSelector } from "lib/redux/hooks";
import { selectResume } from "lib/redux/resumeSlice";
import { selectSettings } from "lib/redux/settingsSlice";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "components/fonts/hooks";
import { NonEnglishFontsCSSLazyLoader } from "components/fonts/NonEnglishFontsCSSLoader";

export const CreativeResume = () => {
  const [scale, setScale] = useState(0.85);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);

  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);

  return (
    <>
      <NonEnglishFontsCSSLazyLoader />

      {/* ظاهر متفاوت با Flex عمودی، پس‌زمینه رنگی و padding بیشتر */}
      <div className="relative flex flex-col md:flex-row justify-center items-start bg-gradient-to-b from-purple-50 to-purple-100 min-h-[100vh]">
        <FlexboxSpacer maxWidth={40} className="hidden md:block" />

        {/* ستون اصلی رزومه با حاشیه و سایه */}
        <div className="relative w-full md:w-3/4 p-8 bg-white shadow-xl rounded-xl">
          <section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))] overflow-auto">
            <ResumeIframeCSR
              documentSize={settings.documentSize}
              scale={scale}
              enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
            >
              <ResumePDF
                resume={resume}
                settings={settings}
                isPDF={DEBUG_RESUME_PDF_FLAG}
              />
            </ResumeIframeCSR>
          </section>

          {/* کنترل بار مثل قالب پیش‌فرض */}
          <ResumeControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize}
            document={document}
            fileName={resume.profile.name + " - Resume"}
          />
        </div>

        <ResumeControlBarBorder />
      </div>
    </>
  );
};
