import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product:Product){
    let item = CartItems.find(c=>c.product.productId===product.productId);
    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.quantity = 1;
      cartItem.product = product;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(product:Product){
    let item= CartItems.find(c=>c.product.productId===product.productId);
    if (item) {
      if (item.quantity>1) {
        item.quantity -= 1;
      }else{
         CartItems.splice(CartItems.indexOf(item),1);
      }
    }
  }

  list(): CartItem[]{
    return CartItems;
  }
}
