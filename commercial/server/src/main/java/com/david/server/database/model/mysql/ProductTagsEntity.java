/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-07-01 09:44:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:17:11
 * @FilePath       : ProductTagsEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.model.mysql;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "product_tags")
@Data
@EqualsAndHashCode(callSuper = true)
public class ProductTagsEntity extends BaseEntity {
  @Column(name = "product_id")
  private String productId;

  @Column(name = "tag_id")
  private String tagId;
}
