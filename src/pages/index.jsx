import React, { useState } from "react";

import { Inter } from "next/font/google";
import Link from "next/link";

import { Button, Divider, Select, SelectItem } from "@nextui-org/react";

import Heading from "@/components/Heading";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ types }) {
  const [selectedType, setSelectedType] = useState("1");

  const handleSelectionChange = (type) => {
    setSelectedType(`/type/${type.target.value}`);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-32 ${inter.className}`}>
      <Heading />
      <Divider className="my-4" />
      <Select
        items={types}
        onChange={handleSelectionChange}
        label="Type (optional)"
        placeholder="Select a type"
        className="max-w-xs"
      >
        {(type) => <SelectItem key={type.value}>{type.label}</SelectItem>}
      </Select>
      <Link href={selectedType}>
        <Button
          radius="full"
          size="lg"
          className="bg-gradient-to-tr from-pink-500 to-purple-500 text-white shadow-lg uppercase"
          disabled={!selectedType}>
          Explore
        </Button>
      </Link>
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch(`https://pokeapi.co/api/v2/type`)
  const data = await res.json()

  const types = await Promise.all(data.results.map(async (type) => {
    return {
      label: type.name,
      value: type.name,
      description: type.name,
    };
  }))

  return {
    props: {
      types,
    },
  }
}