"use client";
import { useEffect, useState } from "react";
import {Card,CardContent} from "@/components/ui/card"
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import academic_student from "../images/academic_student.png";
import languages_studies from "../images/languages_studies.png";
import tutor_student from "../images/tutor_student.png";
import young_women from "../images/young-woman-holding-tablet-white_114579-76708 1.png";
import Footer from "../Footer";
export default function ServicesSection() {
  const serviceImages = [tutor_student, languages_studies, academic_student];

  const initialLessonCounts = [0, 0, 0];
  const [lessonCounts, setLessonCounts] = useState(initialLessonCounts);

  useEffect(() => {
    // Fonction pour récupérer le nombre de leçons pour chaque cours depuis la base de données
    async function fetchLessonCounts() {
      try {
        const counts = await Promise.all([
          getLessonCountForCourse("Tutor student"),
          getLessonCountForCourse("Academic studies"),
          getLessonCountForCourse("Languages Studies"),
        ]);
        setLessonCounts(counts);
      } catch (error) {
        console.error("Error fetching lesson counts:", error);
      }
    }

    fetchLessonCounts();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center space-x-36  mb-12">
          <StepCard icon={<LaptopIcon />} text="Choisissez une langue" />
          <StepArrow />
          <StepCard icon={<SchoolIcon />} text="Commencer à apprendre" />
          <StepArrow />
          <StepCard icon={<RepeatIcon />} text="Continuer" />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
function StepCard({ icon, text }) {
  return (
    <div className="text-center">
      {icon}
      <p>{text}</p>
    </div>
  );
}

function StepArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-purple-600"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12 mb-2 mx-auto"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12 mb-2 mx-auto"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12 mb-2 mx-auto"
    >
      <path d="m4 6 8-4 8 4" />
      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 5v17" />
      <path d="M6 5v17" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  );
}

