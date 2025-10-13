import CategoryCard from "../components/ui/categoryCard";
import Footer from "../components/ui/footer";
import Header from "../components/ui/header";
import PopularProductsSlider from "../components/ui/PopularProductsSlider";
import { Product } from "../components/ui/ProductCard";
import SpecialOffersSlider from "../components/ui/SpecialOffersSlider";

const sampleProducts: Product[] = [
    {
        id: 1,
        title: "کیت اول بارسلونا ۲۳-۲۴ ",
        image: "/barcelona.png",
        price: 111200,
        oldPrice: 139000,
        rating: 4,
        reviewsCount: 55,
        isFavorite: true,
        discountPercent: 20,
    },
    {
        id: 2,
        title: "کیت اول آلمان ۲۰۲۴",
        image: "/barcelona.png",
        price: 98000,
        oldPrice: 122000,
        rating: 5,
        reviewsCount: 78,
        isFavorite: false,
        discountPercent: 15,
    },
    {
        id: 3,
        title: "کیت دوم بارسلونا ۲۳-۲۴",
        image: "/barcelona.png",
        price: 102000,
        oldPrice: 126000,
        rating: 3,
        reviewsCount: 41,
        isFavorite: false,
        discountPercent: 10,
    },
    {
        id: 4,
        title: "کیت اول رئال مادرید ۲۳-۲۴",
        image: "/barcelona.png",
        price: 119000,
        oldPrice: 145000,
        rating: 5,
        reviewsCount: 100,
        isFavorite: true,
        discountPercent: 18,
    },
    {
        id: 5,
        title: "کیت اول رئال مادرید ۲۳-۲۴",
        image: "/barcelona.png",
        price: 119000,
        oldPrice: 145000,
        rating: 5,
        reviewsCount: 100,
        isFavorite: true,
        discountPercent: 18,
    },
    {
        id: 6,
        title: "کیت اول رئال مادرید ۲۳-۲۴",
        image: "/barcelona.png",
        price: 119000,
        oldPrice: 145000,
        rating: 5,
        reviewsCount: 100,
        isFavorite: true,
    },
];

const CategoryPage = () => {
    return (
        <>
            <Header />
            <main className='[Elite-Sport-Home] w-full bg-white'>
                {/* --Banner's location-- */}
                <div className="max-w-7xl mx-auto h-52 bg-indigo-400 mt-8 rounded-lg" />
                <CategoryCard />
                <SpecialOffersSlider products={sampleProducts} />
                <PopularProductsSlider products={sampleProducts} />
            </main>
            <Footer />

        </>
    );
}

export default CategoryPage;