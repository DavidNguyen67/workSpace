/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 20:01:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-24 20:27:54
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryColumn()
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;
}
