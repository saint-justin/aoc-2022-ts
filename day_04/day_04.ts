import { readFile } from "../utils/helpers";

/**
 * Day 4 Part 1 - https://adventofcode.com/2022/day/4
 * 
 * Basecamp needs to be cleaned up. Each section of camp has a specific
 * ID (1 to 99) and each elf is assigned a range of sections (3-5, 6-8, etc.).
 * 
 * Assignments got bungled and some elves found themselves being assigned 
 * overlapping sections of the camp. For how many assignment pairs does one 
 * assignment fully encapsulate the other? (e.g. 4-6 encapsulates 5-6)
 */

const n_is_encapsulated = (n: number, min: number, max: number): boolean => {
  return (n >= min && n <= max);
}

const pair_is_fully_encapsulated = (range1: string, range2: string): boolean => {
  const [min1, max1] = range1.split('-').map(str => parseInt(str));
  const [min2, max2] = range2.split('-').map(str => parseInt(str));
  if (n_is_encapsulated(min1, min2, max2) && n_is_encapsulated(max1, min2, max2)) return true;
  if (n_is_encapsulated(min2, min1, max1) && n_is_encapsulated(max2, min1, max1)) return true;
  return false;
}

const calculate_encapsulated_pairs = async () => {
  const input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const pairs: string[] = input.split('\r\n');

  const total_encapsulated_pairs = pairs.reduce((prev, range_pair) => {
    const [range1, range2] = range_pair.split(',');
    if (pair_is_fully_encapsulated(range1, range2)) return prev + 1;
    return prev;
  }, 0)

  console.log(`Total encapsulated pairs: ` + total_encapsulated_pairs);
}

calculate_encapsulated_pairs();

/**
 * Day 4 Part 2 - https://adventofcode.com/2022/day/4#part2
 * 
 * The same issue is still at hand, but the elves have realized the issue still
 * remains even if only a handful of elves have double-work. How many
 * groups overlap at all?
 */

const pair_is_partially_encapsulated = (range1: string, range2: string): boolean => {
  const [min1, max1] = range1.split('-').map(str => parseInt(str));
  const [min2, max2] = range2.split('-').map(str => parseInt(str));
  if (n_is_encapsulated(min1, min2, max2) || n_is_encapsulated(max1, min2, max2)) return true;
  if (n_is_encapsulated(min2, min1, max1) || n_is_encapsulated(max2, min1, max1)) return true;
  return false;
}

const calculate_partially_encapsulated_pairs = async () => {
  const input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const pairs: string[] = input.split('\r\n');

  const total_encapsulated_pairs = pairs.reduce((prev, range_pair) => {
    const [range1, range2] = range_pair.split(',');
    if (pair_is_partially_encapsulated(range1, range2)) return prev + 1;
    return prev;
  }, 0)

  console.log(`Total partially encapsulated pairs: ` + total_encapsulated_pairs);
}

calculate_partially_encapsulated_pairs();