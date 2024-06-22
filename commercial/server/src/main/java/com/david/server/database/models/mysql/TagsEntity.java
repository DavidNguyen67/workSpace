/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 23:10:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 23:20:18
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "tags")
@Data
@EqualsAndHashCode(callSuper = true)
public class TagsEntity extends BaseEntity {
  @Column(nullable = false)
  private String name;
}
