// Run with `npm test` (Node >= 22.6 strips TypeScript types natively).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addItem,
  clampQuantity,
  getCouponRate,
  getUnitPrice,
  quantityInCart,
  removeItem,
  setItemQuantity,
  summarize,
} from "../app/store/cartUtils.ts";

// `quantity` on an API product is its stock.
const product = (id, price, stock, discount = 0) => ({
  _id: id,
  name: `p-${id}`,
  price,
  discount,
  quantity: stock,
});

test("getUnitPrice applies the percentage discount and rounds", () => {
  assert.equal(getUnitPrice({ price: 100000, discount: 0 }), 100000);
  assert.equal(getUnitPrice({ price: 100000, discount: 15 }), 85000);
  assert.equal(getUnitPrice({ price: 999, discount: 33 }), 669);
  // Defensive against bad data
  assert.equal(getUnitPrice({ price: 1000, discount: 150 }), 0);
  assert.equal(getUnitPrice({ price: 1000, discount: -5 }), 1000);
  assert.equal(getUnitPrice({ price: undefined, discount: undefined }), 0);
});

test("addItem stores cart quantity separately from stock", () => {
  const cart = addItem([], product("a", 1000, 5), 2);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);
  assert.equal(cart[0].stock, 5);
});

test("adding the same product repeatedly accumulates but never exceeds stock", () => {
  let cart = [];
  for (let i = 0; i < 10; i++) cart = addItem(cart, product("a", 1000, 3), 1);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 3);
});

test("addItem ignores invalid quantities and out-of-stock products", () => {
  assert.deepEqual(addItem([], product("a", 1000, 5), 0), []);
  assert.deepEqual(addItem([], product("a", 1000, 5), -1), []);
  assert.deepEqual(addItem([], product("a", 1000, 5), Number.NaN), []);
  assert.deepEqual(addItem([], product("a", 1000, 0), 1), []);
});

test("setItemQuantity clamps to [1, stock] and ignores unknown ids", () => {
  const cart = addItem([], product("a", 1000, 4), 1);
  assert.equal(setItemQuantity(cart, "a", 3)[0].quantity, 3);
  assert.equal(setItemQuantity(cart, "a", 99)[0].quantity, 4);
  assert.equal(setItemQuantity(cart, "a", 0)[0].quantity, 1);
  assert.equal(setItemQuantity(cart, "a", Number.NaN)[0].quantity, 1);
  assert.equal(setItemQuantity(cart, "missing", 2), cart);
});

test("legacy cart items without stock are not capped", () => {
  const legacy = [{ ...product("a", 1000, undefined), quantity: 2 }];
  delete legacy[0].stock;
  assert.equal(setItemQuantity(legacy, "a", 50)[0].quantity, 50);
  assert.equal(clampQuantity(7, undefined), 7);
});

test("summarize derives totals from the cart (no drift after add/remove/update)", () => {
  let cart = [];
  cart = addItem(cart, product("a", 100000, 10, 10), 2); // 90 000 x2
  cart = addItem(cart, product("b", 50000, 10), 1); // 50 000
  cart = setItemQuantity(cart, "b", 3); // 150 000
  cart = addItem(cart, product("c", 1000, 10), 1);
  cart = removeItem(cart, "c");

  const s = summarize(cart);
  assert.equal(s.totalItems, 5);
  assert.equal(s.subtotal, 330000);
  assert.equal(s.discount, 0);
  assert.equal(s.total, 330000);

  const withCoupon = summarize(cart, " FAN10 ");
  assert.equal(withCoupon.discount, 33000);
  assert.equal(withCoupon.total, 297000);

  assert.deepEqual(summarize([]), { totalItems: 0, subtotal: 0, discount: 0, total: 0 });
});

test("coupon codes are case/whitespace-insensitive and unknown codes give 0", () => {
  assert.equal(getCouponRate("fan10"), 0.1);
  assert.equal(getCouponRate("  FaN10 "), 0.1);
  assert.equal(getCouponRate("nope"), 0);
  assert.equal(getCouponRate(undefined), 0);
});

test("quantityInCart", () => {
  const cart = addItem([], product("a", 1000, 5), 2);
  assert.equal(quantityInCart(cart, "a"), 2);
  assert.equal(quantityInCart(cart, "b"), 0);
});
