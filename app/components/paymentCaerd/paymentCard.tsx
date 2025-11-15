import { ProductsEntity } from "@/app/types";
import { Card, Divider, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";

export default function PaymentCard ({item}:{item:ProductsEntity}){
    return(
    <Card className="py-2 w-36" isHoverable key={item._id}>
            <div className="text-center pb-2">
                <span className="text-[12px] font-semibold text-persian-green">
                موجود در سبد خرید
                </span>
            </div>
      <Divider className="bg-blue-400 p-[0.8px]" />
      <CardBody className="overflow-visible py-2 flex justify-center items-center">
        <Link href={`/product/${item._id}`}>
            <img
             src={`http://${item?.images?.[0]}`}
              alt={item._id}
              className="w-24 h-24"
            />
        </Link>
      </CardBody>
      <CardFooter className="pb-1 pt-2 px-2 flex-col flex items-start gap-1">
          <Link color="foreground" href={`/product/${item._id}`}>
            <h4 className="text-[10px] font-bold text-ellipsis whitespace-nowrap overflow-hidden w-32">
              {item.name}
            </h4>
          </Link>
      </CardFooter>
    </Card>
    )
}