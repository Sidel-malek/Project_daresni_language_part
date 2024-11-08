import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchInput from "./SearchInput";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";

export default function DashboardHeader() {
  return (
    <header className="h-[60px] border-b flex gap-5 justify-between items-center px-5 bg-white">
      <div className="flex gap-3">
        <div className="lg:hidden">
          <MobileSidebar />
        </div>
        <SearchInput />
      </div>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full" asChild>
        <Link href="/d/student/profil">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://api.dicebear.com/8.x/lorelei/svg?seed=Harley&flip=true"
              alt="profile image"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Link>
      </Button>
    </header>
  );
}
