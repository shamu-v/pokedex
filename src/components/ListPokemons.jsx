import Image from "next/image";
import { useRouter } from 'next/router'

import { Card, CardHeader, CardBody } from "@nextui-org/card";

import PokeImage from "./PokeImage";

export default function ListPokemons({ pokemons }) {
    const router = useRouter()
    return (
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 p-0">
            {pokemons.map((pokemon, index) => (
                <Card className="py-4" shadow="sm" key={index + 1} isPressable onPress={() => router.push(`/pokemon/${pokemon.name}`)}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny font-bold">{pokemon.id}</p>
                        <p className="text-tiny">{pokemon.type}</p>
                        <h4 className="font-bold uppercase">{pokemon.name}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible items-center p-0">
                        {
                            <PokeImage sprites={pokemon.images} opt={0} /> ?
                            <PokeImage sprites={pokemon.images} opt={0} /> :
                            null
                        }
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}