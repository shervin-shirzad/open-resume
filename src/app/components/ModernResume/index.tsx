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

export const ModernResume = () => {
  const [scale, setScale] = useState(0.9);
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

      {/* پس‌زمینه با گرادینت و لایه محو */}
      <div className="relative flex flex-col items-center justify-center min-h-[100vh] bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-10" />

        {/* کارت رزومه */}
        <div className="relative w-[90%] md:w-[70%] lg:w-[60%] bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transition-transform hover:scale-[1.01] duration-500">
          {/* بخش نمایش رزومه */}
          <section className="max-h-[calc(100vh-180px)] overflow-auto p-6 md:p-8">
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

          {/* کنترل بار در پایین */}
          <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 sticky bottom-0">
            <ResumeControlBarCSR
              scale={scale}
              setScale={setScale}
              documentSize={settings.documentSize}
              document={document}
              fileName={resume.profile.name + " - Modern Resume"}
            />
          </div>
        </div>

        <FlexboxSpacer maxWidth={60} className="hidden md:block" />
        <ResumeControlBarBorder />
      </div>
    </>
  );
};
