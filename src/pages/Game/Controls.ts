import { Direction } from './Player/Player';

interface ISetupControls {
  onDirection: (direction: Direction | null) => void;
}

export const setupControls = ({ onDirection }: ISetupControls) => {
  const onKeyPress = (evt: KeyboardEvent) => {
    let direction: Direction | null = null;

    switch (evt.key) {
      case 'w':
        direction = 'up';
        break;
      case 'a':
        direction = 'left';
        break;
      case 's':
        direction = 'down';
        break;
      case 'd':
        direction = 'right';
        break;
      default:
        console.log(`evt.key ${evt.key}`);
        break;
    }

    onDirection(direction);
  };

  document.body.addEventListener('keypress', onKeyPress);
};
