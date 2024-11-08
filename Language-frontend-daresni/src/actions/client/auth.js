"use server";

import { auth } from "@/auth";
import _axios from "@/lib/axios-config";
import axios from "axios";
//auth-service



export const sigupStudent = async (body) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/auth/signup/student",
      body
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};


export const signinUser = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/auth/login",
        body
      );
      resolve(data);
    } catch (err) {
      console.log(err.message);
      resolve(null);
    }
  });
};

export const GetUserType = async () => {
  try {
    let session = await auth();
    if (!session) throw new Error("unauthorized");
    const res = await axios.get("http://localhost:3001/auth/userRole", {
      headers: {
        Authorization: session.accessToken,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const singupProf = async (body) => {
  try {
    console.log("body is", body);
    const res = await axios.post(
      "http://localhost:3001/auth/signup/prof",
      body
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProfId = async (body) => {
  try {
    let session = await auth();
    if (!session) throw new Error("unauthorized");
    const res = await axios.get("http://localhost:3001/auth/user/prof", {
      headers: {
        Authorization: session.accessToken,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProfInfo = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3001/auth/profInfo/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

import { _fetch } from "@/lib/fetch-api";
import { revalidatePath, revalidateTag } from "next/cache";
export const getAllProf = async () => {
  try {
    let res = await _fetch(`http://localhost:3001/user/profs`,false,{method:"GET",next:{tags:['getProf']}});
    res=await res.json()
      return{
        success:true,
        data:res
      }
  } catch (err) {
    return{
      success:false,
      data:err.message
    }
  }
};

import { _fetchWithToken } from "@/lib/fetch-api";
export const validateProf = async (idP) => {
  try {
    let res = await _fetchWithToken(`http://localhost:3001/user/${idP}/activate`,
    false,
    {method:"PATCH"});
    res=await res.json()
    
    if (res.success) {
      revalidateTag('getProf');  // Ensure this is called only on success
    }
      return{
        success:true,
        data:res
      }

  } catch (err) {
    return{
      success:false,
      data:err.message
    }
  }
};