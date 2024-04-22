import React, { useState } from "react";

import { Inter } from "next/font/google";

import { Pagination, Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/router";

import ListPokemons from "@/components/ListPokemons";
import Heading from "./Heading";

const inter = Inter({ subsets: ["latin"] });

export default function MainPagination({ pokemons, totalPages }) {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(Number(router.query.page) || 1)

    const handlePageChange = (page) => {
        setCurrentPage(page)
        router.push(`/${page ? page : " "}`)
    }

    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-8 ${inter.className}`}>
            <Heading />
            <Divider className="my-4" />
            <ListPokemons pokemons={pokemons} />
            <Divider className="my-4" />
            <div className="flex flex-col items-center gap-5">
                <Pagination
                    total={totalPages}
                    color="secondary"
                    page={currentPage}
                    onChange={handlePageChange}
                />
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() => {
                            handlePageChange(Math.max(currentPage - 1, 1))
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() => { handlePageChange() }}
                    >
                        Home
                    </Button>
                    <Button
                        size="sm"
                        variant="flat"
                        color="secondary"

                        onPress={() => {
                            handlePageChange(Math.min(currentPage + 1, 82))
                        }}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </main>
    );
}