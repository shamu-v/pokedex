import { Inter } from "next/font/google";

import { Divider } from "@nextui-org/react";

import HomeButton from "@/components/HomeButton";
import Heading from "@/components/Heading";
import PokeImage from "@/components/PokeImage";
import PokemonData from "@/components/PokeData";

const inter = Inter({ subsets: ["latin"] });

export default function Pokemon({ data }) {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-8 ${inter.className}`}>
            <Heading />
            <Divider className="my-4" />
            <h2 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">Pokemon: {data.name}</h2>
            <PokeImage sprites={data.sprites} opt={1} />
            <PokemonData data={data} />
            <Divider className="my-4" />
            <HomeButton />
        </main>
    )
}

export async function getStaticPaths() {
    // When this is true (in preview environments) don't
    // prerender any static pages
    // (faster builds, but slower initial page load)
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: 'blocking',
        }
    }

    // Call an external API endpoint to get posts
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0')
    const data = await res.json()

    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)
    const paths = data.results.map((pokemon) => ({
        params: {
            name: pokemon.name
        },
    }))

    // { fallback: false } means other routes should 404
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const name = params.name

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}