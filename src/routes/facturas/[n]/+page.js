import { get } from 'svelte/store';
import { Bills } from "$lib/stores";

export function load({ params }) {
  const { n } = params;
  const bills = get(Bills);

  const match = bills.find(b => b.number == n)

  return { match, numeration: n };
}