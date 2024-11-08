import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchInput from "./SearchInput";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";

export default function DashboardHeader() {
  return (
    <header className="h-[60px] border-b flex gap-5 justify-between items-center px-5">
      <div className="flex gap-3">
        <div className="lg:hidden">
          <MobileSidebar />
        </div>
        <SearchInput />
      </div>
    </header>
  );
}
