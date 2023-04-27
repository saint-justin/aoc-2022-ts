import { readFile } from "../utils/helpers";

/** 
 * Day 1 Part 1: https://adventofcode.com/2022/day/1
 * 
 * Elves are carrying food. Find which elf is carrying the most. Elves are represented
 * as a series of single-line numbers separated by blank new lines. One elf is the sum 
 * of all contiguous lines in a row added together.
 */
const find_elf_carrying_most_food = async () => {
  const elf_calorie_counts = await readFile('./input.txt');
  const split_counts: string[] = elf_calorie_counts?.split('\r\n') || [];
  let current: number = 0;
  let max: number = -1;
  split_counts.forEach((line) => {
    if (!line) {
      if (current > max) {
        max = current;
      }
      current = 0;
    } else {
      current += parseInt(line);
    }
  })
  console.log('Max Weight: ' + max);
}

find_elf_carrying_most_food();

/** 
 * Day 1 Part 2: https://adventofcode.com/2022/day/1#part2
 * 
 * Same as the first but find the top 3
 */
const find_top_three_elves = async () => {
  const file_input = await readFile('./input.txt');
  const split_counts: string[] = file_input?.split('\r\n') || [];
  const elf_calorie_counts: number[] = [];
  let current: number = 0;

  split_counts.forEach((line) => {
    if (!line) {
      elf_calorie_counts.push(current);
      current = 0;
    } else {
      current += parseInt(line);
    }
  });

  console.log(elf_calorie_counts);

  const top_three_sum = elf_calorie_counts
    .sort((a, b) => b - a)                   // sort descrending
    .slice(0, 3)                             // get top 3
    .reduce((prev, curr) => prev + curr, 0); // sum

  console.log('Top 3 Combined: ' + top_three_sum);
}

find_top_three_elves();