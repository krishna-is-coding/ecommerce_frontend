import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Get cart items from CartService
    this.updateCart();
    // Subscribe to changes in cart totals
    this.cartService.totalPrice.subscribe(price => this.totalPrice = price);
  }

  updateCart() {
    // Copy of items for display
    this.cartItems = [...(this.cartService as any).items]; // private items access
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.cartService['computeCartTotals']();
    this.updateCart();
  }

  decreaseQuantity(item: CartItem) {
    if(item.quantity > 1){
      item.quantity--;
      this.cartService['computeCartTotals']();
      this.updateCart();
    }
  }

  removeItem(item: CartItem) {
    (this.cartService as any).items = (this.cartService as any).items.filter((i: CartItem) => i.id !== item.id);

    this.cartService['computeCartTotals']();
    this.updateCart();
  }

  proceedToPurchase() {
    alert(`Proceeding to purchase. Total amount: $${this.totalPrice.toFixed(2)}`);
    // Here you can implement checkout process
  }
}

