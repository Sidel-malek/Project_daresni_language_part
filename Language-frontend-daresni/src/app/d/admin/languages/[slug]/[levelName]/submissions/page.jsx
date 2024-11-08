"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSubmissions , upGradeStudent } from "@/actions/client/language";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaLink } from "react-icons/fa";
import { useEffect,useState  } from "react";
import { useRouter } from "next/navigation";


export default function page({params}) {
  const router = useRouter();

  async function passClick (idLang  ,idStudent){
    try {
      const responseData = await upGradeStudent(idLang  ,idStudent );
     // console.log(responseData);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
    
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const responseData = await getSubmissions(params.slug , params.levelName);
        setSubmissions(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataFromApi();
  }, []); 

  return (
    <div>
      <h1 className="font-bold text-xl mb-8">Liste des soumissions</h1>
      <hr />
      <Table>
        <TableCaption>La liste des soumissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Etudiant</TableHead>
            <TableHead>Sujet</TableHead>
            <TableHead>Niveau</TableHead>
            <TableHead>Document</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions?.map((item) => (
            <TableRow key={item.idStudent}>
              <TableCell className="font-medium flex gap-2 items-center">
                <Avatar className="h-[42px] w-[42px]">
                  <AvatarImage src={item.image} alt="profile image" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <p>{item.name}</p>
                  <p className="text-xs text-gray-400">{item.email}</p>
                </div>
              </TableCell>
              <TableCell>{item.linguistic}</TableCell>
              <TableCell>{item.levelName}</TableCell>

              <TableCell >
                <Link
                 href={
                  { pathname :item.examnSolutionPath,
                    query : {
                      language : item.language,
                   }}
                   }
                  _target="_blank"
                  className="flex gap-2 text-blue items-center"
                >
                  <FaLink /> Lire le document
                </Link>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button onClick = {()=>passClick(params.slug ,item.idStudent)} className="bg-green-500 hover:bg-green-600">
                  Pass
                </Button>
                <Button variant="destructive">Fail</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
