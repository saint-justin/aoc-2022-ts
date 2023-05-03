import { readFile } from "../utils/helpers";

/**
 * Day 5 Part 1 - https://adventofcode.com/2022/day/5
 * 
 * Some supplies need to be unloaded from the ship in order for the
 * expedition onto the island to begin. The ship has a giant cargo crane
 * which is needed to unload the boxes in the correct order (puzzle input).
 * 
 * Rearrange all the boxes in order one at a time. What crane ends up at
 * the top of each given stack?
 */

const calculate_max_stack_height = (input: string[]): number => {
  for(let i=0; i<input.length; i++) {
    if (input[i][1] === '1') return i;
  }
  throw new Error('Invalid input, no stack delineator found');
}

const parse_stacks_from_input = (input: string[]): string[][] => {
  let stack_index = 1; // 1st stack starts at index 1
  const stacks: string[][] = [];
  while (stack_index < input[0].length) {
    const individual_stack: string[] = [];
    input.forEach(layer => {
      if (layer[stack_index] !== ' ') {
        individual_stack.unshift(layer[stack_index]);
      }
    })
    stacks.push(individual_stack);
    stack_index += 4; // move to next stack
  }

  return stacks;
}

const rearrange_crates = async () => {
  const input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const split_input: string[] = input.split('\r\n');

  // Data definitions
  const max_stack_height = calculate_max_stack_height(split_input);
  const stack_inputs = split_input.slice(0, max_stack_height);
  const commands = split_input.slice(max_stack_height + 2);
  
  const stacks: string[][] = parse_stacks_from_input(stack_inputs);

  commands.forEach(command => {
    const split = command.split(' ');
    const amount = parseInt(split[1]);
    const startLocation = stacks[parseInt(split[3]) - 1];
    const endLocation = stacks[parseInt(split[5]) - 1];

    for (let i=0; i<amount; i++) {
      const target = startLocation.pop();
      if (!target) throw new Error(`Illegal request to pop from stack [${startLocation}]`)
      endLocation.push(target);
    }
  })
  
  console.log(`Final Top Stacks: ${stacks.map(stack => stack.pop()).join('')}`);
}

rearrange_crates();

/**
 * Day 5 Part 2 - https://adventofcode.com/2022/day/5#part2
 * 
 * Basically the same idea, but instead of moving the crates one at a time,
 * the crates are moved in batches where order is preserved. 
 */

const batch_rearrange_crates = async () => {
  const input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const split_input: string[] = input.split('\r\n');

  // Data definitions
  const max_stack_height = calculate_max_stack_height(split_input);
  const stack_inputs = split_input.slice(0, max_stack_height);
  const commands = split_input.slice(max_stack_height + 2);
  
  const stacks: string[][] = parse_stacks_from_input(stack_inputs);

  commands.forEach(command => {
    const split = command.split(' ');
    const amount = parseInt(split[1]);
    const startLocation = stacks[parseInt(split[3]) - 1];
    const endLocation = stacks[parseInt(split[5]) - 1];

    const target: string[] = [];
    for (let i=0; i<amount; i++) {
      const crate = startLocation.pop() as string;
      target.push(crate);
    }
    endLocation.push(...target.reverse());
  })
  
  console.log(`Final Top Stacks (Batched): ${stacks.map(stack => stack.pop()).join('')}`);
}

batch_rearrange_crates();