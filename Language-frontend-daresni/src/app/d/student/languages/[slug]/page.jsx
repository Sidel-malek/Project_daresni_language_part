"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { displayFile, uploadFile } from "@/actions/client/language";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import _axios from "@/lib/axios-config";
import { _fetchWithToken } from "@/lib/fetch-api";
import { useRouter } from "next/navigation";


export default function Page({ params }) {
  const searchParams = useSearchParams();
  const [examen, setExamen] = useState();
  const router = useRouter();

  const [fileUrl, setFileUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    const fetchAndDisplayFile = async () => {
      const response = await displayFile(params.slug);
      setFileUrl(response);
    };
    fetchAndDisplayFile();
  }, [params.slug]);

  const uploadExamen = (event) => {
    setExamen(event.target.files[0]);

  };
  const onSubmit = async () => {

    try{
      const formData = new FormData();
      formData.append('solutionFile', examen);
      const response = await uploadFile(params.slug ,formData )
      console.log(response)

   //   router.push('/d/student/languages')
    }catch(err){
      console.log(err);
    }
  }

  /*const downLoadExam = async () => {
    try{
      await _fetchWithToken(`http://localhost:8090/student/${params.slug}/downloadExam`);
    }catch(err){
      console.log(err);
    }
  }
  <Button onClick={downLoadExam} className="btn btn-white">Download File </Button> 
  <Link href={fileUrl} target="_blank" rel="noopener noreferrer" >
     <Button className=" btn  btn-start rounded">Open File in browser </Button> 
  </Link>*/
  return (
    <>
      <h1 className="font-bold text-2xl">
        Examen de {searchParams.get("language")} - Niveau {searchParams.get("level")}
      </h1>
      <div className="grid lg:grid-cols-2 gap-12 mt-8">
        <div className="w-full h-auto aspect-[21/29]">
          {fileUrl ? (
            <iframe src={fileUrl} className="w-full" height="600px" />
          ) : (
            <p>Loading...</p>
          )}
          <div style={{ marginTop: '20px' }}>
         <div className="flex justify-between">
         
         </div>
        </div>
        </div>
        <div className="space-y-4">
          <form className="space-y-3">
            <div className="relative border border-black border-dashed rounded-lg w-full py-16">
              <Input
                type="file"
                className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                id="file"
                name="file"
                onChange={uploadExamen}
              />
              <label htmlFor="file" className="cursor-pointer block mt-3">
                <span className="text-black flex items-center justify-center">
                  <FiUpload  className="mr-2" /> 
                  {examen ? (
                             <div>{examen.name}</div> 
                           ) : (
                            <div>Importez l'examen</div>                   
  
                     )}
                </span>
              </label>
            </div>
            <div className="text-right">
              <Button onClick={onSubmit} className="px-12">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
