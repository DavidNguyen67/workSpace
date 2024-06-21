/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-21 22:54:54
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-21 22:54:54
 * @CopyRight      : Con chù chù 🥴🥴
**/

import { BaseItem, IconableItem } from '.';

export interface IAdvertisement extends BaseItem, IconableItem {
  readonly link?: string;
}
