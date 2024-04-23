import { Inter } from "next/font/google";

import { Divider } from "@nextui-org/react";

//import MainPagination from "@/components/MainPagination";
import ListPokemons from "@/components/ListPokemons";
import HomeButton from "@/components/HomeButton";
import Heading from "@/components/Heading";

const inter = Inter({ subsets: ["latin"] });

export default function Type({ pokemons }) {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-8 ${inter.className}`}>
            <Heading />
            <h2 className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{pokemons[0].type.toUpperCase()} POKEMONS</h2>
            <Divider className="my-4" />
            <ListPokemons pokemons={pokemons} />
            <Divider className="my-4" />
            <HomeButton />
        </main>
    );
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
    // Call an external API endpoint to get posts
    const res = await fetch('https://pokeapi.co/api/v2/type')
    const types = await res.json()


    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)
    const paths = types.results.map((type) => ({
        params: {
            type: type.name
        },
    }))

    // { fallback: false } means other routes should 404
    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
    const type = params.type

    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const data = await res.json()

    const pokemons = await Promise.all(
        data.pokemon.map(async (pokemon) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`);
            const pokemonData = await response.json();

            //const pokemonImage = pokemonData.sprites.front_default != null ? pokemonData.sprites.front_default : pokemonData.sprites.front_female

            return {
                id: pokemonData.id,
                name: pokemonData.name,
                images: pokemonData.sprites.other["official-artwork"].front_default,
                type: pokemonData.types[0].type.name,
            };
        })
    );

    //const totalPokemons = pokemons.length
    //const pokemonsPerPage = 16
    //const totalPages = Math.ceil(totalPokemons / pokemonsPerPage)

    return {
        props: {
            pokemons,
            //totalPages,
        },
    }
}