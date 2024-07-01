/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 22:03:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 09:52:10
 * @FilePath       : CouponsEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.model.mysql;

import java.sql.Timestamp;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "coupons")
@Data
@EqualsAndHashCode(callSuper = true)
public class CouponsEntity extends BaseEntity {
  @Column(nullable = false)
  private String code;

  @Column
  private String description;

  @Column(columnDefinition = "boolean default true")
  private Boolean active = true;

  @Column
  private Double value;

  @Column(columnDefinition = "boolean default false")
  private Boolean multiple = false;

  @Column(name = "start_date")
  private Timestamp startDate;

  @Column(name = "end_date")
  private Timestamp endDate;
}
