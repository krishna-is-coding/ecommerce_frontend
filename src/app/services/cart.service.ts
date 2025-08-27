import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../common/product';

export interface CartItem {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  // Observables for header updates
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  addToCart(product: Product) {
    let existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({
        id: product.id ?? 0,
        name: product.name ?? '',
        unitPrice: product.unitPrice ?? 0,
        quantity: 1,
         imageUrl: product.imageUrl
      });
    }

    this.computeCartTotals();
  }

  private computeCartTotals() {
    let price = 0;
    let qty = 0;

    for (let item of this.items) {
      price += item.unitPrice * item.quantity;
      qty += item.quantity;
    }

    this.totalPrice.next(price);
    this.totalQuantity.next(qty);
  }
}
