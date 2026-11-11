"use client";
import { getProductsResponse, ProductsEntity } from "@/app/types";
import { MainBreadcrumb , Footer ,Header , useGetServices ,getProductById 
  ,ProductInfo,SizeTable , ProductSlider
} from "@/app/products/import" 
import { GetProductsByIdResponse } from "@/app/products/type";
import { useParams } from "next/navigation";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"
import { getProducts } from "@/app/hooks/queryHooks/products";
import Link from "next/link";

const ProductPage = () => {
  //get product  by id 
  const {id} = useParams()
  const { data, isLoading: isProductLoading, isError } = useGetServices<GetProductsByIdResponse>({
      queryKey: ["GetBookById", id],
      queryFn: () => getProductById(id! as string),
      enabled: !!id,
    });

    const product: ProductsEntity | undefined = data?.data?.product;

      //get product by same category
      const { data: firstCategoryData, isLoading } =
      useGetServices<getProductsResponse>({
        queryKey: ["GetFirstCategoryBooks", product?.category?._id],
        queryFn: () =>
          getProducts({
            limit: "6",
            category: product?.category?._id,
          }),
        enabled: !!product?.category?._id,
      });

 
    const images = product?.images?.length ? product.images : product?.thumbnail ? [product.thumbnail] : [];
    // Related products, excluding the product currently being viewed.
    const firstCategoryItems = (firstCategoryData?.data?.products || []).filter(
      (p) => p._id !== product?._id
    );


    if (!product) {
      return (
        <>
          <Header />
          <section className="py-16 px-5 flex flex-col items-center gap-3 text-slate-600">
            {isProductLoading ? (
              <p>در حال بارگذاری...</p>
            ) : (
              <>
                <p>{isError ? "خطا در بارگذاری محصول. لطفا دوباره تلاش کنید." : "محصول مورد نظر یافت نشد."}</p>
                <Link href="/products" className="text-blue-600 hover:underline">بازگشت به محصولات</Link>
              </>
            )}
          </section>
          <Footer />
        </>
      );
    }

    return ( <>
    <Header />
    <section className="[Product Page] py-3 px-5 flex  flex-col  ">
        <MainBreadcrumb product={product} type="single" />
        <div className=" flex md:flex-row flex-col justify-evenly md:items-start items-center gap-1">

          <div className="sm:w-[380px] w-[220px] ">
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              navigation
            >
              {images?.map((image) => (
                <SwiperSlide key={image}>
                  <div className="flex justify-center items-center">
                    <img
                      src={image}
                      alt={product?.name}
                      className="sm:w-[400px] w-[200px] rounded-lg max-h-[400px] object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <ProductInfo product={product} />
        </div>

           <SizeTable />
           <ProductSlider
              products={firstCategoryItems}
              isLoading={isLoading}
              title={'محصولات مرتبط'}
              bg={'bg-white'}
              text={"text-slate-700"}
           />

           
    </section>
      
    <Footer />
    </> );
}
 
export default ProductPage;