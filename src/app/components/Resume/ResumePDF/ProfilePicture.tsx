// src/app/components/Resume/ResumePDF/ProfilePicture.tsx
import { useState, ChangeEvent } from "react";

interface ProfilePictureProps {
  avatar?: string; // Base64 یا URL تصویر موجود
  onChange?: (base64: string) => void; // وقتی تصویر آپلود شد
}

export const ProfilePicture = ({ avatar, onChange }: ProfilePictureProps) => {
  const [preview, setPreview] = useState<string | undefined>(avatar);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange?.(result); // Base64 را به والد ارسال می‌کنیم
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "inline-block",
          marginBottom: "0.5rem",
          fontWeight: "bold",
        }}
      >
        تصویر پروفایل
      </label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      {preview && (
        <div style={{ marginTop: "0.5rem" }}>
          <img
            src={preview}
            alt="Profile Preview"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ccc",
            }}
          />
        </div>
      )}
    </div>
  );
};
