import * as React from 'react';

import { Game } from 'pages/Game/Game';
import { Player } from 'pages/Game/Player/Player';
import { createTestMap } from './Map/Map';

export const Manager = () => {
  const map = createTestMap();
  const player = new Player({ x: map.startPoint.x, y: map.startPoint.y });

  return (
    <div className=''>
      <Game initialPlayer={player} initialMap={map} />
    </div>
  );
};
