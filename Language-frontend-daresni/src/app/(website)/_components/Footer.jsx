import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-[-25px] bg-light-gray py-2 w-full">
  <div className="md:pt-2 md:mr-[775px] md:ml-32">
    <div className="flex flex-col md:flex-row justify-between items-center mb-2">
      <span className="text-sm text-black md:mb-0">
        © 2012-2024 Daresni Inc.
      </span>
      <div className="flex flex-col md:flex-row items-center md:ml-auto">
        <a className="underline text-sm mb-2 md:mr-4  md:mb-0" href="#">
          Legal center
        </a>
        <a className="underline text-sm" href="#">
          Privacy policy
        </a>
      </div>
    </div>
  </div>
</footer>

  );
}
