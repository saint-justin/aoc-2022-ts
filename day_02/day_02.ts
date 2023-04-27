import { readFile } from "../utils/helpers";

/**
 * Day 2 Part 1 - https://adventofcode.com/2022/day/2
 * 
 * The elves are playing rock paper scissors. One elf 
 * gives you a stategy guide that will let you win. The first
 * column gives you what your opponent will play, the second 
 * column gives what you should play. Your scope is the sum of
 * what you played plus the outcome of the round (table below).
 * 
 * Rock     -> A/X -> 1pt
 * Paper    -> B/Y -> 2pt
 * Scissors -> C/Z -> 3pt
 * 
 * Win  +6
 * Tie  +3
 * Loss +0
 * 
 * What is your total score?
 */

// Helpers
const points_awarded_for_matchup = (opponent_throw: string, my_throw: string) => {
  if (opponent_throw === 'A') {       // opponent rock
    if (my_throw === 'X') return 3; // i throw rock
    if (my_throw === 'Y') return 6; // i throw paper
    if (my_throw === 'Z') return 0; // i throw scissors
  } else if (opponent_throw === 'B') {// opponent paper
    if (my_throw === 'X') return 0; // i throw rock
    if (my_throw === 'Y') return 3; // i throw paper
    if (my_throw === 'Z') return 6; // i throw scissors
  } else if (opponent_throw === 'C') {    // opponent scissors
    if (my_throw === 'X') return 6; // i throw rock
    if (my_throw === 'Y') return 0; // i throw paper
    if (my_throw === 'Z') return 3; // i throw scissors
  }

  throw new Error('Invalid values given for throws');
}

const points_awarded_for_choice = (choice: string): number => {
  switch(choice) {
    case 'X':
      return 1
    case 'Y':
      return 2;
    case 'Z':
      return 3;
    default:
      throw new Error('Invalid choice passed ' + choice);
  }
}

// Solve Day 1 Part 2
const calculate_rps_score_by_throw = async () => {
  const input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  
  const rps_matches = input.split('\r\n');
  const score = rps_matches.reduce((prev, match) => {
    const throws: string[] = match.split(' ');
    const match_score = points_awarded_for_matchup(throws[0], throws[1]);
    const throw_score = points_awarded_for_choice(throws[1]);
    return prev + match_score + throw_score;
  }, 0)

  console.log('Final store by throw: ' + score);
}

calculate_rps_score_by_throw();


/**
 * Part 2 -- https://adventofcode.com/2022/day/2#part2
 * 
 * Part 2 is much the same as part 1, but instead of the two
 * strings being what your opponent throws vs what you throw, 
 * the 2nd part is instead whether you need to lose/tie/win (X/Y/Z)
 */

const calculate_throw_by_result = (opponent_throw: string, result: string): string => {
  if (opponent_throw === 'A') {        // opponent rock
    if (result === 'X') return 'Z'; // i need to lose -> scissors
    if (result === 'Y') return 'X'; // i need to tie  -> rock
    if (result === 'Z') return 'Y'; // i need to win  -> paper
  } else if (opponent_throw === 'B') { // opponent paper
    if (result === 'X') return 'X'; // i need to lose -> rock
    if (result === 'Y') return 'Y'; // i need to tie  -> paper
    if (result === 'Z') return 'Z'; // i need to win  -> scissors
  } else if (opponent_throw === 'C') { // opponent scissors
    if (result === 'X') return 'Y'; // i need to lose -> paper
    if (result === 'Y') return 'Z'; // i need to tie  -> scissors
    if (result === 'Z') return 'X'; // i need to win  -> rock
  }

  throw new Error('Invalid throw and/or result passed');
}

const calculate_rps_score_by_result = async () => {
  const input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  
  const rps_matches = input.split('\r\n');
  const score = rps_matches.reduce((prev, match) => {
    const throws: string[] = match.split(' ');
    const my_throw = calculate_throw_by_result(throws[0], throws[1]);
    const match_score = points_awarded_for_matchup(throws[0], my_throw);
    const throw_score = points_awarded_for_choice(my_throw);
    return prev + match_score + throw_score;
  }, 0)

  console.log('Final score by result: ' + score);
}

calculate_rps_score_by_result();