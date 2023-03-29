import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function parseStorage(storage) {
  if (localStorage.getItem(storage) === "undefined") return;
  return JSON.parse(localStorage.getItem(storage));
}

export const Firebase = writable({ user: false, uid: "" });

const defaultCookies = { _created: new Date(), visited: false };
export const Cookies = writable((browser && parseStorage("cookies")) || defaultCookies);
Cookies.subscribe((value) => browser && (localStorage.cookies = JSON.stringify(value)));

export const User = writable((browser && parseStorage("userData")) || {});
User.subscribe((value) => browser && (localStorage.userData = JSON.stringify(value)));

export const Bills = writable((browser && parseStorage("bills")) || []);
Bills.subscribe((value) => browser && (localStorage.bills = JSON.stringify(value)));

export const Budgets = writable((browser && parseStorage("budgets")) || []);
Budgets.subscribe((value) => browser && (localStorage.budgets = JSON.stringify(value)));

export const Deliveries = writable((browser && parseStorage("deliveries")) || []);
Deliveries.subscribe((value) => browser && (localStorage.deliveries = JSON.stringify(value)));

export const Proforma_bills = writable((browser && parseStorage("proforma_bills")) || []);
Proforma_bills.subscribe((value) => browser && (localStorage.proforma_bills = JSON.stringify(value)));

export const Clients = writable((browser && parseStorage("clients")) || []);
Clients.subscribe((value) => browser && (localStorage.clients = JSON.stringify(value)));

export const Products = writable((browser && parseStorage("products")) || []);
Products.subscribe((value) => browser && (localStorage.products = JSON.stringify(value)));

export const Providers = writable((browser && parseStorage("providers")) || []);
Providers.subscribe((value) => browser && (localStorage.providers = JSON.stringify(value)));

export const Stores = { Bills, Budgets, Deliveries, Proforma_bills, Clients, Products, Providers };

export const stores_lib = {
  bills: 'Facturas',
  budgets: 'Presupuestos',
  deliveries: 'Albaranes',
  proforma_bills: 'Proformas',
  clients: 'Clientes',
  products: 'Productos/Servicios',
  providers: 'Proveedores'
};