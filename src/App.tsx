import React, { useState, useEffect } from 'react';
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
import * as url from 'url';

const appLib = new AppLib(productsData);

function App() {

    const [queryParams, setQueryParams] = useState({
        cartPriceTotal: 0,
        cartAmountTotal: 0,
        minPrice: appLib.getMinPrice(),
        maxPrice: appLib.getMaxPrice(),
        minStock: appLib.getMinStock(),
        maxStock: appLib.getMaxStock(),
        categoryArr: appLib.getCategoryProd(),
        brandArr: appLib.getBrandProd(),
        sort: 'default',
        searchParam: 'default',
    });

    const [products, setProducts] = useState(appLib.getProductsData());
    const [prodDetails, setProdDetails] = useState(products[0]);
    const [prodsInCart, setProdsInCart] = useState(appLib.addToCart(666));
    const [cartPriceTotal, setCartPriceTotal] = useState(appLib.getCartPriceTotal());
    const [cartAmountTotal, setCartAmountTotal] = useState(appLib.getCartAmountTotal());

    useEffect(() => {
        getQueryFromUrl();
    }, []);

    const getQueryFromUrl = () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        // const queryFromUrl = new URL(location.href).searchParams;
        const category = params.bandArr || appLib.getCategoryProd().map(obj => obj.category).join(',');
        const catArr = category.split(',');
        const brand = params.bandArr || appLib.getBrandProd().map(obj => obj.brand).join(',');
        const brArr = brand.split(',');
        queryParams.cartPriceTotal = Number(params.cartPriceTotal) || 0;
        queryParams.cartAmountTotal = Number(params.cartAmountTotal) || 0;
        queryParams.minPrice = Number(params.minPrice) || appLib.getMinPrice();
        queryParams.maxPrice = Number(params.maxPrice) || appLib.getMaxPrice();
        queryParams.minStock = Number(params.minStock) || appLib.getMinStock();
        queryParams.maxStock = Number(params.maxStock) || appLib.getMaxStock();
        queryParams.categoryArr = appLib.getCategoryProd().map(obj => {
            if (catArr.includes(obj.category)) {
                return { category: obj.category, view: true };
            }
            return { category: obj.category, view: false };
        });
        queryParams.brandArr = appLib.getBrandProd().map(obj => {
            if (brArr.includes(obj.brand)) {
                return { brand: obj.brand, view: true };
            }
            return { brand: obj.brand, view: false };
        });
        queryParams.sort = params.sort || 'default';
        queryParams.searchParam = params.searchParam || 'default';
        setUrl();
    };

    const setUrl = () => {
        const category = queryParams.categoryArr.map(obj => {
            if (obj.view === true) {
                return obj.category;
            }
        });
        const brand = queryParams.brandArr.map(obj => {
            if (obj.view === true) {
                return obj.brand;
            }
        });
        let newUrl = new URL(window.location.protocol + '//' + window.location.host + window.location.pathname);
        newUrl.searchParams.append('cartPriceTotal', queryParams.cartPriceTotal.toString());
        newUrl.searchParams.append('cartAmountTotal', queryParams.cartAmountTotal.toString());
        newUrl.searchParams.append('minPrice', queryParams.minPrice.toString());
        newUrl.searchParams.append('maxPrice', queryParams.maxPrice.toString());
        newUrl.searchParams.append('minStock', queryParams.minStock.toString());
        newUrl.searchParams.append('maxStock', queryParams.maxStock.toString());
        newUrl.searchParams.append('category', category.join(','));
        newUrl.searchParams.append('brand', brand.join(','));
        newUrl.searchParams.append('sort', queryParams.sort);
        newUrl.searchParams.append('searchParam', queryParams.searchParam);
        window.history.pushState({ path: newUrl.href }, '', newUrl.href);
    };

    // setUrl();

    const btnHandler = (act: string, productId: number) => {
        if (act === 'add') {
            setProdsInCart(appLib.addToCart(productId));
            setCartAmountTotal(appLib.getCartAmountTotal());
            queryParams.cartAmountTotal = appLib.getCartAmountTotal();
            setCartPriceTotal(appLib.getCartPriceTotal());
            queryParams.cartPriceTotal = appLib.getCartPriceTotal();
            setUrl();
        }
        if (act === 'det') {
            setProdDetails(appLib.getProductDetails(productId));
            // window.location.pathname = 'product-details';//
        }
    };

    const applyFilters = (viewParam: viewParam) => {
        appLib.applyFilters(viewParam);
        setProducts(appLib.getViewProducts());
        queryParams.minPrice = viewParam.minPrice;
        queryParams.maxPrice = viewParam.maxPrice;
        queryParams.minStock = viewParam.minStock;
        queryParams.maxStock = viewParam.maxStock;
        queryParams.categoryArr = viewParam.categoryArr;
        queryParams.brandArr = viewParam.brandArr;
        queryParams.sort = viewParam.sort;
        setUrl();
    };

    const applySearch = (searchParam: string) => {
        appLib.applySearch(searchParam);
        setProducts(appLib.getViewProducts());
        queryParams.searchParam = searchParam;
        setUrl();
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
