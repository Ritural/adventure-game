import { IMapTile } from "routes/game";
import { Player } from "game/classes/player";
import { getRange } from "utilities/range";
import { checkBounds } from "utilities/check-bounds";
import { TILE_SIZE, CANVAS_SIZE } from 'routes/game';

const HALF_TILE = 25;

export function renderVisibility(ctx: CanvasRenderingContext2D, map: IMapTile[][], player: Player, _: HTMLCanvasElement) {
  const minY = player.props.y - player.props.view.bottom; // How far DOWN you can see
  const maxY = player.props.y + player.props.view.top; // How far UP you can see
  const minX = player.props.x - player.props.view.left; // How far LEFT you can see
  const maxX = player.props.x + player.props.view.right; // How far RIGHT you can see

  const playerX = player.props.x * TILE_SIZE + HALF_TILE;
  const playerY = player.props.y * TILE_SIZE + HALF_TILE;

  const yArray = getRange(minY, maxY);
  const xArray = getRange(minX, maxX);

  ctx.beginPath();
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = 'black';
  const positionHistory: any[] = [];

  // Check just the surrounding tiles
  yArray.forEach((y, yIdx) => {
    xArray.forEach((x, xIdx) => {
      if (y >= minY && y <= maxY) {
        if (x >= minX && x <= maxX) {
          console.log(yIdx, y);
          console.log(xIdx, x);
    
          // const map = checkBounds(gameMap, { x, y });
          // const encounter = map.encounter;
    
          const squareX = xIdx * TILE_SIZE + HALF_TILE;
          const squareY = yIdx * TILE_SIZE + HALF_TILE;
    
          positionHistory.push(
            {
              player: {
                x: player.props.x,
                y: player.props.y,
                playerX,
                playerY,
              },
              tile: {
                x: xIdx,
                y: yIdx,
                squareX,
                squareY,
              }
            }
          );
    
          ctx.moveTo(squareX, squareY);
          ctx.lineTo(225, 225);
          ctx.moveTo(0, 0);

          let showTile = isVisible(xIdx, yIdx, player.props.x, player.props.y, map);

          if (!showTile) {
            ctx.fillStyle = "rgba(130, 130, 130, 0.75)";
            ctx.fillRect(xIdx * TILE_SIZE, yIdx * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    });
  });
  ctx.stroke();

  console.log(positionHistory);  
}

function isVisible(tileX: number, tileY: number, playerX: number, playerY: number, map: IMapTile[][]): boolean {
  let x = tileX;
  let y = tileY;
  while(x !== playerX && y !== playerY) {
      const xDifference = difference(x, playerX);
      const yDifference = difference(y, playerY);

    console.log('xDifference', xDifference, 'yDifference', yDifference);

    const isHorizontal = xDifference > yDifference;

    if (isHorizontal) {
      if (x < playerX) {
        x++;
      } else if (x > playerX) {
        x--;
      }
    } else {
      // Must be vertical
      if (y < playerY) {
        y++;
      } else if (y > playerY) {
        y--;
      }
    }

    console.log(`x: ${tileX}, y: ${tileY}, newX: ${x} newY: ${y}`);
    const pathTile = checkBounds(map, { x, y });
    if (pathTile) {
      const encounter = pathTile.encounter;
      if (encounter) {
        if (encounter.props.isImpassable) {
          return false;
        }
      }
    }
  }

  return true;
}

function difference(value: number, playerValue: number) {
  console.log(`value: ${value}, playerVal: ${playerValue}`);
  if (value > playerValue) {
    return value - playerValue;
  }
  return playerValue - value;
}

/// <param name="origin">The location of the monster whose field of view will be calculated.</param>
/// <param name="rangeLimit">The maximum distance from the origin that tiles will be lit.
/// If equal to -1, no limit will be applied.
/// </param>
// function compute(origin: IPosition, rangeLimit: number): void {};

// A function that accepts the X and Y coordinates of a tile and determines whether the
// given tile blocks the passage of light. The function must be able to accept coordinates that are out of bounds.
// function blocksLight(map: IMapTile[][], position: IPosition): boolean {
//   const tile = checkBounds(map, position);
//   if (!tile) {
//     return false;
//   }

//   const encounter = tile.encounter;
//   if (encounter) {
//     return encounter.props.isImpassable;
//   }
//   return false;
// }

// throughout this function there are references to various parts of tiles. a tile's coordinates refer to its
// center, and the following diagram shows the parts of the tile and the vectors from the origin that pass through
// those parts. given a part of a tile with vector u, a vector v passes above it if v > u and below it if v < u
//    g         center:        y / x
// a------b   a top left:      (y*2+1) / (x*2-1)   i inner top left:      (y*4+1) / (x*4-1)
// |  /\  |   b top right:     (y*2+1) / (x*2+1)   j inner top right:     (y*4+1) / (x*4+1)
// |i/__\j|   c bottom left:   (y*2-1) / (x*2-1)   k inner bottom left:   (y*4-1) / (x*4-1)
//e|/|  |\|f  d bottom right:  (y*2-1) / (x*2+1)   m inner bottom right:  (y*4-1) / (x*4+1)
// |\|__|/|   e middle left:   (y*2) / (x*2-1)
// |k\  /m|   f middle right:  (y*2) / (x*2+1)     a-d are the corners of the tile
// |  \/  |   g top center:    (y*2+1) / (x*2)     e-h are the corners of the inner (wall) diamond
// c------d   h bottom center: (y*2-1) / (x*2)     i-m are the corners of the inner square (1/2 tile width)
//    h

// function setVisibile(map: IMapTile[][], position: IPosition) {

// }