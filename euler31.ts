// https://projecteuler.net/problem=31

/*
In the United Kingdom the currency is made up of pound (£) and pence (p).
There are eight coins in general circulation:
  1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), and £2 (200p).
It is possible to make £2 in the following way:
  1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
How many different ways can £2 be made using any number of coins?
*/

const coins = [1, 2, 5, 10, 50, 100, 200]

function ideal_solution(amount: number, available_coins: number[]) {
  let current = amount;
  const used = {} as Record<number,number>;
  coins.sort((a,b) => b - a).forEach(coin => {
    while (coin <= current) {
      current -= coin;
      used[coin] ??= 0;
      used[coin] += 1;
    }
  });

  return used
}

function how_many_ways(amount: number): number {
  

  return 0;
}

