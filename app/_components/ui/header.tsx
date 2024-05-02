import Image from "next/image";
import { Button } from "./button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return ( 
        <div className="flex justify-between pt-6 px-5">
            <Image src="/Logo.png" alt="logo" width={100} height={30}/>
            <Button variant="outline" size="icon" className="bg-transparent border-none">
                <MenuIcon/>
            </Button>
        </div>
     );
}
 
export default Header;