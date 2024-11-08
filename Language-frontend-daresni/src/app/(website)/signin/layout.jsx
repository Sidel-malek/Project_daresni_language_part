import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Sign in",
  description: "sign in in daresni platform",
};

export default function RootLayout({ children }) {
  return (
    <main className="container mx-auto flex justify-center gap-7 flex-col my-24 font-nats max-w-[430px]">
      <div className="flex flex-col gap-4 items-center text-center">
      <div className="text-lg font-bold mb-8 flex justify-center items-center">
          <Image src="/daresni.png" width={50} height={50} alt="Daresni Logo" />
        </div> 
       <h1 className="text-4xl ">Sign In</h1>
        <p className="text-[13px] text-[#A3A9AF] ">
          Entrez vos détails ci-dessous pour acceder a votre compte
        </p>
      </div>
      <div className="grid gap-6 py-6">{children}</div>
      <hr />
      <div className="text-center text-base">
        Vous n'avez pas un compte ?{" "}
        <Link href={"/register/student"} className="text-[#6610F2]">
          {" "}
          Signup{" "}
        </Link>
      </div>
    </main>
  );
}
