import { cookies } from "next/headers";
import ClientComponent from "./ClientComponent";
import { getLanguages } from "@/actions/client/language";

export default async function Page() {
  const cookieStore = cookies();
  const checkpoint = cookieStore.get("checkpoint")? cookieStore.get("checkpoint").value
    : "/d/student/languages";
  
  const languages = await getLanguages();

  return <ClientComponent checkpoint={checkpoint} languages={languages} />;
}
