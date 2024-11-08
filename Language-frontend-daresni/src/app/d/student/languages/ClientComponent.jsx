'use client';

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function ClientComponent({ checkpoint, languages }) {
  const router = useRouter();



  return (
    <div>
      <div className="flex gap-3 flex-wrap items-center justify-between mb-8">
        <h1 className="font-bold text-xl">Liste des langues</h1>
      </div>
      <hr />
      <Table>
        <TableCaption>La liste des langues</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Langue</TableHead>
            <TableHead>Sujet</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {languages?.map((item) => (
            <TableRow key={item.idLang}>
              <TableCell>{item.language}</TableCell>
              <TableCell>{item.linguistic}</TableCell>
              <TableCell className="text-right flex justify-end gap-4">
                <Link href={{
                   pathname :`/d/student/languages/${item.idLang}`,
                   query : {language : item.language , level : item.levelName }
                   }}>
                  <Button variant="link">Passer examen</Button>
                </Link>
                <Link href={`/languages/${item.idLang}/${item.currentStep}`}>
                  <Button>Learn</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
