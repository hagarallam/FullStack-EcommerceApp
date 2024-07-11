import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }


  addToCart(cartItem: CartItem) {

    let existingCartItem = this.cartItems.find(currentItem => currentItem.id == cartItem.id);
    if (existingCartItem) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cartItem);
    }

    //compute cart total price and quantity 
    this.computeCartTotals();

  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let item of this.cartItems) {
      totalPriceValue += item.unitPrice * item.quantity;
      totalQuantityValue += item.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItem: CartItem) {

    cartItem.quantity--;

    if(cartItem.quantity === 0){
      this.remove(cartItem);
    }
    else{
      this.computeCartTotals();
    }
    
  }
  remove(cartItem: CartItem) {

    // get index of the item 

    let index = this.cartItems.findIndex(item => item.id === cartItem.id);
    // if found remove it from arrey

    if(index>-1){
      this.cartItems.splice(index,1);
      this.computeCartTotals();
    }
  }
}
