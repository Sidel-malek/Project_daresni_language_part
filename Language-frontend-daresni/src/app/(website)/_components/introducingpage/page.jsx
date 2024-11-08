"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import TuttoringImage from "../images/TutoringIllustration.svg";
import { useState, useEffect } from "react"; // Ajout de l'importation useState
import "./buttonanimation.css";
import Footer from "../Footer";

export default function IntroductionSection() {
  const [statistics, setStatistics] = useState({
    tutors: 0,
    students: 0,
    subjects: 0,
  });

  return (
    <div>
    <div key="1" className="bg-white">
      <header>
        <div className="max-w-7xl md:ml-28 px-4 py-12 flex flex-col md:flex-row justify-between items-center">
          <div className="max-w-lg text-center md:text-left md:mr-16">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-purple-added">
              Dévoilez votre potentiel
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
             et améliorez Votre Langage avec Nous.
            </h1>
            <p className="mt-6 text-gray-600">
            Améliorez votre langage à votre rythme avec notre plateforme en ligne
            </p>

            <Button className=" w-64 mt-8">
              <Link href={`/signin`}>Commencer maintenant</Link>
            </Button>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              alt="Tutoring illustration"
              className="w-full md:w-auto"
              height="auto"
              src={TuttoringImage}
              objectFit="cover"
              width="400"
            />
          </div>
        </div>
      </header>
    </div>

  </div>
  
  );
}
