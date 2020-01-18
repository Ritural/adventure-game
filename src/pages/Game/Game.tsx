import * as React from 'react';

import { drawGrid, renderMap } from 'pages/Game/Map/Utilities';
import { Player, Direction, onDirectionChange } from 'pages/Game/Player/Player';
import { CANVAS_SIZE } from 'pages/Game/Constants';
import { IMap } from 'pages/Game/Map/Map';
import { setupControls } from './Controls';

interface IGridCanvasState {
  gridElement: HTMLCanvasElement | null;
  gridCtx: CanvasRenderingContext2D | null;
}
interface IMapCanvasState {
  mapElement: HTMLCanvasElement | null;
  mapCtx: CanvasRenderingContext2D | null;
}
interface IMapState {
  currentMap: IMap;
  player: Player;
}

interface IGameProps {
  initialPlayer: Player;
  initialMap: IMap;
}

export const Game = ({ initialPlayer, initialMap }: IGameProps) => {
  const [gridState, updateGridState] = React.useState<IGridCanvasState>({
    gridElement: null,
    gridCtx: null,
  });
  const [mapCanvasState, updateMapCanvasState] = React.useState<IMapCanvasState>({
    mapElement: null,
    mapCtx: null,
  });

  const [player, updatePlayer] = React.useState<Player>(initialPlayer);
  const [currentMap, updateCurrentMap] = React.useState<IMap>(initialMap);

  React.useEffect(() => {
    setupControls({
      onDirection: (direction: Direction | null) => {
        if (direction) {
          const { x, y } = onDirectionChange({
            player,
            gameMap: currentMap.map,
            direction,
          });

          const newPlayer = player.updatePosition(x, y);
          updatePlayer({ ...newPlayer });
        }
      }
    });
  }, []);

  const setupGameMapGrid = (gridCanvas: HTMLCanvasElement | null) => {
    const { gridCtx: existingCtx, gridElement: existingEl } = gridState;

    if (existingCtx || existingEl) {
      return;
    }

    if (!gridCanvas) {
      return;
    }

    const gridCtx = gridCanvas.getContext('2d');
    if (!gridCtx) {
      return;
    }

    drawGrid(gridCtx);

    updateGridState({
      gridCtx,
      gridElement: gridCanvas,
    });
  };

  const setupGameMap = (mapCanvas: HTMLCanvasElement | null) => {
    const { mapCtx: existingCtx, mapElement: existingEl } = mapCanvasState;
    if (existingCtx || existingEl) {
      return;
    }

    if (!mapCanvas) {
      return;
    }

    const mapCtx = mapCanvas.getContext('2d');
    if (!mapCtx) {
      return;
    }

    renderMap({
      mapCtx,
      canvas: mapCanvas,
      player,
      currentMap,
    });

    updateMapCanvasState({
      mapCtx,
      mapElement: mapCanvas,
    });
  };

  React.useEffect(() => {
    const { mapCtx, mapElement } = mapCanvasState;
    if (mapCtx && mapElement) {
      renderMap({
        mapCtx,
        canvas: mapElement,
        player,
        currentMap,
      });
    }
  }, [player.x, player.y]);

  return (
    <div className='Game'>
      <div className='Map'>
        <canvas ref={(mapCanvas) => setupGameMap(mapCanvas)} className='Map-game' width={CANVAS_SIZE} height={CANVAS_SIZE} />
        <canvas ref={(gridCanvas) => setupGameMapGrid(gridCanvas)} className='Map-grid' width={CANVAS_SIZE} height={CANVAS_SIZE} />
      </div>
    </div>
  );
};

// export class Game extends React.Component<{}, IState> {
//   constructor(props: IProps) {
//     super(props);

//     const currentMap = GAME_MAPS.test_level;

//     let playerX = 0;
//     let playerY = 0;
//     if (currentMap.startPosition) {
//       playerX = currentMap.startPosition.x;
//       playerY = currentMap.startPosition.y;
//     }

//     const view: IView = {
//       bottom: 6,
//       left: 6,
//       right: 6,
//       top: 6,
//     };

//     const player = new Player({ x: playerX, y: playerY, view });

//     this.state = {
//       currentMap,
//       gameMap: createMap(currentMap),
//       gridCtx: null,
//       gridElement: null,
//       mapCtx: null,
//       mapElement: null,
//       player,
//       visibilityCtx: null,
//       visibilityElement: null,
//     };
//   }

//   render() {
//     return (
//       <div className='Game'>
//         <div className='Game-Map'>
//           <canvas ref={(mapCanvas) => this.setupGameMap(mapCanvas)} className='Game-Map' width={CANVAS_SIZE} height={CANVAS_SIZE} />
//           <canvas ref={(gridCanvas) => this.setupGameMapGrid(gridCanvas)} className='Game-Map-grid' width={CANVAS_SIZE} height={CANVAS_SIZE} />
//           {/* <canvas ref={(visibilityCanvas) => this.setupVisibility(visibilityCanvas)} className='Game-Map-visibility' width={CANVAS_SIZE} height={CANVAS_SIZE} /> */}
//         </div>
//       </div>
//     );
//   }

