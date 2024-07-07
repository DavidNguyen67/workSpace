/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 20:04:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 15:28:43
 * @FilePath       : BaseEntity.class.ts
 * @CopyRight      : Con chù chù 🥴🥴
 **/

export class BaseEntity {
  public readonly id!: string;

  public readonly insertedAt!: Date;

  public readonly updatedAt!: Date;
}
