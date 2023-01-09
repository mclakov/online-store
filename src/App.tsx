import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { AppLib } from './lib/appLib';
import { productsData } from './lib/data/products';
import { prodData, viewParam } from './globalTypes';
import Page404 from './components/Page404';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import { ChangeResult } from 'multi-range-slider-react';

const appLib = new AppLib(productsData);

function App() {

    const [products, setProducts] = useState(appLib.getProductsData());
    const [prodDetails, setProdDetails] = useState(products[0]);
    const [prodsInCart, setProdsInCart] = useState(appLib.addToCart(666));
    const [cartPriceTotal, setCartPriceTotal] = useState(appLib.getCartPriceTotal());
    const [cartAmountTotal, setCartAmountTotal] = useState(appLib.getCartAmountTotal());

    const btnHandler = (act: string, productId: number) => {
        if (act === 'add') {
            setProdsInCart(appLib.addToCart(productId));
            setCartAmountTotal(appLib.getCartAmountTotal());
            setCartPriceTotal(appLib.getCartPriceTotal());
        };
        if (act === 'det') {
            console.log('productId = ', productId);
            setProdDetails(appLib.getProductDetails(productId));
            // window.location.pathname = 'product-details';//
        };
    };

    const applyFilters = (viewParam: viewParam) => {
        console.log('applyFilters = ', viewParam);
        appLib.applyFilters(viewParam);
        setProducts(appLib.getViewProducts());
    };

    const applySearch = (searchParam: string) => {
        console.log('applySearch = ', searchParam);
        appLib.applySearch(searchParam);
        setProducts(appLib.getViewProducts());
    };

    return (
        <div className='App'>
            <Header
                cartPriceTotal={cartPriceTotal}
                cartAmountTotal={cartAmountTotal}
            />
            <Router>
                <Routes>
                    <Route path='/store' element={<Main
                        products={products}
                        btnHandler={btnHandler}
                        applyFilters={applyFilters}
                        applySearch={applySearch}
                    />}>
                    </Route>
                    <Route path='/' element={<Navigate replace to='/store' />}>
                    </Route>
                    <Route path='/cart' element={<Cart
                        products={products}
                        btnHandler={btnHandler}
                    />}>
                    </Route>
                    <Route path='/product-details' element={<ProductDetails
                        prod={prodDetails}
                        btnHandler={btnHandler}
                    />}>
                    </Route>
                    <Route path='/404' element={<Page404 />}>
                    </Route>
                    <Route path='*' element={<Navigate replace to='/404' />}>
                    </Route>
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}


export default App;
