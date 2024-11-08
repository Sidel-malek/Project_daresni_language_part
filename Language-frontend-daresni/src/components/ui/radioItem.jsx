"use client"
import { Label } from "./label"
import { Radio } from "antd"
import { useState } from "react"
import * as yup from "yup";


export function RadioItem({level, labelValue  , onclick , value , id }){

   

   

    
    return(
         <div onClick={onclick} className={`grid grid-cols-2 content-center inline-block bg-white h-12 small_screen w-96   flex items-center rounded-[7px] border border-input  bg-background cursor-pointer ${value === level   ? 'border-purple-added border-2  ' : ''}`}>
            <Label htmlFor={level} className="ml-5  cursor-pointer">{labelValue}</Label>
            <div className="m-5 flex justify-end">
              <input  type="radio" id={id} value={level } className="form-radio accent-purple-added cursor-pointer checked:bg-blue-950" checked={value === level  }/>
            </div>
          </div>
        )
}
