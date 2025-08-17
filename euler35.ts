// https://projecteuler.net/problem=35

/*
The number, 197, is called a circular prime because all rotations of the digits:
197, 971, and 719, are themselves prime.

There are thirteen such primes below 100:
2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

How many circular primes are there below one million?
*/

// We solve this efficiently by:
// 1) Generating all primes < 1_000_000 via an odd-only Sieve of Eratosthenes
// 2) Pruning candidates that contain an even digit or the digit 5 (except single-digit primes)
// 3) Checking digit-rotations using arithmetic (no strings) and verifying primality via sieve lookup

// Optimized odd-only sieve for primes up to `limit`.
// Stores primality for odd numbers only in a compact byte array, and exposes both
// a list of primes and an O(1) primality predicate for membership checks.
function sievePrimesOdd(limit: number): {
  isPrime: (n: number) => boolean,
  primes: number[],
} {
  if (limit < 2) return { isPrime: () => false, primes: [] };
  const half = limit >> 1; // number of odd slots up to limit
  const isPrimeOdd = new Uint8Array(half + 1);
  isPrimeOdd.fill(1);
  isPrimeOdd[0] = 0; // number 1 is not prime (index 0 => 1)
  const sqrtLimit = Math.floor(Math.sqrt(limit));
  for (let i = 1; (2 * i + 1) <= sqrtLimit; i++) {
    if (isPrimeOdd[i]) {
      const p = 2 * i + 1;
      let j = ((p * p) - 1) >> 1; // index for p*p
      for (; j <= half; j += p) {
        isPrimeOdd[j] = 0;
      }
    }
  }
  const primes: number[] = [2];
  for (let i = 1; i <= half; i++) {
    if (isPrimeOdd[i]) primes.push(2 * i + 1);
  }
  const isPrime = (n: number): boolean => {
    if (n === 2) return true;
    if (n < 2 || (n & 1) === 0) return false;
    const idx = (n - 1) >> 1;
    return idx >= 0 && idx < isPrimeOdd.length ? isPrimeOdd[idx] === 1 : false;
  };
  return { isPrime, primes };
}

const LIMIT = 1_000_000;
const sieve = sievePrimesOdd(LIMIT);

function getDigitRotations(n: number): number[] {
  // Generate all unique left-rotations of n using arithmetic only.
  // Example: 197 -> 971 -> 719 -> 197
  let x = n;
  let pow10 = 1;
  let digits = 1;
  while (x >= 10) {
    x = Math.floor(x / 10);
    pow10 *= 10;
    digits++;
  }
  const seen = new Set<number>();
  let rotated = n;
  for (let i = 0; i < digits; i++) {
    if (!seen.has(rotated)) seen.add(rotated);
    const head = Math.floor(rotated / pow10);
    const tail = rotated % pow10;
    rotated = tail * 10 + head;
  }
  return Array.from(seen);
}

function digitsAllowed(n: number): boolean {
  // For multi-digit circular primes, digits cannot include any even digit or 5.
  // Otherwise some rotation will be divisible by 2 or 5.
  if (n < 10) return true; // allow 2 and 5 as single-digit circular primes
  while (n > 0) {
    const d = n % 10;
    if (d % 2 === 0 || d === 5) return false; // filters 0,2,4,6,8 and 5
    n = Math.floor(n / 10);
  }
  return true;
}

function findCircularPrimes(limit: number): { count: number, primes: number[], groups: number[][] } {
  // We iterate all primes and check their rotations exactly once using a visited array.
  // If all rotations are prime, we add the number of distinct rotations to the count
  // and collect the rotation set in groups.
  const visited = new Uint8Array(limit + 1);
  const groups: number[][] = [];
  let count = 0;
  for (const p of sieve.primes) {
    if (p >= limit) break;
    if (visited[p]) continue;
    if (p >= 10 && !digitsAllowed(p)) {
      visited[p] = 1;
      continue;
    }
    const rotations = getDigitRotations(p);
    let allPrime = true;
    for (const r of rotations) {
      if (!sieve.isPrime(r)) { allPrime = false; break; }
    }
    for (const r of rotations) {
      if (r <= limit) visited[r] = 1;
    }
    if (allPrime) {
      groups.push(rotations.filter(r => r < limit));
      count += rotations.length;
    }
  }
  const primes = groups.flat().sort((a, b) => a - b);
  return { count, primes, groups };
}

// The answer to Project Euler 35: number of circular primes below one million
const { count, primes, groups } = findCircularPrimes(LIMIT);
console.log(`Circular primes below ${LIMIT}: ${count}`);
console.log(`Values: ${primes.join(', ')}`);
