import { redirect } from "next/navigation";

export default function page({ params }) {
  redirect(`/languages/${params.slug}/0`);
}
