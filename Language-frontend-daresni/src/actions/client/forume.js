"use server"

import axios from "axios";
import { cookies } from "next/headers";
import _axios from "@/lib/axios-config";

const cookieStore = cookies();


//get forume by session id
export const getForumeBYIdSession=async(idS) =>{
    try{
      const res=await _axios.get(`http://localhost:3030/forum/getForum/${idS}`)
      console.log(res.data)
      return res.data
    }catch(err){
      console.log(err)
    }
  }

  export const getAllPostOfForum=async(idF) =>{
    try{
      const res=await _axios.get(`http://localhost:3030/forum/${idF}/posts`)
      console.log(res.data)
      return res.data
    }catch(err){
      console.log(err)
    }
  }

  export const createPost=async(idF,body) =>{
    try{
      const token=cookieStore.get('userToken')
      console.log(token)
      const res=await _axios.post(`http://localhost:3030/forum/${idF}/posts`,body)
      return res.data
    }catch(err){
      console.log(err)
    }
  }

  export const getAllcommentOfPost=async(idP) =>{
    try{
      const res=await _axios.get(`http://localhost:3030/forum/getcomments/${idP}`)
      console.log(res.data)
      return res.data
    }catch(err){
      console.log(err)
    }
  }

  export const addComment=async(idP,body) =>{
    try{
    
      const res=await _axios.post(`http://localhost:3030/forum/createcomments/${idP}`,body)
      return res.data
    }catch(err){
      console.log(err)
    }
  }




 