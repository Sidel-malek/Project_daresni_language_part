"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaListAlt, FaUsers } from "react-icons/fa";
import { MdLogout, MdWindow } from "react-icons/md";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiMenu } from "react-icons/hi";
import { RiMoneyEuroBoxFill } from "react-icons/ri";
import { handleLogout } from "@/actions/server/auth";

const MENU_ITEMS = [
  {
    label: "Dashboard",
    icon: <MdWindow size={19} />,
    href: "/d/admin",
  },
  {
    label: "Demande des sessions",
    icon: <FaListAlt size={19} />,
    href: "/d/admin/sessions",
  },
  {
    label: "Inscriptions",
    icon: <FaUsers size={19} />,
    href: "/d/admin/inscriptions",
  },
  {
    label: "Paiement",
    icon: <RiMoneyEuroBoxFill size={19} />,
    href: "/d/admin/paiement",
  },
];

export default function MobileSidebar() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <HiMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <aside className="min-h-screen py-16 flex flex-col justify-between items-center">
          <div className="space-y-12">
            <p className="text-lg font-bold text-center">LOGO</p>
            <div className="grid gap-3">
              {MENU_ITEMS.map((item) => (
                <div key={item.href} className="w-full">
                  <SheetTrigger asChild>
                    <MenuItem
                      icon={item.icon}
                      active={
                        item.href == "/d/admin"
                          ? pathname == item.href
                          : pathname.startsWith(item.href)
                      }
                      href={item.href}
                    >
                      {item.label}
                    </MenuItem>
                  </SheetTrigger>
                </div>
              ))}
            </div>
          </div>
          <form action={handleLogout} className="w-full">
            <Button
              variant="ghost"
              className="flex-row-reverse w-full justify-center gap-3"
            >
              <MdLogout size={19} /> Deconnecter
            </Button>
</form>
        </aside>
      </SheetContent>
    </Sheet>
  );
}

const MenuItem = ({ children, icon, href, active }) => {
  return (
    <Button
      className="justify-start w-full"
      variant={active ? "" : "ghost"}
      asChild
    >
      <Link href={href} className="flex gap-3 items-center">
        {icon} <span>{children}</span>
      </Link>
    </Button>
  );
};
