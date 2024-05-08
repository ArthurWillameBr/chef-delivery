import Image, {ImageProps}from "next/image";

const PromoBanner = (props: ImageProps) => {
    return ( 
        <Image
          width={0}
          height={0}
          sizes="100%"
          className="object-container h-auto w-full"
          quality={100}
          {...props}
        />
     );
}
 
export default PromoBanner;