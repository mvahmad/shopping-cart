import Breadcrumb from "../components/ui/Breadcrumb";
import Footer from "../components/ui/footer";
import Header from "../components/ui/header";

const ProductPage = () => {
    return (<>
        <Header />
        <section className="[Product Page] flex flex-col">
            <Breadcrumb />
            <div>imags</div>
        </section>
        <Footer />
    </>);
}

export default ProductPage;