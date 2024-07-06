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
    // check if we have item 
    let isItemExists: boolean = false;
    let existingCartItem !: CartItem; 

    if (this.cartItems.length > 0) {

      existingCartItem != this.cartItems.find(currentItem => currentItem.id == cartItem.id);

      isItemExists = (existingCartItem != undefined);
    }

    if (isItemExists) {
      existingCartItem.quantity++;

    }
    else {
      this.cartItems.push(cartItem);
    }


    //compute cart total price and quantity 
    this.computeCartTotals();

  }
  computeCartTotals() {
    let totalPriceValue :number = 0 ;
    let totalQuantityValue : number = 0 ;

    for(let item of this.cartItems){
      totalPriceValue+= item.unitPrice * item.quantity; 
      totalQuantityValue += item.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
