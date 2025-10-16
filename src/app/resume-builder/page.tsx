"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";
import { Resume as ModernResume } from "components/ModernResume";

export default function Create() {
  const [template, setTemplate] = useState("default");

  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        {/* انتخاب قالب */}
        <div className="p-4 bg-white border-b">
          <label className="mr-2 font-medium">انتخاب قالب:</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="border rounded-md p-1"
          >
            <option value="default">قالب پیش‌فرض</option>
            <option value="modern">قالب مدرن</option>
          </select>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-3">
            <ResumeForm />
          </div>

          <div className="col-span-3">
            {template === "default" ? <Resume /> : <ModernResume />}
          </div>
        </div>
      </main>
    </Provider>
  );
}
