import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductApiActions, ProductPageActions } from './actions';


export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductPageActions.toggleShowProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductPageActions.initCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),
    on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        };
    }),
    on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(item => item.id === action.product.id ? action.product : item);
        return {
            ...state,
            products: updatedProducts,
            error: ''
        };
    }),
    on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: [...state.products, action.product],
            error: ''
        };
    }),
    on(ProductApiActions.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: state.products.filter(x => x.id !== action.productId)
        };
    }),
    on(ProductApiActions.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        };
    }),
);
