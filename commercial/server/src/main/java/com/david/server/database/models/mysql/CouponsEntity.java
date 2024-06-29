/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 22:03:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 13:19:10
 * @FilePath       : CouponsEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.models.mysql;

import java.sql.Timestamp;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

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

  @OneToMany(mappedBy = "coupon", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  // MappedBy trỏ tới tên biến coupon ở trong SalesOrders.
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private Set<SalesOrdersEntity> salesOrders;
}
