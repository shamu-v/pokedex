import Image from "next/image";

export default function PokeImage({ images }) {
    const sinImagen = "/sin_imagen.jpg"

    const imageOutput = () => {
        if (images) {
            return images;
        } else { return sinImagen }
    }

    return (
        <div>
            <Image
                alt="Pokemon"
                className="object-cover rounded-xl"
                src={imageOutput()}
                width={400}
                height={400} 
            />
        </div>
    )
}
