// components/Resume/Templates/ModernTemplate.tsx
import { ResumePDFProps } from "../ResumePDF";

export const ModernTemplate = ({ resume, settings, isPDF }: ResumePDFProps) => {
  return (
    <div style={{
      fontFamily: settings.fontFamily,
      color: settings.primaryColor,
      padding: "20px",
      lineHeight: 1.5,
    }}>
      <header style={{ borderBottom: `2px solid ${settings.primaryColor}`, marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", margin: 0 }}>{resume.profile.name}</h1>
        <p style={{ fontSize: "16px", margin: 0 }}>{resume.profile.title}</p>
      </header>

      <section>
        <h2 style={{ color: settings.secondaryColor }}>Experience</h2>
        {resume.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <h3 style={{ margin: 0 }}>{exp.position}</h3>
            <p style={{ margin: 0 }}>{exp.company} | {exp.startDate} - {exp.endDate || "Present"}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ color: settings.secondaryColor }}>Education</h2>
        {resume.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <h3 style={{ margin: 0 }}>{edu.degree}</h3>
            <p style={{ margin: 0 }}>{edu.institution} | {edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
