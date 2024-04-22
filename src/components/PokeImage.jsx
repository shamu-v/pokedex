import Image from "next/image";

export default function PokeImage({ sprites, opt }) {
    const imageOutput = () => {    
        if (opt == 0) {
            return sprites.front_default;
        } else { 
            return sprites.front_shiny;
        }
    }

    return (
        <div>
            <Image alt="Pokemon" className="object-cover rounded-xl" src={imageOutput()} width={400} height={400} />
        </div>
    )
}
