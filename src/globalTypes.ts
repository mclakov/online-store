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

export interface  viewCategoryArr {
    category: string;
    view: boolean;
}

export interface  viewBrandArr {
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

// export type Callback<T> = (data?: T) => void;
export type getPriceFun = () => number[];



export type Callback = (data?: any) => void;
// export type CallbackBTN = (data: prodData, act: string) => {id: string, act: string};
export type CallbackBTN = (act: string) => void;


type CallbackFunction = () => void;

export interface CallbackSource {
    data: string;
}
