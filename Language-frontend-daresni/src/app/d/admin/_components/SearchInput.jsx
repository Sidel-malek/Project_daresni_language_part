"use client";

import { Input } from "@/components/ui/input";
import React from "react";

const SearchInput = () => (
  <form>
    <Input
      type="search"
      placeholder="input search text..."
      className="md:w-[100px] lg:w-[300px]"
    />
  </form>
);

export default SearchInput;
