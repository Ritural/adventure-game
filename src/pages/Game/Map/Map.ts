import { getRange } from 'utilities/range';

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
  const gameMap: Map = getRange(0, 10).map((row) => getRange(0, 10).map((col) => {
    const mapTile: IMapTile = {
      backgroundColour: '#DDDFFF',
      isSolid: false,
      row,
      col,
    };

    return mapTile;
  }));

  return {
    name: 'Test map',
    map: gameMap,
    startPoint: {
      x: 5,
      y: 5,
    },
  };
};
