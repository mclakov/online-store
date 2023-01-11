import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { AppLib } from './lib/appLib';
import { productsData } from './lib/data/products';
import { viewParam } from './globalTypes';
import Page404 from './components/Page404';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';

const appLib = new AppLib(productsData);

function App() {
    // @ts-ignore
    let [searchParams, setSearchParams] = useSearchParams({
        cartPriceTotal: 0,
        cartAmountTotal: 0,
        minPrice: appLib.getMinPrice(),
        maxPrice: appLib.getMaxPrice(),
        minStock: appLib.getMinStock(),
        maxStock: appLib.getMaxStock(),
        categoryArr: appLib.getCategoryProd().map(obj => {
            if (obj.view === true) {
                return obj.category;
            }
        }).join(','),
        brandArr: appLib.getBrandProd().map(obj => {
            if (obj.view === true) {
                return obj.brand;
            }
        }).join(','),
        sort: 'default',
        searchParam: 'default',
    });
    const [queryParams, setQueryParams] = useState({
        cartPriceTotal: Number(searchParams.get('cartPriceTotal')) || 0,
        cartAmountTotal: Number(searchParams.get('cartAmountTotal')) || 0,
        minPrice: Number(searchParams.get('minPrice')) || appLib.getMinPrice(),
        maxPrice: Number(searchParams.get('maxPrice')) || appLib.getMaxPrice(),
        minStock: Number(searchParams.get('minStock')) || appLib.getMinStock(),
        maxStock: Number(searchParams.get('maxStock')) || appLib.getMaxStock(),
        categoryArr: searchParams.get('categoryArr') || appLib.getCategoryProd().map(obj => {
            if (obj.view === true) {
                return obj.category;
            }
        }).join(','),
        brandArr: searchParams.get('brandArr') || appLib.getBrandProd().map(obj => {
            if (obj.view === true) {
                return obj.brand;
            }
        }).join(','),
        sort: searchParams.get('sort') || 'default',
        searchParam: searchParams.get('searchParam') || 'default',
    });

    const [products, setProducts] = useState(appLib.getProductsData());
    const [prodDetails, setProdDetails] = useState(products[0]);
    const [prodsInCart, setProdsInCart] = useState(appLib.addToCart(666));
    const [cartPriceTotal, setCartPriceTotal] = useState(appLib.getCartPriceTotal());
    const [cartAmountTotal, setCartAmountTotal] = useState(appLib.getCartAmountTotal());

    useEffect(() => {
        // @ts-ignore
        setSearchParams(queryParams);

        // applyFilters(
        //     {
        //         cartPriceTotal: queryParams.cartPriceTotal,
        //         cartAmountTotal: queryParams.cartAmountTotal,
        //         minPrice: queryParams.minPrice,
        //         maxPrice: queryParams.maxPrice,
        //         minStock: queryParams.minStock,
        //         maxStock: queryParams.maxStock,
        //         categoryArr: queryParams.categoryArr,
        //         brandArr: queryParams.brandArr,
        //         sort: queryParams.sort,
        //     });
        // applySearch(queryParams);
    }, []);


    const btnHandler = (act: string, productId: number) => {
        setProdsInCart(appLib.addToCart(productId));
        setCartAmountTotal(appLib.getCartAmountTotal());
        setCartPriceTotal(appLib.getCartPriceTotal());
    };

    const applyFilters = (viewParam: viewParam) => {
        appLib.applyFilters(viewParam);
        appLib.getViewProducts();
        setProducts(appLib.getViewProducts());
    };

    const applySearch = (searchParam: string) => {
        appLib.applySearch(searchParam);
        setProducts(appLib.getViewProducts());
    };

    return (
        <div className='App'>
            <Header
                cartPriceTotal={cartPriceTotal}
                cartAmountTotal={cartAmountTotal}
            />
            <Routes>
                {/*<Route path={`/store/:cartPriceTotal/:cartAmountTotal/`} element={<Main*/}
                <Route path={`/store`} element={<Main
                    products={products}
                    btnHandler={btnHandler}
                    applyFilters={applyFilters}
                    applySearch={applySearch}
                    queryParams={queryParams}
                />}>
                </Route>
                <Route path='/' element={<Navigate replace to='/store' />}>
                </Route>
                <Route path='/cart' element={<Cart
                    products={products}
                    btnHandler={btnHandler}
                />}>
                </Route>
                <Route path={'/product-details/:id'} element={<ProductDetails
                    products={products}
                    prod={prodDetails}
                    btnHandler={btnHandler}
                />}>
                </Route>
                <Route path='/404' element={<Page404 />}>
                </Route>
                <Route path='*' element={<Navigate replace to='/404' />}>
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}
// http://localhost:3000/store?cartPriceTotal=0&cartAmountTotal=0&minPrice=12&maxPrice=1749&minStock=4&maxStock=140&categoryArr=smartphones%2Claptops%2Cfragrances%2Cskincare&brandArr=Apple%2CSamsung%2COPPO%2CHuawei%2CMicrosoft+Surface%2CInfinix%2CHP+Pavilion%2CImpression+of+Acqua+Di+Gio%2CRoyal_Mirage%2CFog+Scent+Xpressio%2CAl+Munakh%2CLord+-+Al-Rehab%2CL%27Oreal+Paris%27%2CHemani+Tea%2CDermive%2CROREC+White+Rice%2CFair+%26+Clear&sort=default&searchParam=default
// /store/:cartPriceTotal/:cartAmountTotal/:minPrice/:maxPrice/:minStock/:maxStock/:category/:brand/:sort/:searchParam
export default App;
