import React from 'react';
import { BaseItem, IconableItem } from '.';

export interface IAdvertisement extends BaseItem, IconableItem {
  readonly link?: string;
}
