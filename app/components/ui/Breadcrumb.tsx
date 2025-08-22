import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/breadcrumbs";
export default function Breadcrumb(){
    return(<div className="my-2">
    <Breadcrumbs >
        <BreadcrumbItem>home</BreadcrumbItem>
        <BreadcrumbItem>product</BreadcrumbItem>
    </Breadcrumbs>
    </div>)
}