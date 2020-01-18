import { IMapTile } from "routes/game";
import { IPosition } from "game/maps/types";

export function checkBounds(map: IMapTile[][], position: IPosition): IMapTile | null {
  // Check bounds
  if (position.y >= 0 && position.y < map.length) {
    if (position.x >= 0 && position.x < map[position.y].length) {
      return map[position.y][position.x];
    }
  }

  return null;
}