import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function HomeButton() {
    const router = useRouter()
    return (
            <div className="flex flex-col items-center gap-5">
                <Button
                    size="sm"
                    variant="flat"
                    color="secondary"
                    onPress={() => { router.push('/') }}
                >
                    Home
                </Button>
            </div>
    );
}