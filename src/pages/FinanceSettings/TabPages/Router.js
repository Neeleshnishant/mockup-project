import { Products } from "./Products";
import { ProductCategory } from "./ProductCategory";
import React from 'react';
import { Link, Route, Routes } from "react-router-dom";
import { Col } from "reactstrap";

export const Router = () => {
    return (
        <Col lg={9}>
            <Routes>
                <Route  path="/product" element={<Products />} />
                <Route path="/prodcat" element={<ProductCategory/>}/>
            </Routes>
        </Col>
    )
}
export default Router;
