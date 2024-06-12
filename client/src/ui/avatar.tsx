import Image from "next/image";

type Props = {
    name: string
    pic: string
}

const Avatar = ({ pic, name }: Props) => {
    return (
        <div className="relative inline-block">
            <div className="overflow-hidden rounded-full">
                <Image
                    className="object-contain w-full h-full max-w-11 max-h-11 rounded-full"
                    src={pic}
                    alt={name}
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
};

export { Avatar };
