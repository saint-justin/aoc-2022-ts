import { readFile } from "../utils/helpers";

/**
 * Day 8 Part 1 - https://adventofcode.com/2022/day/8
 * 
 * The expedition has come across a patch of tall trees planted a year ago
 * from the prior expedition. They've found a specific chunk (grid) of trees
 * and they want to know if this would be a good spot for a treehouse. 
 * 
 * An early survey created a chunk map representing the height of each tree, 
 * we need to determine the number of trees are visible from outside the grid
 * when looking directly along a given row or column based on their heights
 * and the heights of their surrounding trees. A given tree is visible if
 * all the trees between it and the edge of the chunk are shorter than it. All
 * trees lining the edge of the chunk are visible.
 * 
 * How many trees are visible from outside the chunk (grid)?
 */

const calculate_trees_externally_visible = async () => {
  let input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const tree_rows: number[][] = input.split('\r\n').map(row => row.split('').map(tree => parseInt(tree)));
  const cardinal_directions: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const check_direction = (pos: [number, number], diff: [number, number]): boolean => {
      let row = pos[0];
      let col = pos[1];
      const tree_height: number = tree_rows[row][col];

      while (row >= 0 && row <= tree_rows.length - 1 && col >= 0 && col <= tree_rows[0].length - 1) {
        row += diff[0];
        col += diff[1];
        
        // Edge reached, tree is valid
        if (row < 0 || row > tree_rows.length - 1)  return true;
        if (col < 0 || col > tree_rows[0].length - 1)  return true;

        const compare_height = tree_rows[row][col];
        if (compare_height >= tree_height) {
          return false;
        }
      }

      return false;
    }

  let total_visible_trees = 0;
  for (let row=0; row<tree_rows.length; row+=1) {
    for (let col=0; col<tree_rows[0].length; col+=1) {
      if (cardinal_directions.some(pair => check_direction([row, col], [pair[0], pair[1]]))) {
        total_visible_trees += 1;
      }
    }
  }

  console.log(`Total Visible Trees from Exterior: ${total_visible_trees}`);
}

calculate_trees_externally_visible();