import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { AppLib } from './lib/appLib';
import { productsData } from './lib/data/products';
import { prodData } from './globalTypes';
import Page404 from './components/Page404';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';

const appLib = new AppLib(productsData);

function App() {
    const [products, setProducts] = useState(appLib.getProductsData());
    const [prodDetails, setProdDetails] = useState(products[0]);
    const [prodsInCart, setProdsInCart] = useState([]);
    const [cartPriceTotal, setCartPriceTotal] = useState(0);
    const [cartAmountTotal, setCartAmountTotal] = useState(0);


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
                    />}>
                    </Route>
                    <Route path='/' element={<Navigate replace to='/store' />}>
                    </Route>
                    <Route path='/cart' element={<Cart
                        products={products}
                    />}>
                    </Route>
                    <Route path='/product-details' element={<ProductDetails
                        prod={prodDetails}
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
