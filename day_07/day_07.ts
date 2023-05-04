import { readFile } from "../utils/helpers";

/**
 * Day 07 Part 1 - https://adventofcode.com/2022/day/7
 * 
 * Your device starts working but while trying to update it,
 * it tells you that you don't have enough space for the most recent
 * update! The file system is organized like the example below.
 * 
 * - / (dir)
 * - a (dir)
 *   - e (dir)
 *     - i (file, size=584)
 *   - f (file, size=29116)
 *   - g (file, size=2557)
 *   - h.lst (file, size=62596)
 * - b.txt (file, size=14848514)
 * - c.dat (file, size=8504156)
 * - d (dir)
 *   - j (file, size=4060174)
 *   - d.log (file, size=8033020)
 *   - d.ext (file, size=5626152)
 *   - k (file, size=7214296)
 * 
 * The puzzle input is the log of you browsing around your file 
 * system (example below):
 * 
 *  $ cd /
 *  $ ls
 *  dir a
 *  14848514 b.txt
 *  8504156 c.dat
 *  dir d
 *  $ cd a
 *  $ ls
 *  dir e
 *  29116 f
 *  2557 g
 *  62596 h.lst
 * 
 * Check the file system (structure below) and find all 
 * directories of size greater than 100,000 (including
 * subdirectories) and sum their size for the puzzle solution.
 */

interface File {
  size: number;
  name: string;
}

interface Directory {
  parent?: Directory;
  name: string;
  dirSize: number;
  files: File[];
  children: Map<string, Directory>;
}

const generate_empty_dir = (name: string, parent?: Directory): Directory => ({
  parent,
  name,
  dirSize: 0,
  files: [],
  children: new Map<string, Directory>(),
})

const construct_dir_tree_from_logs = (logs: string[]): Directory => {
  const root: Directory = generate_empty_dir('/', undefined);
  let current: Directory;

  logs.forEach(log => {
    const logSplit = log.split(' ');
    switch (logSplit[0]) {
      // Commands
      case '$':  
        if (logSplit[1] === 'cd') {
          if (logSplit[2] === '/' )  {
            current = root;
          } else if (logSplit[2] === '..')  {
            current = current.parent as Directory; 
          } else {
            current = current.children.get(logSplit[2]) as Directory;
          }
        }
        break;
      
      // New directory found in current
      case 'dir':
        current.children.set(
          logSplit[1], 
          generate_empty_dir(logSplit[1], current)
        );
        break;
      
      // New file found in current
      default:
        const fileSize = parseInt(logSplit[0])
        current.files.push({
          size: fileSize,
          name: logSplit[1]
        });

        // Update all parent dir sizes
        let parent: Directory | undefined = current;
        while (parent) {
          parent.dirSize += fileSize;
          parent = parent.parent;
        }
        break;
    }
  })

  return root;
}

const sum_directories_smaller_than_100k = async () => {
  let input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const logs: string[] = input.split('\r\n');

  let small_file_sum: number = 0;
  const traverse = (current: Directory) => {
    if (current.dirSize < 100_000) small_file_sum += current.dirSize;
    current.children.forEach((dir) => traverse(dir));
  }

  const tree: Directory = construct_dir_tree_from_logs(logs);
  traverse(tree);

  console.log(`Small File Sum (files < 100k size): ${small_file_sum}`);
}

sum_directories_smaller_than_100k();


/**
 * Day 7 Part 2 - https://adventofcode.com/2022/day/7#part2
 * 
 * Ok we know more about our directory now, so we need to find which
 * directory we should actually delete. To do this, we want to find
 * the smallest directory that will give us enough space to download 
 * the update. Some additional info:
 * 
 * Total Diskspace: 70,000,000
 * Required Space:  30,000,000
 * 
 * What is the size of the smallest directory we can delete to clear
 * enough space for the update?
 */

const find_smallest_file_to_delete = async () => {
  let input = await readFile('./input.txt');
  if (!input) throw new Error('Invalid input');
  const logs: string[] = input.split('\r\n');

  const TOTAL_SPACE = 70_000_000;
  const REQUIRED_SPACE = 30_000_000;
  const tree: Directory = construct_dir_tree_from_logs(logs);

  const current_free_space = TOTAL_SPACE - tree.dirSize;
  const space_increase_required = REQUIRED_SPACE - current_free_space;
  console.log(`\nCurrent free space:   ${current_free_space}`);
  console.log(`Free space required:  ${space_increase_required}`);

  let current_best_dir_size = tree.dirSize;
  const traverse = (current: Directory) => {
    if (current.dirSize >= space_increase_required && current.dirSize < current_best_dir_size) {
      current_best_dir_size = current.dirSize;
    }
    current.children.forEach((dir) => traverse(dir));
  }
  traverse(tree);
  console.log(`Smallest sized directory that meets requirements: ${current_best_dir_size}`);
}

find_smallest_file_to_delete();