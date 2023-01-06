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

const appLib = new AppLib(productsData);

function App() {
    const [products, setProducts] = useState(appLib.getProductsData());


    return (
        <div className='App'>
            <Header />
            <Router>
                <Routes>
                    <Route path='/store' element={<Main
                        products={products}
                    />}>
                    </Route>
                    <Route path='/cart' element={<Main
                        products={products}
                    />}>
                    </Route>
                    <Route path='/product-details' element={<Main
                        products={products}
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
