import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { filter, Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductPageActions } from '../state/actions';
import { State, getShowProductCode, getCurrentProduct, getProducts, getError } from '../state';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    private store: Store<State>,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.products$ = this.store.select(getProducts);

    this.store.dispatch(ProductPageActions.loadProducts());

    this.displayCode$ = this.store.select(getShowProductCode);
    this.errorMessage$ = this.store.select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleShowProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
