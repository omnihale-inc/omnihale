"use client";

import Image from "next/image";
import { useState } from "react";
import Search from "@/components/Search";

export default function HomePage() {
  const [search, setSearch] = useState("");
  return (
    <main className="grid place-items-center h-screen">
      <div className="flex flex-col justify-between w-10/12 max-w-xl">
        <div>
          <h2 className="text-center text-lg lg:text-4xl mb-4 font-semibold">
            Omni Care
          </h2>
        </div>
        <Search
          search={search}
          setSearch={setSearch}
          className="pl-5 pr-12 lg:pl-5 lg:pr-7 py-3 lg:py-4"
        />
        <div className="flex flex-col items-center mt-16">
          <p className="mr-2 text-gray-400 mb-2 text-xs lg:text-base">from</p>
          <div className="flex justify-center items-center">
            <Image
              src="/logo.svg"
              alt="logo"
              width={30}
              height={30}
              className="rounded-md"
            />
            <h3 className="ml-1 lg:text-lg">Omnihale</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
