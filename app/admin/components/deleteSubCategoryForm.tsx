import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
import { getSubcategories } from "@/app/hooks/queryHooks/getSubCategoris";
import { DeleteSubCategory } from "@/app/hooks/queryHooks/subCategoris";
import { useDeleteServices } from "@/app/hooks/useDeleteService";
import { useGetServices } from "@/app/hooks/useGetServices";
import { CategoriesResponse, SubcategoriesResponse } from "@/app/types";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function DeleteSubCategoryForm ({ onClose }: { onClose: () => void }){
    const [subCategoriesItem, setSubCategoriesItem] = useState<
        { label: string; value: string }[]
      >([]);
    const [slecetedSubCategory , setSelectedSubCategory] = useState("")

    const { data: categoryData } = useGetServices<CategoriesResponse>({
        queryKey: ["GetCategories"],
        queryFn: getCategories,
    });

    const {data : subCategoryData , refetch} = useGetServices<SubcategoriesResponse>({
        queryKey : ["GetSubCategoris"],
        queryFn : ()=> getSubcategories({limit :0})
    })

    // Delete mutation
    const { mutate } = useDeleteServices({
        mutationKey: ["DeleteProducts"],
        mutationFn: DeleteSubCategory,
        invalidate: ["DeleteSubCategory"],
        options: {
          onSuccess() {
            toast.success(`SubCategory deleted successfully`);
            refetch();
          },
          onError(error) {
            toast.error(error.message, { rtl: false });
          },
        },
      });
    
    const categoriesItem =
        categoryData?.data.categories?.map((category) => ({
            label: category.name,
            value: category._id,
        })) || [];

    const handleSubCategories = (e: ChangeEvent<HTMLSelectElement>) => {
        const categoryId = e.target.value;
        const filteredSubcategories = subCategoryData?.data.subcategories
            ?.filter((item) => item.category === categoryId)
            .map((item) => ({ label: item.name, value: item._id }));
          setSubCategoriesItem(filteredSubcategories || []);
          return categoryId;
        };    

    const handelDeleteSubCategory = () =>{
        if (slecetedSubCategory){
            mutate(slecetedSubCategory)
        }
    }


    return <>
    <form
          action=""
          className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
          onSubmit={handelDeleteSubCategory}
        >
    
                <Select
                  label="Category"
                  size="sm"
                  variant="bordered"
                  className="max-w-xs"
                  onChange={(e)=>handleSubCategories(e)}
                >
                  {categoriesItem?.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="font-yekan"
                      
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                
                  <Select
                  label="Subcategory"
                  size="sm"
                  isDisabled={subCategoriesItem.length === 0}
                  onChange={(e)=>{
                    setSelectedSubCategory(e.target.value)
                  }}
                  variant="bordered"
                  className="max-w-xs"
                >
                  {subCategoriesItem?.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="font-yekan"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
             


          
    
          <div className="flex gap-3 mt-6 w-full">
            <Button
              className="text-base sm:text-lg w-full"
              variant="bordered"
              color="danger"
              onPress={() => {
                // reset();
                onClose();
              }}
            >
              Cansel
            </Button>
            <Button
              className="bg-green-400 text-white text-base sm:text-lg w-full"
              type="submit"
            //   isLoading={isPending}
            //   spinner={<Spinner color="default" size="sm" />}
            >
              {"Delete"}
            </Button>
          </div>
        </form>
    </>
    
}