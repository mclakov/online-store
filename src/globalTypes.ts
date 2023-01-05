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

// export type Callback<T> = (data?: T) => void;



export type Callback = (data?: any) => void;
// export type CallbackBTN = (data: prodData, act: string) => {id: string, act: string};
export type CallbackBTN = (act: string) => void;


type CallbackFunction = () => void;

export interface CallbackSource {
    data: string;
}
