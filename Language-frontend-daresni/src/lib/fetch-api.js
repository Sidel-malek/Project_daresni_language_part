import { auth } from "@/auth"

export const _fetch=(url,withCach,options)=>{
    return fetch(url,{
        ...options,
        cache:withCach ? "force-cache" :"no-store"
    }
    )
}

export  const  _fetchWithToken=async(url,withCach,options)=>{
    let session=await auth()
    return fetch(url,{
        ...options,
        cache:withCach ? "force-cache" :"no-store",
        headers:{
            Authorization:session.accessToken
        }
    }
    )
}