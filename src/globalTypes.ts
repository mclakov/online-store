export interface prodData {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string [];
}

export interface propsSP {
    cartPriceTotal: number;
    cartAmountTotal: number;
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
    categoryArr: string;
    brandArr: string;
    sort: string;
    searchParam: string;
}

export interface viewCategoryArr {
    category: string;
    view: boolean;
}

export interface viewBrandArr {
    brand: string;
    view: boolean;
}

export interface viewParam {
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
    categoryArr: viewCategoryArr[];
    brandArr: viewBrandArr[];
    sort: string;
}

export interface AppProps {
    products: prodData;
}

export type getPriceFun = () => number[];
export type resetFilters = () => void;
export type handlerFunction = (act: string, productId: number) => void;
export type applyF = (viewParam: viewParam) => void;
export type applyS = (searchParam: string) => void;

export interface Iprops {
    cartPriceTotal: number;
    cartAmountTotal: number;
    products: prodData[];
    btnHandler: handlerFunction;
    applyFilters: applyF;
    applySearch: applyS;
    prod: prodData;
    act: string;
    btnName: string;
    productId: number;
    class: string;
    key: number;
}

export interface propsBtn {
    btnHandler: handlerFunction;
    act: string;
    btnName: string;
    productId: number;
    class: string;
}

export interface propsFilt {
    applyFilters: applyF;
    applySearch: applyS;
    products: prodData[];
    queryParams: propsSP;
    resetFilters: resetFilters;
}

export interface propsGods {
    btnHandler: handlerFunction;
    products: prodData[];
}

export interface propsProd {
    key: number;
    products: prodData[];
    prod: prodData;
    btnHandler: handlerFunction;
}

export interface propsCart {
    products: prodData[];
    btnHandler: handlerFunction;
}

export interface propsMain {
    applyFilters: applyF;
    applySearch: applyS;
    products: prodData[];
    btnHandler: handlerFunction;
    queryParams: propsSP;
    resetFilters: resetFilters;
}

export interface propsPD {
    prod: prodData;
    products: prodData[];
    btnHandler: handlerFunction;
}

export interface propsH {
    cartPriceTotal: number;
    cartAmountTotal: number;
}
