import { ProductsEntity } from "@/app/types";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/breadcrumbs";
import Link from "next/link";
interface Props {
  product: ProductsEntity;
  type: "single" | "subcategory" | "category";
}
export default function MainBreadcrumb({product , type}:Props){
    const categoryLink = `/category/${product?.category?._id}`;
    const subcategoryLink = product?.subcategory?._id
        ? `/subcategory/${product?.subcategory?._id}`
        : "";

  let breadcrumbItems: { to: string; label: string }[] = [];

  switch (type) {
    case "category":
      breadcrumbItems = [
        {
          to: categoryLink,
          label: product?.category?.name || "",
        },
      ];
      break;
    case "subcategory":
      breadcrumbItems = [
        {
          to: categoryLink,
          label: product?.category?.name || "",
        },
        {
          to: subcategoryLink,
          label: product?.subcategory?.name || "",
        },
      ];
      break;
    case "single":
      breadcrumbItems = [
        {
          to: categoryLink,
          label: product?.category?.name || "",
        },
        {
          to: subcategoryLink,
          label: product?.subcategory?.name || "",
        },
        {
          to: "",
          label: product?.name || "",
        },
      ];
      break;
    default:
      break;
  }

    return(
    <div className="my-2">
    <Breadcrumbs >
       <BreadcrumbItem>
        <Link href={'/'} className="text-[14px] max-[640px]:text-[11px]">
          الیت اسپورت
        </Link>
      </BreadcrumbItem>
      {breadcrumbItems.map((item) => (
        <BreadcrumbItem key={item.label}>
          <Link href={item.to} className="text-[14px]  max-[640px]:text-[11px]">
            {item.label}
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
    </div>)
}