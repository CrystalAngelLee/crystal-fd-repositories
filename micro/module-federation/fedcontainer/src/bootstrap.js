import { mount as mountProducts } from "products/Index";
import { mount as mountCart } from "cart/Index";

mountProducts(document.querySelector("dev-products"));
mountCart(document.querySelector("dev-carts"));
