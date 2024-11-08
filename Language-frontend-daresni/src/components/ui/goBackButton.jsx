"use client"
import { Data } from "@/app/signup/etudiant/data";
import Link from "next/link";
import {useRouter} from "next/navigation"

export default function GoBack({key , className}){
    
    const router = new useRouter();
    const dataManager = Data()
    const data =dataManager.getData();
    const handleClick = ()=>{ router.back()  }

    return(
        <>
        <div onClick={handleClick} className={`grid w-full mt-3 max-w-sm items-center ${className} text-nats`} >
          <div className="bg-white h-8 content-center text-[#9747FF] border-[2px] border-purple-border-added hover:border-purple-added hover:text-white hover:ring-1 hover:bg-purple-added inline-block px-4 py-2 rounded-sm text-center cursor-pointer">
          Retour
          </div>
        </div>
        </>
        
    )
}