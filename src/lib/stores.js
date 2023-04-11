import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { updateUser } from '$lib/database/config';

export const Firebase = writable({ user: false, uid: "" });

const defaultCookies = { _created: new Date(), visited: false };
export const Cookies = writable((browser && JSON.parse(localStorage.getItem("cookies"))) || defaultCookies);
Cookies.subscribe((value) => browser && (localStorage.cookies = JSON.stringify(value)));

export const User = writable((browser && JSON.parse(localStorage.getItem("userData"))) || {});
User.subscribe(async (value) => {
  if (!browser) return;

  localStorage.userData = JSON.stringify(value);
  await updateUser(value);
});

export const Bills = writable((browser && JSON.parse(localStorage.getItem("bills"))) || []);
Bills.subscribe((value) => browser && (localStorage.bills = JSON.stringify(value)));

export const Budgets = writable((browser && JSON.parse(localStorage.getItem("budgets"))) || []);
Budgets.subscribe((value) => browser && (localStorage.budgets = JSON.stringify(value)));

export const Deliveries = writable((browser && JSON.parse(localStorage.getItem("deliveries"))) || []);
Deliveries.subscribe((value) => browser && (localStorage.deliveries = JSON.stringify(value)));

export const Proforma_bills = writable((browser && JSON.parse(localStorage.getItem("proforma_bills"))) || []);
Proforma_bills.subscribe((value) => browser && (localStorage.proforma_bills = JSON.stringify(value)));

export const Clients = writable((browser && JSON.parse(localStorage.getItem("clients"))) || []);
Clients.subscribe((value) => browser && (localStorage.clients = JSON.stringify(value)));

export const Products = writable((browser && JSON.parse(localStorage.getItem("products"))) || []);
Products.subscribe((value) => browser && (localStorage.products = JSON.stringify(value)));

export const Providers = writable((browser && JSON.parse(localStorage.getItem("providers"))) || []);
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