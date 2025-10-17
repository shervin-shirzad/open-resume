import { useState, ChangeEvent } from "react";
import { ResumePDFProfile } from "components/Resume/ResumePDF/ResumePDFProfile";
import type { ResumeProfile } from "lib/redux/types";

export const ProfileForm = () => {
  const [profile, setProfile] = useState<ResumeProfile>({
    name: "",
    email: "",
    phone: "",
    url: "",
    location: "",
    summary: "",
    avatar: "", // مسیر Base64 تصویر
  });

  // وقتی کاربر تصویر انتخاب می‌کند
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        avatar: reader.result as string, // Base64 تصویر
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>اطلاعات پروفایل</h2>

      {/* فیلد نام */}
      <input
        type="text"
        placeholder="نام"
        value={profile.name}
        onChange={(e) =>
          setProfile((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      {/* فیلد ایمیل */}
      <input
        type="email"
        placeholder="ایمیل"
        value={profile.email}
        onChange={(e) =>
          setProfile((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      {/* آپلود تصویر */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {profile.avatar && (
        <div>
          <p>پیش‌نمایش تصویر:</p>
          <img
            src={profile.avatar}
            alt="Profile Preview"
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
        </div>
      )}

      {/* نمایش رزومه PDF */}
      <ResumePDFProfile
        profile={profile}
        themeColor="#2a9d8f"
        isPDF={false} // در فرم پیش‌نمایش
      />
    </div>
  );
};
