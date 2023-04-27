import { readFile } from '../utils/helpers';

/**
 * Day 3 Part 1 - https://adventofcode.com/2022/day/3
 * 
 * The elf tasked with loading all the rucksacks with supplies for
 * the journey through the jundle didn't do their job right. Each ruck
 * has two pockets of equal size (the 1st and 2nd halves of each input 
 * line). One component is shared by both halves for each given ruck. 
 * 
 * Find the shared component, calculate its priority (its position in 
 * the alphabet a-zA-Z from 1 to 52) and sum all priorities for the solution.
 */

// Should only be used to find a single shared char between two sets
const find_shared_char = (str1: string, str2: string): string => {
  for (const char of str1) {
    if (str2.indexOf(char) !== -1) return char;
  }
  throw new Error(`Invalid string set, no shared characters: [${str1}] [${str2}]`);
}

const calculate_priority_value = (ch: string): number => {
  if (ch.length > 1) throw new Error('String passed to calculate_priority_sum instead of character');
  const char_index =  `_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.indexOf(ch);
  if (char_index !== -1) return char_index;
  throw new Error(`Invalid character passed [${ch}]`);
}

const calculate_priority_sum = async () => {
  const input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  
  const priority_sum: number = input.split('\r\n').reduce((prev, ruck) => {
    const shared_char = find_shared_char(ruck.slice(0, ruck.length / 2), ruck.slice(ruck.length / 2));
    return prev + calculate_priority_value(shared_char);
  }, 0);

  console.log(`Priority Sum: ${priority_sum}`);
}

calculate_priority_sum();


/**
 * Day 3 Part 2 - https://adventofcode.com/2022/day/3#part2
 * 
 * The elves found another issue. They forgot which groups they're
 * supposed to be a part of. Each group is a set of 3 back-to-back elves
 * there's only one item of each type carried by all 3 elves. 
 * 
 * Find the priority (badge value) sum of each given group for the solution.
 */
const find_shared_chars = (str1: string, str2: string): string[] => {
  const shared_chars = str1.split('').filter(ch => str2.includes(ch))
  if (shared_chars.length > 0) return shared_chars;
  throw new Error(`Invalid string set, no shared characters: [${str1}] [${str2}]`);
}

const calculate_group_priority_sum = async () => {
  const input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const rucks = input.split('\r\n');
  let priority_sum = 0;
  
  for (let i=0; i<rucks.length; i+=3) {
    const group_rucks: string[] = rucks.slice(i, i+3);
    const shared_chars_in_first_pair = find_shared_chars(group_rucks[0], group_rucks[1]);
    const group_badge = find_shared_char(shared_chars_in_first_pair.join(''), group_rucks[2])
    priority_sum += calculate_priority_value(group_badge);
  }

  console.log(`Group Priority Sum: ${priority_sum}`);
}

calculate_group_priority_sum();
