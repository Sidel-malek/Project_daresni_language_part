"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function verifyEmail(token) {
  try {
    let { data } = await axios.post(
      "http://localhost:3001/auth/verify",
      {},
      { headers: { Authorization: token } }
    );
    redirect("/signin");
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

export async function authenticate(data) {
  try {
    let isSuccess = true;
    await signIn("credentials", data).then(
      () => {},
      (err) => {
        if (err.message != "NEXT_REDIRECT") isSuccess = false;
      }
    );
    if (isSuccess)
      return {
        success: true,
        message: "Logged in successfully",
      };
    else
      return {
        success: false,
        message: "Invalid Credentials",
      };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Invalid Credentials",
    };
  }
}

export async function handleLogout() {
  await signOut();
}