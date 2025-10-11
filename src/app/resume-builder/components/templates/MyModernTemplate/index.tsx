// src/app/resume-builder/components/templates/MyModernTemplate/index.tsx
import React from "react";
import "./style.css";

type Props = {
  data: any; // داده‌های رزومه از OpenResume
};

export default function MyModernTemplate({ data }: Props) {
  const basics = data?.basics || {};
  const work = data?.work || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  return (
    <div className="modern-resume p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md font-sans text-gray-900">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">{basics.name}</h1>
        <p className="text-gray-600">{basics.label}</p>
        <p className="text-gray-500">{basics.email} · {basics.phone}</p>
      </header>

      {/* Summary */}
      {basics.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">{basics.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {work.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          {work.map((w: any, i: number) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between font-medium">
                <span>{w.position} — {w.company}</span>
                <span className="text-gray-500">{w.startDate} - {w.endDate || "Present"}</span>
              </div>
              {w.highlights && (
                <ul className="list-disc list-inside text-gray-700">
                  {w.highlights.map((h: string, j: number) => <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {education.map((e: any, i: number) => (
            <div key={i} className="flex justify-between text-gray-700">
              <span>{e.institution} — {e.studyType}</span>
              <span className="text-gray-500">{e.startDate} - {e.endDate}</span>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s: any, i: number) => (
              <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-gray-800 text-sm">{s.name || s}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
