import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Sign up",
  description: "sign up in daresni platform",
};

export default function RootLayout({ children }) {
  return (
    <main className="container mx-auto flex justify-center flex-col mt-20 font-nats  lg:max-w-3xl lg:mx-auto   md:max-w-2xl md:mx-auto  ">
        <div className="text-lg font-bold mb-8">
          <Image src="/daresni.png" width={50} height={50} alt="Daresni Logo" />
        </div>  
      <div>{children}</div>
      <hr />
      <div className="text-center  mt-4 text-base lg:mb-0 md:mb-0 mb-4 ">
        Vous avez déjà un compte ?{" "}
        <Link href={"/signin"} className="text-[#6610F2]">
          {" "}
          Login{" "}
        </Link>
      </div>
    </main>
  );
}
