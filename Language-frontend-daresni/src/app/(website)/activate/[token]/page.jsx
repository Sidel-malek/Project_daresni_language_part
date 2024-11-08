import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/actions/server/auth";
import Link from "next/link";
import Footer from "../../_components/Footer";

export default async function page({ params }) {
  let error = await verifyEmail(params.token);
  return (
    <>
      <main className="container">
        <h1>Error occured while activating your account</h1>
        <p>
          <strong>Error:</strong> {error}
        </p>
        <Link href="/signin">
          <Button>Go To Login</Button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
