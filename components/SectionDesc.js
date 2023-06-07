import React from "react";

export default function SectionDesc({ text, icon, desc }) {
  return (
    <div className="p-5">
      <div
        className={`bg-yellow-400 ${
          text == "Make Comment" ? "w-[240px]" : "w-[160px]"
        } shaped p-1 flex items-center justify-center`}
      >
        {icon}
        <h2 className="text-xl font-semibold ml-3">{text}</h2>
      </div>
      <span className="text-xs text-gray-500">{desc}</span>
    </div>
  );
}
