import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
interface Props {
    children: React.ReactNode;
    href: string;
}
function FooterButton ( {children  , href}: Props) {
    return ( 
    <Link href={href} className="rounded-lg border-none p-2 w-[15.12rem] h-[3.06rem]
     text-gray-600 bg-[#E2E8F099] 
    flex justify-between items-center ">
       <span>{children}</span>
       <FaArrowLeft />
    </Link> 
    );
}

export default FooterButton ;