// https://projecteuler.net/problem=31

/*
In the United Kingdom the currency is made up of pound (£) and pence (p).
There are eight coins in general circulation:
  1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), and £2 (200p).
It is possible to make £2 in the following way:
  1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
How many different ways can £2 be made using any number of coins?
*/

const base_coins = [10, 5, 1]
const found = {} as Record<number,number>;

function number_of_ways(current: number, coins: number[]): number {

  console.log("Currently looking at: " + current.toString());
  console.log("Available coins are: " + coins);
  console.log("\n")

  // create a record of this number in our hash map
  // if it exists, return its count, no need to recompute
  if (!found[current]) {
    found[current] = 0;
  } else {
    return found[current];
  }

  // select the biggest coin in the array (first one)
  const biggest_coin = coins[0];

  // if we are at one, there is only one way
  // add one more way found and then return it
  if (biggest_coin === 1) {
    found[current] += 1;
    return found[current];
  }

  // check if current is big enough for our coin
  if (current > biggest_coin) {
    // find number of ways minus that coin
    found[current] += 1 + number_of_ways(current - biggest_coin, coins);
    return found[current]
  } else {
    found[current] += 1 + number_of_ways(current, coins.slice(1,coins.length));
    return found[current]
  }

}

const answer = number_of_ways(23, base_coins)
console.log(answer)
console.log(found)