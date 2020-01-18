export enum LOCAL_STORAGE_IDS {
  Items = 'Items',
}

export function getData<DataType>(id: string): DataType | null {
  const itemsJSON = localStorage.getItem(id);

  if (itemsJSON) {
  const items = JSON.parse(itemsJSON);

  return items as DataType;
  }

  return null;
}

export function storeData(id: string, data: any) {
  const dataJSON = JSON.stringify(data);

  localStorage.setItem(id, dataJSON);
}
