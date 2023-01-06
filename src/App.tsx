import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { AppLib } from './lib/appLib';
import { productsData } from './lib/data/products';
import { prodData } from './globalTypes';

const appLib = new AppLib(productsData);

function App() {
    const [products, setProducts] = useState(appLib.getProductsData());


    return (
        <div className='App'>
            <Header />
            <Main
                products={products}
            />
            <Footer />
        </div>
    );
}


export default App;
