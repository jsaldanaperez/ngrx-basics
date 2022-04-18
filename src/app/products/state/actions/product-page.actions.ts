import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const toggleShowProductCode = createAction('[Product Page] Toggle Product Code');
export const setCurrentProduct = createAction('[Product Page] Set Current Product', props<{ currentProductId: number }>());
export const clearCurrentProduct = createAction('[Product Page] Clear Current Product');
export const initCurrentProduct = createAction('[Product Page] Init Current Product');

export const loadProducts = createAction('[Product Page] Load');
export const updateProduct = createAction('[Product Page] Update Product', props<{ product: Product }>());
export const createProduct = createAction('[Product Page] create Product', props<{ product: Product }>());
export const deleteProduct = createAction('[Product Page] delete Product', props<{ productId: number }>());



