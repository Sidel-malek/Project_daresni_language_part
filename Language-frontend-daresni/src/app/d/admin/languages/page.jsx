"use client";
import React, { useEffect, useState } from "react";
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
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getLevels } from "@/actions/client/language";

export default function Page() {
  const router = useRouter();
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const responseData = await getLevels();
        setLanguages(responseData || []);  // Fallback to empty array
      } catch (error) {
        console.error("Failed to fetch languages:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <div>
      <div className="flex gap-3 flex-wrap items-center justify-between mb-8">
        <h1 className="font-bold text-xl">Liste des langues</h1>
        <Link href="/d/admin/languages/new">
          <Button className="gap-2">
            <FaPlus /> Ajouter
          </Button>
        </Link>
      </div>
      <hr />
      <Table>
        <TableCaption>La liste des langues</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Langue</TableHead>
            <TableHead>Niveau</TableHead>
            <TableHead>Sujet</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {languages.map((item) => (
            <TableRow key={item.idLang}>
              <TableCell>{item.language}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.linguistic}</TableCell>
              <TableCell className="text-right flex justify-end gap-4">
                <Link href={`/d/admin/languages/${item.idLang}/${item.name}/submissions`} aria-disabled>
                  <Button variant="link" className="px-0">
                    Submissions
                  </Button>
                </Link>
                <Link href={`/d/admin/languages/${item.idLang}?levelName=${item.name}`}>
                  <Button>Modifier</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
