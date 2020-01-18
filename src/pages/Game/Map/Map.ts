import { getRange } from 'utilities/range';

const TEST_SOLID = [
  [0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 1, 1, 0, 1],
  [0, 1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1],
  [0, 1, 0, 1, 0, 0, 1],
  [0, 1, 0, 0, 0, 1, 1],
];
function isTileSolid(row: number, col: number): boolean {
  return TEST_SOLID[row] && TEST_SOLID[row][col] === 1;
}

export interface IMapTile {
  backgroundColour: string;
  isSolid: boolean;
  row: number;
  col: number;

  // Events
  // Pre
  // During
  // Post
}

export type Map = IMapTile[][];

export interface IMap {
  name: string;
  map: Map;
  startPoint: {
    x: number;
    y: number;
  }
}

export const createTestMap = (): IMap => {
  let gameMap: Map = getRange(0, 10).map((row) => getRange(0, 10).map((col) => {
    const mapTile: IMapTile = {
      backgroundColour: '#DDDFFF',
      isSolid: false,
      row,
      col,
    };

    return mapTile;
  }));

  gameMap = gameMap.map((y, row) => y.map((x, col) => {
    if (isTileSolid(col, row)) {
      return {
        ...x,
        isSolid: true,
        backgroundColour: '#424242',
      };
    }

    return x;
  }));

  console.log('gameMap', gameMap);

  return {
    name: 'Test map',
    map: gameMap,
    startPoint: {
      x: 3,
      y: 3,
    },
  };
};
