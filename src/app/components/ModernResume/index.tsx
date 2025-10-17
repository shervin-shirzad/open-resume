"use client";
import { useState, useMemo } from "react";
import { ResumeIframeCSR } from "components/Resume/ResumeIFrame";
import { ResumePDF } from "components/Resume/ResumePDF";
import {
  ResumeControlBarCSR,
  ResumeControlBarBorder,
} from "components/Resume/ResumeControlBar";
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

/**
 * ModernResume Component
 * نمایش رزومه به سبک کلاسیک ستونی
 */
export const ModernResume = () => {
  const [scale, setScale] = useState(0.8);
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
      <div className="relative flex justify-center md:justify-start">
        <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        <div className="relative">
          <section
            className="
              h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))]
              overflow-y-auto md:p-[var(--resume-padding)]
              bg-white shadow-md rounded-lg
            "
          >
            <ResumeIframeCSR
              documentSize={settings.documentSize}
              scale={scale}
              enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
            >
              <div
                className="flex flex-col items-start gap-6 px-10 py-8 text-gray-800"
                 import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
                  style={{
                    fontFamily: settings.fontFamily,
                    color: settings.themeColor || DEFAULT_FONT_COLOR,
                  }}

              >
                {/* ستون اول - اطلاعات شخصی */}
                <div className="w-full border-b pb-4">
                  <h1 className="text-3xl font-bold">
                    {resume.profile.name || "Your Name"}
                  </h1>
                  <p className="text-lg">
                    {resume.profile.title || "Your Job Title"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {resume.profile.email || "email@example.com"} •{" "}
                    {resume.profile.phone || "+123456789"}
                  </p>
                </div>

                {/* ستون دوم - درباره من */}
                {resume.summary && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">About Me</h2>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {resume.summary}
                    </p>
                  </div>
                )}

                {/* تجربه کاری */}
                {resume.experience?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Experience</h2>
                    <div className="flex flex-col gap-3">
                      {resume.experience.map((exp, i) => (
                        <div key={i}>
                          <p className="font-medium">{exp.position}</p>
                          <p className="text-sm text-gray-600">
                            {exp.company} • {exp.startDate} – {exp.endDate}
                          </p>
                          <p className="text-sm mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* مهارت‌ها */}
                {resume.skills?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Skills</h2>
                    <ul className="flex flex-wrap gap-2 text-sm">
                      {resume.skills.map((skill, i) => (
                        <li
                          key={i}
                          className="bg-gray-100 px-2 py-1 rounded-md"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* تحصیلات */}
                {resume.education?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    {resume.education.map((edu, i) => (
                      <div key={i} className="mb-2">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm text-gray-600">
                          {edu.school} • {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ResumeIframeCSR>
          </section>

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
