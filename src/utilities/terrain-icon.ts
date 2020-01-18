import { IconName } from "components/common/icon";
import { TERRAIN } from "game/maps/types";

export interface ITerrainIcon {
  icon: IconName,
  size?: string;
  colour?: string;
}

const GRASS_ICONS: ITerrainIcon[] = [
  {
    icon: "beech",
    size: '',
  },
  {
    icon: "mushrooms",
    size: '',
  },
  {
    icon: "pine-tree",
    size: '',
  },
  {
    icon: "high-grass",
    size: '',
  },
];

export function terrainIcon(value: TERRAIN): ITerrainIcon | null {
  switch (value) {
    case TERRAIN.GRASS:
      const i = Math.floor(Math.random() * GRASS_ICONS.length) + 1;
      const grassIcon = GRASS_ICONS[i];
      console.log(i, grassIcon);
      // return <Icon name={grassIcon.icon} />;
      return grassIcon;
  }

  return null;
}