//   setupGameMap = (el: HTMLCanvasElement | null) => {
//     const { mapCtx: existingCtx, mapElement: existingEl } = this.state;
//     if (existingCtx || existingEl) {
//       return;
//     }

//     if (!el) {
//       return;
//     }

//     const mapCtx = el.getContext('2d');
//     if (!mapCtx) {
//       return;
//     }

//     const { gameMap, player, currentMap } = this.state;
//     renderMap({ mapCtx, map: gameMap, player, canvas: el, currentMap });

//     this.setState({
//       mapCtx,
//       mapElement: el,
//     });
//   }

//   // setupVisibility = (visibilityCanvas: HTMLCanvasElement | null) => {
//   //   const { visibilityCtx: existingCtx, visibilityElement: existingEl } = this.state;
//   //   if (existingCtx || existingEl) {
//   //     return;
//   //   }

//   //   if (!visibilityCanvas) {
//   //     return;
//   //   }

//   //   const visibilityCtx = visibilityCanvas.getContext('2d');
//   //   if (!visibilityCtx) {
//   //     return;
//   //   }

//   //   const { gameMap, player } = this.state;
//   //   renderVisibility(visibilityCtx, gameMap, player, visibilityCanvas);

//   //   this.setState({
//   //     visibilityCtx,
//   //     visibilityElement: visibilityCanvas,
//   //   })
//   // }

//   onDirectionChange = (direction: string) => {
//     const {
//       player,
//       gameMap,
//       mapCtx,
//       mapElement,
//       // visibilityCtx,
//       // visibilityElement,
//       currentMap,
//     } = this.state;

//     const x = player.props.x;
//     const y = player.props.y;

//     let newX = x;
//     let newY = y;

//     switch (direction) {
//       case 'up':
//         if (y - 1 >= 0 && gameMap[y - 1][x]) {
//           newY = y - 1;
//         }
//         break;
//       case 'down':
//         if (y + 1 < gameMap.length && gameMap[y + 1][x]) {
//           newY = y + 1;
//         }
//         break;
//       case 'left':
//         if (x - 1 >= 0) {
//           newX = x - 1;
//         }
//         break;
//       case 'right':
//         if (x + 1 < gameMap[y].length) {
//           newX = x + 1;
//         }
//         break;
//       default:
//         // Do nothing as key is not recognised
//         break;
//     }

//     console.log(newX, newY);

//     let canMove = true;
//     // let canEnter = true;
//     const currentTile = gameMap[y][x];
//     const movingIntoTile = gameMap[newY][newX];

//     let dialog;
//     let activeEncounter = null;

//     // Run current tile first
//     if (currentTile.encounter) {
//       console.log('Run current tile scenario');
//       const { encounter } = currentTile;
//       if (encounter) {
//         encounter.mapTile = currentTile;
//         encounter.player = player;

//         console.log('currentTile Encounter', encounter);
//         // Run the encounter of the current tile
//         canMove = encounter.duringScenario();
//         dialog = encounter.getDuringDialog();
//         // console.log('dialog current', dialog);

//         activeEncounter = encounter;
//       }
//     }

//     // Run next tile if the player can move from the current tile
//     if (canMove) {
//       // If the player can move out of the current tile, then run the tile they are moving into
//       if (movingIntoTile.encounter) {
//         console.log('Run next tile scenario');
//         const { encounter } = movingIntoTile;
//         if (encounter) {
//           encounter.mapTile = currentTile;
//           encounter.player = player;

//           console.log('nextTile Encounter', encounter);
//           // Run the encounter of the tile that the player is moving into
//           canMove = encounter.beforeScenario();

//           dialog = encounter.getBeforeDialog();
//           // console.log('dialog before', dialog);

//           activeEncounter = encounter;
//         }
//       }
//     }

//     if (gameMap[newY][newX].terrain === TERRAIN.NONE) {
//       newX = x;
//       newY = y;
//     }

//     // The player can move
//     if (canMove) {
//       // Reset the tile when the player leaves
//       if (currentTile) {
//         const { encounter } = currentTile;

//         if (encounter) {
//           encounter.reset();
//         }
//       }

//       // Update the players XY position
//       player.props.x = newX;
//       player.props.y = newY;
//     }

//     if (mapCtx && mapElement) {
//       renderMap({ mapCtx, map: gameMap, player, canvas: mapElement, currentMap });
//     }

//     // if (visibilityCtx && visibilityElement) {
//     //   visibilityCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//     //   renderVisibility(visibilityCtx, gameMap, player, visibilityElement);
//     // }

//     this.setState({
//       dialog,
//       encounter: activeEncounter,
//       player,
//     });
//   }
// }

// function drawGrid(ctx: CanvasRenderingContext2D) {
//   ctx.strokeStyle = 'black';

//   for (let y = 0; y < MAX_TILE_COUNT; y++) {
//     for (let x = 0; x < MAX_TILE_COUNT; x++) {
//       ctx.rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
//     }
//   }

//   ctx.stroke();
// }

