import ProductsPageComponent, { League, ProductDemo, Team } from "../components/ui/ProductsPage";

const leagues: League[] = [
    { id: "laliga", name: "لالیگا" },
    { id: "epl", name: "پریمیر لیگ" },
    { id: "seriea", name: "سری آ" },
];
const teams: Team[] = [
    { id: "real", name: "رئال مادرید", leagueId: "laliga" },
    { id: "barca", name: "بارسلونا", leagueId: "laliga" },
    { id: "city", name: "منچسترسیتی", leagueId: "epl" },
    { id: "arsenal", name: "آرسنال", leagueId: "epl" },
];
const products: ProductDemo[] = Array.from({ length: 23 }).map((_, i) => ({
    id: String(i + 1),
    title: `کیت شماره ${i + 1}`,
    teamId: i % 2 === 0 ? "real" : "barca",
    price: 1450000 + ((i % 5) * 15000),
    image: "/kits/sample.jpg",
    hasDiscount: i % 4 === 0,
    discountPrice: i % 4 === 0 ? 1290000 : undefined,
}));

const ProductsPage = () => {
    return (
        <ProductsPageComponent leagues={leagues} teams={teams} products={products} defaultLeagueId="laliga" defaultTeamId="real" pageSize={8} />
    );
}

export default ProductsPage;

