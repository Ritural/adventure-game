// eslint-disable-next-line import/no-unresolved
import 'public/images/player.svg';
import { Map } from 'pages/Game/Map/Map';

export interface IPlayer {
  x: number;
  y: number;
}

export class Player {
  image: HTMLImageElement = new Image();
  x: number = 0;
  y: number = 0;
  tileColour: string = '#ffffff';

  constructor({ x, y }: IPlayer) {
    this.x = x;
    this.y = y;

    this.image.src = 'public/images/player.svg';
    this.image.alt = 'Icon made by Freepik from www.flaticon.com';
  }

  updatePosition = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  }
}

export type Direction = 'up' | 'down' | 'left' | 'right';
interface IDirectionChange {
  player: Player;
  direction: Direction;
  gameMap: Map;
}

export const onDirectionChange = ({ player, direction, gameMap }: IDirectionChange): Player => {
  // const {
  //   player,
  //   gameMap,
  //   mapCtx,
  //   mapElement,
  //   // visibilityCtx,
  //   // visibilityElement,
  //   currentMap,
  // } = this.state;

  const { x } = player;
  const { y } = player;

  let newX = x;
  let newY = y;

  switch (direction) {
    case 'up':
      if (y - 1 >= 0 && gameMap[y - 1][x]) {
        newY = y - 1;
      }
      break;
    case 'down':
      if (y + 1 < gameMap.length && gameMap[y + 1][x]) {
        newY = y + 1;
      }
      break;
    case 'left':
      if (x - 1 >= 0) {
        newX = x - 1;
      }
      break;
    case 'right':
      if (x + 1 < gameMap[y].length) {
        newX = x + 1;
      }
      break;
    default:
      // Do nothing as key is not recognised
      break;
  }

  console.log(newX, newY);

  return {
    ...player,
    x: newX,
    y: newY,
  };

  // let canMove = true;
  // // let canEnter = true;
  // const currentTile = gameMap[y][x];
  // const movingIntoTile = gameMap[newY][newX];

  // let dialog;
  // let activeEncounter = null;

  // // Run current tile first
  // if (currentTile.encounter) {
  //   console.log('Run current tile scenario');
  //   const { encounter } = currentTile;
  //   if (encounter) {
  //     encounter.mapTile = currentTile;
  //     encounter.player = player;

  //     console.log('currentTile Encounter', encounter);
  //     // Run the encounter of the current tile
  //     canMove = encounter.duringScenario();
  //     dialog = encounter.getDuringDialog();
  //     // console.log('dialog current', dialog);

  //     activeEncounter = encounter;
  //   }
  // }

  // // Run next tile if the player can move from the current tile
  // if (canMove) {
  //   // If the player can move out of the current tile, then run the tile they are moving into
  //   if (movingIntoTile.encounter) {
  //     console.log('Run next tile scenario');
  //     const { encounter } = movingIntoTile;
  //     if (encounter) {
  //       encounter.mapTile = currentTile;
  //       encounter.player = player;

  //       console.log('nextTile Encounter', encounter);
  //       // Run the encounter of the tile that the player is moving into
  //       canMove = encounter.beforeScenario();

  //       dialog = encounter.getBeforeDialog();
  //       // console.log('dialog before', dialog);

  //       activeEncounter = encounter;
  //     }
  //   }
  // }

  // if (gameMap[newY][newX].terrain === TERRAIN.NONE) {
  //   newX = x;
  //   newY = y;
  // }

  // // The player can move
  // if (canMove) {
  //   // Reset the tile when the player leaves
  //   if (currentTile) {
  //     const { encounter } = currentTile;

  //     if (encounter) {
  //       encounter.reset();
  //     }
  //   }

  //   // Update the players XY position
  //   player.props.x = newX;
  //   player.props.y = newY;
  // }

  // if (mapCtx && mapElement) {
  //   renderMap({ mapCtx, map: gameMap, player, canvas: mapElement, currentMap });
  // }

  // if (visibilityCtx && visibilityElement) {
  //   visibilityCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  //   renderVisibility(visibilityCtx, gameMap, player, visibilityElement);
  // }

  // this.setState({
  //   dialog,
  //   encounter: activeEncounter,
  //   player,
  // });
  // }
};
