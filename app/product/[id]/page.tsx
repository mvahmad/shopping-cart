"use client";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Footer from "../../components/ui/footer";
import Header from "../../components/ui/header";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetServices } from "../../hooks/useGetServices";
import { GetProductsByIdResponse } from "../type";
import { useParams } from "next/navigation";
import { getProductsById } from "@/app/hooks/queryHooks/products";
import { ProductsEntity } from "@/app/types";
import ProductInfo from "@/app/components/productInfo/page";
import SizeTable from "@/app/components/sizeTable/page";
import SpecialOffersSlider from "@/app/components/ui/SpecialOffersSlider";
import { sampleProducts } from "@/app/page";
const ProductPage = () => {
  const {id} = useParams()
 const { data } = useGetServices<GetProductsByIdResponse>({
    queryKey: ["GetBookById", id],
    queryFn: () => getProductsById(id!),
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
 
    const images = product?.images;



    return ( <>
    <Header />
    <section className="[Product Page] py-3 px-5 flex  flex-col  ">
            <Breadcrumb />
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
                      src={`http://${image}`}
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
            <SpecialOffersSlider products={sampleProducts} />
        
             



    </section>
      
    <Footer />
    </> );
}
 
export default ProductPage;