"use client";

import { useEffect, useState } from "react";
import Search from "@/components/Search";
import SearchItem from "@/components/SearchItem";

type SearchItemProp = {
  profilePic: string;
  name: string;
  address: string;
  state: string;
  appointments: number;
  fields: Array<string>;
};

const URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api.omnihale.com";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Array<SearchItemProp>>([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const search = localStorage.getItem("search");
    if (search) {
      setSearch(search);
      setIsSearch(true);
    } else {
      location.href = "/";
    }
    const results = JSON.parse(localStorage.getItem("search_result") || "[]");
    if (results) setData(results);
  }, []);

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
        setData(data);
      });
  }, [isSearch]);
  return (
    isSearch && (
      <main className="w-10/12 max-w-7xl mx-auto">
        <header>
          <h3 className="text-center lg:text-left text-lg lg:text-4xl mt-10 font-semibold">
            Omnihale
          </h3>
          <div className="lg:w-6/12 mt-4 lg:mt-8 lg:ml-6">
            <Search
              search={search}
              setSearch={setSearch}
              className="pl-4 pr-10 lg:px-6 py-2.5"
              searchRequest={setIsSearch}
            />
          </div>
        </header>
        <section>
          <p className="mt-4 lg:mt-8 lg:ml-6 text-xs lg:text-base">
            Search results found!
          </p>
          <div className="md:flex md:flex-wrap md:justify-between">
            {data.map((item, index) => {
              return <SearchItem key={index} {...item} />;
            })}
          </div>
        </section>
      </main>
    )
  );
}
