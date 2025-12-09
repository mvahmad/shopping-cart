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

const ProductPage = () => {
  //get product  by id 
  const {id} = useParams()
  const { data } = useGetServices<GetProductsByIdResponse>({
      queryKey: ["GetBookById", id],
      queryFn: () => getProductById(id! as string),
      options: {
        enabled: !!id,
      },
    });
      
    let endPrice = 0;
    let totalPrice = 0;
    let discountPercent = 0;
    let product!: ProductsEntity;
    if (data?.data.product) {
      product = data.data.product;
      const discount = data?.data.product.discount;
      endPrice = data?.data?.product?.price;
      if (discount !== 0) {
        totalPrice = endPrice + discount;
        discountPercent = Math.ceil((discount * 100) / endPrice);
      }
    }
      //get product by same category
      const { data: firstCategoryData, isLoading } =
            useGetServices<getProductsResponse>({
            queryKey: ["GetFirstCategoryBooks", product],
            queryFn: () => getProducts({ limit: "6", category: product?.category._id }),
        });
 
    const images = product?.images;
    const firstCategoryItems = firstCategoryData?.data?.products || [];


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
                      alt={name?.[0]}
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