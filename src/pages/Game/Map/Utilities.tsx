import {
  MAX_TILE_COUNT, TILE_SIZE, VISIBLE_RANGE, ENABLE_TILE_XY_TEXT
} from 'pages/Game/Constants';
import { getRange } from 'utilities/range';
import { Player } from 'pages/Game/Player/Player';
import { IMap, IMapTile, Map } from './Map';

export function drawGrid(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = 'black';

  for (let y = 0; y < MAX_TILE_COUNT; y++) {
    for (let x = 0; x < MAX_TILE_COUNT; x++) {
      ctx.rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }

  ctx.stroke();
}

export function getMapTile(map: IMap, x: number, y: number): IMapTile {
  const mapGrid = map.map;

  if (x >= 0 && x < mapGrid.length) {
    if (y >= 0 && y < mapGrid[x].length) {
      return mapGrid[x][y];
    }
  }

  // const voidTile = map.voidTile;
  const voidTile: IMapTile = {
    backgroundColour: '#000',
    isSolid: true,
    row: x,
    col: y,
  };

  return voidTile;
}

interface IRenderMapProps {
  mapCtx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  player: Player;
  currentMap: IMap;
}

export function renderMap(props: IRenderMapProps) {
  const {
    mapCtx,
    canvas,
    player,
    currentMap,
  } = props;

  const minY = -VISIBLE_RANGE; // player.props.y - player.props.view.bottom; // How far DOWN you can see
  const maxY = VISIBLE_RANGE; // player.props.y + player.props.view.top; // How far UP you can see
  const minX = -VISIBLE_RANGE; // player.props.x - player.props.view.left; // How far LEFT you can see
  const maxX = VISIBLE_RANGE; // player.props.x + player.props.view.right; // How far RIGHT you can see

  mapCtx.clearRect(0, 0, canvas.width, canvas.height);

  getRange(minY, maxY).forEach((y: number, yIdx: number) => {
    getRange(minX, maxX).forEach((x: number, xIdx: number) => {
      // const tileSettings = getTileSettings(map, player, { x, y }, currentMap);

      const mapTile = getMapTile(currentMap, x, y);

      const xPos = xIdx * TILE_SIZE;
      const yPos = yIdx * TILE_SIZE;

      mapCtx.fillStyle = mapTile.backgroundColour;
      mapCtx.fillRect(xPos, yPos, TILE_SIZE, TILE_SIZE);

      if (ENABLE_TILE_XY_TEXT) {
        mapCtx.fillStyle = 'black';
        mapCtx.font = '12px Arial';
        mapCtx.fillText(`${x} ${y}`, xPos + 10, yPos + 10);
      }

      if (x === player.x && y === player.y) {
        mapCtx.beginPath();
        mapCtx.fillStyle = player.tileColour;
        mapCtx.arc(xPos + 25, yPos + 25, 25, 0, 2 * Math.PI);
        mapCtx.fill();

        player.image.onload = () => {
          console.log(player.image);
          mapCtx.drawImage(player.image, xPos + 5, yPos + 5, 40, 40);
        };

        mapCtx.drawImage(player.image, xPos + 5, yPos + 5, 40, 40);
      }
    });
  });

  mapCtx.stroke();
}
