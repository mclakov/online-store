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
        const catArr = queryParams.categoryArr.split(',');
        const brArr = queryParams.brandArr.split(',');
        applyFilters(
            {
                minPrice: Number(queryParams.minPrice),
                maxPrice: Number(queryParams.maxPrice),
                minStock: Number(queryParams.minStock),
                maxStock: Number(queryParams.maxStock),
                categoryArr: appLib.getCategoryProd().map(obj => {
                    if (catArr.includes(obj.category)) {
                        return { category: obj.category, view: true };
                    }
                    return { category: obj.category, view: false };
                }),
                brandArr: appLib.getBrandProd().map(obj => {
                    if (brArr.includes(obj.brand)) {
                        return { brand: obj.brand, view: true };
                    }
                    return { brand: obj.brand, view: false };
                }),
                sort: queryParams.sort,
            });
        applySearch(queryParams.searchParam);
    }, []);


    const btnHandler = (act: string, productId: number) => {
        setProdsInCart(appLib.addToCart(productId));
        setCartAmountTotal(appLib.getCartAmountTotal());
        setCartPriceTotal(appLib.getCartPriceTotal());
    };

    const applyFilters = (viewParam: viewParam) => {
        queryParams.minPrice = viewParam.minPrice;
        queryParams.maxPrice = viewParam.maxPrice;
        queryParams.minStock = viewParam.minStock;
        queryParams.maxStock = viewParam.maxStock;
        queryParams.categoryArr = viewParam.categoryArr.map(obj => {
            if (obj.view === true) {
                return obj.category;
            }
        }).join(',');
        queryParams.brandArr = viewParam.brandArr.map(obj => {
            if (obj.view === true) {
                return obj.brand;
            }
        }).join(','),
            queryParams.sort = viewParam.sort;

        // @ts-ignore
        setSearchParams(queryParams);


        appLib.applyFilters(viewParam);
        appLib.getViewProducts();
        setProducts(appLib.getViewProducts());
    };

    const applySearch = (searchParam: string) => {
        queryParams.searchParam = searchParam;
        // @ts-ignore
        setSearchParams(queryParams);
        appLib.applySearch(searchParam);
        setProducts(appLib.getViewProducts());
    };

    const resetFilters = () => {
        applyFilters(
            {
                minPrice: appLib.getMinPrice(),
                maxPrice: appLib.getMaxPrice(),
                minStock: appLib.getMinStock(),
                maxStock: appLib.getMaxStock(),
                categoryArr: appLib.getCategoryProd(),
                brandArr: appLib.getBrandProd(),
                sort: 'default',
            });
        applySearch('default');
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
                    resetFilters={resetFilters}
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

export default App;