// interface IRenderMapProps {
//   mapCtx: CanvasRenderingContext2D;
//   map: IMapTile[][];
//   player: Player;
//   canvas: HTMLCanvasElement;
//   currentMap: IMapConfig;
// }

// function renderMap(props: IRenderMapProps) {
//   const {
//     mapCtx,
//     map,
//     player,
//     canvas,
//     currentMap,
//   } = props;

//   const minY = player.props.y - player.props.view.bottom; // How far DOWN you can see
//   const maxY = player.props.y + player.props.view.top; // How far UP you can see
//   const minX = player.props.x - player.props.view.left; // How far LEFT you can see
//   const maxX = player.props.x + player.props.view.right; // How far RIGHT you can see

//   mapCtx.clearRect(0, 0, canvas.width, canvas.height);

//   getRange(minY, maxY).map((y: number, yIdx: number) => {
//     getRange(minX, maxX).map((x: number, xIdx: number) => {
//       const tileSettings = getTileSettings(map, player, { x, y }, currentMap);

//       const xPos = xIdx * TILE_SIZE;
//       const yPos = yIdx * TILE_SIZE;

//       mapCtx.fillStyle = getTerrainType(tileSettings.terrain);
//       mapCtx.fillRect(xPos, yPos, TILE_SIZE, TILE_SIZE);

//       if (ENABLE_TILE_XY_TEXT) {
//         mapCtx.fillStyle = 'black';
//         mapCtx.font = '12px Arial';
//         mapCtx.fillText(`${x} ${y}`, xPos + 10, yPos + 10);
//       }

//       if (x === player.props.x && y === player.props.y) {
//         mapCtx.beginPath();
//         mapCtx.fillStyle = player.props.tileColour;
//         mapCtx.arc(xPos + 25, yPos + 25, 25, 0, 2 * Math.PI);
//         mapCtx.fill();

//         player.props.image.onload = () => {
//           mapCtx.drawImage(player.props.image, xPos + 5, yPos + 5, 40, 40);
//         };

//         mapCtx.drawImage(player.props.image, xPos + 5, yPos + 5, 40, 40);
//       }
//     });
//   });

//   mapCtx.stroke();
// }

// function getTileSettings(map: IMapTile[][], _: Player, position: { x: number, y: number }, __: IMapConfig): IMapTile {
//   // Check bounds
//   if (position.y >= 0 && position.y < map.length) {
//     if (position.x >= 0 && position.x < map[position.y].length) {
//       return map[position.y][position.x];
//     }
//   }

//   const terrain = TERRAIN.NONE;

//   // const mapBorderTiles = currentMap.borderTerrain;
//   // if (mapBorderTiles) {
//   //   // Just grab the fist mapBorderTile - this could become more sophisticated
//   //   // but it may be weird if you come back to this map and the surrounding border tiles keep changing
//   //   terrain = mapBorderTiles[0];
//   // }

//   return {
//     terrain,
//   }
// }

// function getTerrainType(terrainType: TERRAIN): TERRAIN_NAME {
//   switch (terrainType) {
//     case TERRAIN.GRASS:
//       return TERRAIN_NAME.GRASS;
//     case TERRAIN.FOREST: {
//       return TERRAIN_NAME.FOREST;
//     }
//     case TERRAIN.MOUNTAIN: {
//       return TERRAIN_NAME.MOUNTAIN;
//     }
//     case TERRAIN.WATER: {
//       return TERRAIN_NAME.WATER;
//     }
//     case TERRAIN.SWAMP: {
//       return TERRAIN_NAME.SWAMP;
//     }
//     case TERRAIN.PEAK: {
//       return TERRAIN_NAME.PEAK;
//     }
//     case TERRAIN.SNOW: {
//       return TERRAIN_NAME.SNOW;
//     }
//     case TERRAIN.WOOD_FLOOR: {
//       return TERRAIN_NAME.WOOD_FLOOR;
//     }
//     case TERRAIN.STONE_FLOOR: {
//       return TERRAIN_NAME.STONE_FLOOR;
//     }
//     case TERRAIN.WOOD_WALL: {
//       return TERRAIN_NAME.WOOD_WALL;
//     }
//     case TERRAIN.STONE_WALL: {
//       return TERRAIN_NAME.STONE_WALL;
//     }
//     case TERRAIN.SAND: {
//       return TERRAIN_NAME.SAND;
//     }
//     case TERRAIN.NONE:
//     default:
//       return TERRAIN_NAME.NONE;
//   }
// }

// enum TERRAIN_NAME {
//   NONE = 'black',
//   GRASS = 'lightgreen',
//   FOREST = 'green',
//   MOUNTAIN = 'burlywood',
//   WATER = 'lightskyblue',
//   SWAMP = 'darkolivegreen',
//   PEAK = 'grey',
//   SNOW = 'whitesmoke',
//   WOOD_FLOOR = 'burlywood',
//   STONE_FLOOR = 'stone-floor',
//   WOOD_WALL = 'rgb(167, 128, 77)',
//   STONE_WALL = 'rgb(100, 100, 100)',
//   SAND = 'rgb(251, 229, 163)',
// }
