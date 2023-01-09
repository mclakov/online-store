import { prodData, viewParam, viewCategoryArr, viewBrandArr } from '../globalTypes';

class AppLib {
    public products: prodData[];
    public productsView: prodData[];
    public productsInCart: prodData[];
    public cartPriceTotal: number;
    public cartAmountTotal: number;
    public categoryArr: viewCategoryArr[];
    public brandArr: viewBrandArr[];
    public priceArr: number[];
    public stockArr: number[];
    public minPrice: number;
    public maxPrice: number;
    public minStock: number;
    public maxStock: number;

    constructor(productsData: prodData[]) {
        this.products = productsData;
        this.productsView = [];
        this.productsInCart = [];
        this.cartPriceTotal = 0;
        this.cartAmountTotal = 0;
        this.categoryArr = [];
        this.brandArr = [];
        this.priceArr = [];
        this.stockArr = [];
        this.minPrice = 0;
        this.maxPrice = 0;
        this.minStock = 0;
        this.maxStock = 0;
    }

    getProductsData() {
        return this.products;
    }

    getViewProducts() {
        console.log('this.productsView = ', this.productsView);
        return this.productsView;
    }

    addToCart(id: number) {
        const index = this.products.findIndex(prod => prod.id === id);
        if (index !== -1 && this.products[index].stock !== 0) {
            this.productsInCart.push(this.products[index]);
            this.products[index].stock = this.products[index].stock - 1;
        }
        return this.productsInCart;
    }

    getCartPriceTotal() {
        this.cartPriceTotal = this.productsInCart.reduce((acc, curVal) => acc + curVal.price, 0);
        return this.cartPriceTotal;
    }

    getCartAmountTotal() {
        return this.cartAmountTotal = this.productsInCart.length;
    }

    getProductDetails(id: number) {
        const index = this.products.findIndex(prod => prod.id === id);
        if (index !== -1) {
            return this.products[index];
        }
        return this.products[0];
    }

    getCategoryProd() {
        const categoryArr = this.products.map((prod: prodData) => {
            return prod.category;
        });
        const categoryArrUnique = [...new Set(categoryArr)];
        this.categoryArr = categoryArrUnique.map((prod: string) => {
            return { category: prod, view: true }
        });
        return this.categoryArr;
    }

    getBrandProd() {
        const brandArr = this.products.map((prod: prodData) => {
            return prod.brand;
        });
        const categoryArrUnique = [...new Set(brandArr)];
        this.brandArr = categoryArrUnique.map((prod: string) => {
            return { brand: prod, view: true }
        });
        return this.brandArr;
    }

    getPriceProd() {
        const priceArr = this.products.map((prod: prodData) => prod.price);
        const set = new Set(priceArr);
        this.priceArr = [...set].map(elem => Number(elem));
        return this.priceArr;
    }

    getStockProd() {
        const stockArr = this.products.map((prod: prodData) => prod.stock);
        const set = new Set(stockArr);
        this.stockArr = [...set].map(elem => Number(elem));
        return this.stockArr;
    }

    getMinPrice() {
        this.minPrice = Math.min(...this.getPriceProd());
        return this.minPrice;
    }

    getMaxPrice() {
        this.maxPrice = Math.max(...this.getPriceProd());
        return this.maxPrice;
    }

    getMinStock() {
        this.minStock = Math.min(...this.getStockProd());
        return this.minStock;
    }

    getMaxStock() {
        this.maxStock = Math.max(...this.getStockProd());
        return this.maxStock;
    }

    applyFilterPrice(min: number, max: number) {
        const productsFiltred = this.products.filter(prod => prod.price >= min && prod.price <= max);
        this.productsView = Object.assign([], productsFiltred);
    }

    applyFilterStock(min: number, max: number) {
        const productsFiltred = this.productsView.filter(prod => prod.stock >= min && prod.stock <= max);
        this.productsView = Object.assign([], productsFiltred);
    }

    applyFilterCategory(categoryArr: viewCategoryArr[]) {
        const productsFiltred = this.productsView.filter(prod => {
            const index = categoryArr.findIndex(obj => obj.category === prod.category);
            return categoryArr[index].view;
            });
        this.productsView = Object.assign([], productsFiltred);
    }

    applyFilterBrand(brandArr: viewBrandArr[]) {
        const productsFiltred = this.productsView.filter(prod => {
            const index = brandArr.findIndex(obj => obj.brand === prod.brand);
            return brandArr[index].view;
        });
        this.productsView = Object.assign([], productsFiltred);
    }

    // sortByField(field) {
    //     return (a, b) => a[field] > b[field] ? 1 : -1;
    // }

    applySort(sort: string) {
        const productsSorted = this.productsView;

        if (sort === 'price-ASC') {
            const productsSorted = this.productsView.sort((a, b) => {
                return a.price > b.price ? 1 : -1;
            });
        }

        if (sort === 'price-DESC') {
            const productsSorted = this.productsView.sort((a, b) => {
                return a.price < b.price ? 1 : -1;
            });
        }

        if (sort === 'rating-ASC') {
            const productsSorted = this.productsView.sort((a, b) => {
                return a.rating > b.rating ? 1 : -1;
            });
        }

        if (sort === 'rating-DESC') {
            const productsSorted = this.productsView.sort((a, b) => {
                return a.rating < b.rating ? 1 : -1;
            });
        }

        if (sort === 'discount-ASC') {
            const productsSorted = this.productsView.sort((a, b) => {
                return a.discountPercentage > b.discountPercentage ? 1 : -1;
            });
        }

        if (sort === 'discount-DESC') {
            const productsSorted = this.productsView.sort((a, b) => {
                return a.discountPercentage < b.discountPercentage ? 1 : -1;
            });
        }
        this.productsView = Object.assign([], productsSorted);
    }

    applyFilters(viewParam: viewParam) {
        this.applyFilterPrice(viewParam.minPrice, viewParam.maxPrice);
        this.applyFilterStock(viewParam.minStock, viewParam.maxStock);
        this.applyFilterCategory(viewParam.categoryArr);
        this.applyFilterBrand(viewParam.brandArr);
        this.applySort(viewParam.sort);
    }
}

export { AppLib };
