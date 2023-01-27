import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const store = writable();
export const User = writable((browser && JSON.parse(localStorage.getItem("User"))) || {});

User.subscribe((val) => browser && (localStorage.User = JSON.stringify(val)));