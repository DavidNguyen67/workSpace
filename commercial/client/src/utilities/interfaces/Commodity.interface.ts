import { BaseItem } from '.';

export interface ICommodity extends BaseItem {
  readonly price: number;
  readonly imageUrl: string;
}
