/**
 * @ Author: David Nguyễn
 * @ Email: davidnguyen67dev@gmail.com
 * @ Create Time: 2024-06-16 00:16:48
 * @ Modified by: David Nguyễn
 * @ Modified time: 2024-06-16 17:53:06
 * @ Description:
 */

import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Cat extends Model {
  @Column
  name: string;

  @Column
  age: number;

  @Column
  breed: string;
}
