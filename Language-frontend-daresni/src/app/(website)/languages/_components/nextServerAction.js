"use server";

import { cookies } from "next/headers";

export const saveCheckpoint = async (formData) => {
  let url = formData.get("url");
  cookies().set("checkpoint", url, { secure: true });
};
