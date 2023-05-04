import { readFile } from "../utils/helpers";

/**
 * Day 6 Part 1 - https://adventofcode.com/2022/day/6
 * 
 * The elves are setting up their communications systems!
 * Your device needs to be able to lock on to their signals
 * and to do that you need to find the start-of-packet signal
 * in the middle of their data streams. SOPs are delineated by
 * four contiguous characters that repeat no single character.
 * 
 * How many characters pass before you find the start-of-packet
 * signal in the input?
 */
const find_start_of_packet = async () => {
  let input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const chars: string[] = input.split('');

  for (let i = 0; i < chars.length - 3; i++) {
    const set: Set<string> = new Set();
    chars.slice(i, i + 4).forEach(ch => set.add(ch));

    if (set.size === 4) {
      console.log(`Packet start after position ${i + 4}`);
      return;
    }
  }
}

find_start_of_packet();

/**
 * Day 6 Part 2 - https://adventofcode.com/2022/day/6#part2
 * 
 * Packet detection is working, but something's not quite right.
 * It looks like we need to find start-of-message signals instead
 * which are the exact same as start-of-packet signals but 14 chars 
 * long instead.
 */
const find_start_of_message = async () => {
  let input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const chars: string[] = input.split('');

  for (let i = 0; i < chars.length - 13; i++) {
    const set: Set<string> = new Set();
    chars.slice(i, i + 14).forEach(ch => set.add(ch));

    if (set.size === 14) {
      console.log(`Packet start after position ${i + 14}`);
      return;
    }
  }
}

find_start_of_message();