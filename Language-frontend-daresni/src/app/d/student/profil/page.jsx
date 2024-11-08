import React from "react";
import StudentProfile from "./_components/StudentProfile";

export default function page() {
  return (
    <div>
      <div className="w-fit max-w-full p-8 bg-white rounded-xl flex flex-wrap">
        <StudentProfile />
      </div>
    </div>
  );
}
