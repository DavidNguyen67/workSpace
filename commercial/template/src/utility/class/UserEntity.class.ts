/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 20:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 21:46:14
 * @FilePath       : UserEntity.class.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { BaseEntity } from './BaseEntity.class';

export class UserEntity extends BaseEntity {
  public readonly id!: string;

  public readonly email!: string;

  public readonly firstName!: string;

  public readonly lastName!: string;

  public readonly active: boolean = true;
}
