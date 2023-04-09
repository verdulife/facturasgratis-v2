import { get } from 'svelte/store';
import { Bills } from "$lib/stores";

export function load({ params }) {
  const { id } = params;
  const bills = get(Bills);

  const match = bills.find(b => b.number == id)

  return { match };
}