import React, { useState } from 'react';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import { prodData, getPriceFun, propsFilt } from '../../src/globalTypes';
import { AppLib } from '../../src/lib/appLib';
import { productsData } from '../../src/lib/data/products';

const appLib = new AppLib(productsData);

const Filters = (props: propsFilt) => {

    const catArr = props.queryParams.categoryArr.split(',');
    const brArr = props.queryParams.brandArr.split(',');

    const [viewParam, setViewParam] = useState({
        minPrice: props.queryParams.minPrice,
        maxPrice: props.queryParams.maxPrice,
        minStock: props.queryParams.minStock,
        maxStock: props.queryParams.maxStock,
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
        sort: props.queryParams.sort,
    });

    const [searchParam, setSearchParam] = useState(props.queryParams.searchParam === 'default' ? '' : props.queryParams.searchParam);

    const rangeHandlerPrice = (e: ChangeResult) => {
        if (viewParam.minPrice === e.minValue && viewParam.maxPrice === e.maxValue) return;
        viewParam.minPrice = e.minValue;
        viewParam.maxPrice = e.maxValue;
        props.applyFilters(viewParam);
    };

    const rangeHandlerStock = (e: ChangeResult) => {
        if (viewParam.minStock === e.minValue && viewParam.maxStock === e.maxValue) return;
        viewParam.minStock = e.minValue;
        viewParam.maxStock = e.maxValue;
        props.applyFilters(viewParam);
    };

    const categoryFilterHandler = (prod: string) => {
        viewParam.categoryArr.forEach(obj => {
            if (prod === obj.category) obj.view = !obj.view;
        });
        setViewParam(Object.assign({}, viewParam));
        props.applyFilters(viewParam);
    };

    const brandFilterHandler = (prod: string) => {
        viewParam.brandArr.forEach(obj => {
            if (prod === obj.brand) obj.view = !obj.view;
        });
        setViewParam(Object.assign({}, viewParam));
        props.applyFilters(viewParam);
    };

    const createCategoryFilter = () => {
        return viewParam.categoryArr.map((prod, index) => {
            return (
                <div
                    key={index}
                >
                    <>
                        <input
                            type='checkbox'
                            key={index}
                            checked={prod.view}
                            onChange={() => {
                                categoryFilterHandler(prod.category);
                            }}
                        />
                        {prod.category}
                    </>
                </div>
            );
        });
    };

    const createBrandFilter = () => {
        return viewParam.brandArr.map((prod, index) => {
            return (
                <div
                    key={index}
                >
                    <>
                        <input
                            type='checkbox'
                            key={index}
                            checked={prod.view}
                            onChange={() => {
                                brandFilterHandler(prod.brand);
                            }}
                        />
                        {prod.brand}
                    </>
                </div>
            );
        });
    };

    return (
        <div className='filters'>
            <div className='filters-title'>Category</div>
            <div className='filters-category'>
                {createCategoryFilter()}
            </div>
            <div className='filters-title'>Brand</div>
            <div className='filters-brand'>
                {createBrandFilter()}
            </div>
            <div className='filters-title'>Price</div>
            <div className='filters-price'>
                <MultiRangeSlider
                    min={appLib.getMinPrice()}
                    max={appLib.getMaxPrice()}
                    step={50}
                    minValue={viewParam.minPrice}
                    maxValue={viewParam.maxPrice}
                    onInput={(e) => rangeHandlerPrice(e)}
                />
            </div>
            <div className='filters-title'>Stock</div>
            <div className='filters-stock'>
                <MultiRangeSlider
                    min={appLib.getMinStock()}
                    max={appLib.getMaxStock()}
                    step={5}
                    minValue={viewParam.minStock}
                    maxValue={viewParam.maxStock}
                    onInput={(e) => rangeHandlerStock(e)}
                />
            </div>
            <div className='filters-title'>Sort</div>
            <form>
                <div className='radio'>
                    <label>
                        <input
                            type='radio'
                            value='price-ASC'
                            checked={viewParam.sort === 'price-ASC'}
                            onChange={() => {
                                viewParam.sort = 'price-ASC';
                                setViewParam(Object.assign({}, viewParam));
                                props.applyFilters(viewParam);
                            }}
                        />
                        ASC price
                    </label>
                </div>
                <div className='radio'>
                    <label>
                        <input
                            type='radio'
                            value='price-DESC'
                            checked={viewParam.sort === 'price-DESC'}
                            onChange={() => {
                                viewParam.sort = 'price-DESC';
                                setViewParam(Object.assign({}, viewParam));
                                props.applyFilters(viewParam);
                            }}
                        />
                        DESC price
                    </label>
                </div>
                <div className='radio'>
                    <label>
                        <input
                            type='radio'
                            value='rating-ASC'
                            checked={viewParam.sort === 'rating-ASC'}
                            onChange={() => {
                                viewParam.sort = 'rating-ASC';
                                setViewParam(Object.assign({}, viewParam));
                                props.applyFilters(viewParam);
                            }}
                        />
                        ASC rating
                    </label>
                </div>
                <div className='radio'>
                    <label>
                        <input
                            type='radio'
                            value='rating-DESC'
                            checked={viewParam.sort === 'rating-DESC'}
                            onChange={() => {
                                viewParam.sort = 'rating-DESC';
                                setViewParam(Object.assign({}, viewParam));
                                props.applyFilters(viewParam);
                            }}
                        />
                        DESC rating
                    </label>
                </div>
                <div className='radio'>
                    <label>
                        <input
                            type='radio'
                            value='discount-ASC'
                            checked={viewParam.sort === 'discount-ASC'}
                            onChange={() => {
                                viewParam.sort = 'discount-ASC';
                                setViewParam(Object.assign({}, viewParam));
                                props.applyFilters(viewParam);
                            }}
                        />
                        ASC discount
                    </label>
                </div>
                <div className='radio'>
                    <label>
                        <input
                            type='radio'
                            value='discount-DESC'
                            checked={viewParam.sort === 'discount-DESC'}
                            onChange={() => {
                                viewParam.sort = 'discount-DESC';
                                setViewParam(Object.assign({}, viewParam));
                                props.applyFilters(viewParam);
                            }}
                        />
                        DESC discount
                    </label>
                </div>
            </form>
            <div className='filters-title'>Search</div>
            <input
                type='text'
                onChange={(e) => {
                    setSearchParam(e.target.value.toLowerCase());
                    props.applySearch(e.target.value.toLowerCase());
                }}
                value={searchParam}
            />
            <br />
            <button
                onClick={() => {
                    props.resetFilters();
                    setSearchParam('');
                    setViewParam({
                        minPrice: appLib.getMinPrice(),
                        maxPrice: appLib.getMaxPrice(),
                        minStock: appLib.getMinStock(),
                        maxStock: appLib.getMaxStock(),
                        categoryArr: appLib.getCategoryProd(),
                        brandArr:appLib.getBrandProd(),
                        sort: 'default',
                    });
                }}
            >RESET
            </button>
        </div>
    );
};

export default Filters;
