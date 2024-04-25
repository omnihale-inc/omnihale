"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Search from "@/components/Search";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api.omnihale.com";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    localStorage.removeItem("search_result");
    const options = {
      method: "POST",
      body: JSON.stringify({ search: search }),
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(`${URL}/search`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("search_result", JSON.stringify(data));
      });
  }, [isSearch]);
  return (
    <main className="grid place-items-center h-screen">
      <div className="flex flex-col justify-between w-10/12 max-w-xl">
        <div>
          <h2 className="text-center text-lg lg:text-4xl mb-4 font-semibold">
            Welcome
          </h2>
        </div>
        <Search
          search={search}
          setSearch={setSearch}
          className="pl-5 pr-12 lg:pl-5 lg:pr-7 py-3 lg:py-4"
          searchRequest={setIsSearch}
        />
        <div className="flex flex-col items-center mt-12">
          <a
            className="mt-16 font-semibold border w-fit py-1.5 lg:py-2 px-7 m-auto mb-6 rounded-full text-xs lg:text-base"
            href="https://business.omnihale.com"
            target="_"
          >
            For Business
          </a>
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
