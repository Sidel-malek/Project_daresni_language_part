"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar({ items, active }) {
  return (
    <aside className="flex px-5 min-w-[250px] h-screen border-r py-8 flex-col">
      <div className="space-y-12">
        <div className="grid gap-3">
          {items?.map((item, index) => (
            <div key={item.id} className="w-full">
              <MenuItem active={index == active} href={item.href}>
                {item.title}
              </MenuItem>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

const MenuItem = ({ children, href, active }) => {
  return (
    <Button className="w-full" variant={active ? "" : "ghost"} asChild>
      <Link href={href} className="flex gap-3 items-center">
        {children}
      </Link>
    </Button>
  );
};
