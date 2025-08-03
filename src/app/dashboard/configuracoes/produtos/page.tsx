import React from "react";
import ProductList from "@/components/Products/List";
const ProductsPage = () => {
    return (
        <>
            <ProductList />
        </>
    );
};

export default React.memo(ProductsPage);