import MainPagination from "@/components/MainPagination";

export default function Page({ pokemons, totalPages }) {
    return (
        <MainPagination pokemons={pokemons} totalPages={totalPages}/>
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

    let dataUrl = 'https://pokeapi.co/api/v2/pokemon?limit=16&offset=0'
    let pages = []

    // Call an external API endpoint to get posts
    while (dataUrl) {
        const res = await fetch(dataUrl)
        const data = await res.json()

        pages.push(data.results) // Añade cada página de resultados a 'pages'

        dataUrl = data.next
    }

    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)
    const paths = pages.map((_, index) => ({
        params: {
            page: `${index + 1}`,
        },
    }))

    // { fallback: false } means other routes should 404
    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=${params.page <= 1 ? 0 : 16 * (params.page - 1)}`)

    const data = await res.json()

    const pokemons = await Promise.all(
        data.results.map(async (pokemon) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const pokemonData = await response.json();
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                images: pokemonData.sprites,
                type: pokemonData.types[0].type.name,
            };
        })
    );

    const totalPokemons = 1302
    const pokemonsPerPage = 16
    const totalPages = Math.ceil(totalPokemons / pokemonsPerPage)

    return {
        props: {
            pokemons,
            totalPages,
        },
    }
}
