export interface BaseItem {
  readonly id: string;
  readonly label: string;
  readonly value?: string | number;
  readonly description?: string;
}

export interface IconableItem {
  readonly icon?: React.ReactNode;
}
