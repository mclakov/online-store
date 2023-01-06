import { prodData } from '../globalTypes';

class AppLib {
    public products: prodData[] ;

    constructor(productsData: prodData[]) {
        this.products = productsData;
    }

    getProductsData() {
        return this.products;
    }

}

export {AppLib};
