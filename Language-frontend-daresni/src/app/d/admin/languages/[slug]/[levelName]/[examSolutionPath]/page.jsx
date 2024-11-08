"use client"
import { Button } from 'antd';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export const displayFile = async (examSolutionPath) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response;
};


export default function FileDisplay({params}){

  const searchParams = useSearchParams();
  const fileUrl = `http://localhost:8090/file/display/${params.examSolutionPath}`

  const renderFile = () => {
    if (!fileUrl) {
     return <p>Loading...</p>;
    }
    return <iframe src={fileUrl} width="100%" height="600px"></iframe>;
  };

  return (
      <div>
        <h1 className="font-bold text-2xl mb-2">
        Solution D'Examen de {searchParams.get("language")} - Niveau {params.levelName}
        </h1>
        
        {renderFile()}
        <div style={{ marginTop: '20px' }}>
         <div className="flex justify-between">
          <Button href={`http://localhost:8090/file/download/${params.examSolutionPath}`}  download className="btn btn-primary">Download File</Button>
          <Button href={fileUrl} target="_blank" rel="noopener noreferrer" className=" btn btn-primary btn-start rounded">Open File in browser</Button>
         </div>
        </div>
      </div>
)
    
  
};

