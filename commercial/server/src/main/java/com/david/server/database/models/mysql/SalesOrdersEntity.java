/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 22:18:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 23:52:52
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import java.sql.Timestamp;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "sales_orders")
@Data
@EqualsAndHashCode(callSuper = true)
public class SalesOrdersEntity extends BaseEntity {
  @Column(name = "order_date", nullable = false)
  private Timestamp orderDate;

  @Column(nullable = false)
  private double total;

  /**
   * @CascadeType.ALL được sử dụng để áp dụng các thao tác (persist, merge,
   *                  remove,
   *                  refresh, detach)
   * 
   * @FetchType.LAZY được sử dụng khi dữ liệu liên quan sẽ chỉ được tải khi cần
   *                 thiết, tức là khi nó thực sự được truy cập
   *                 từ thực thể chính đến thực thể liên quan.
   * 
   * @EqualsAndHashCode.Exclude được sử dụng để loại trừ một
   *                            trường khỏi việc tính
   *                            toán phương thức equals và hashCode.
   * 
   * @ToString.Exclude được sử dụng để loại trừ một trường khỏi phương thức
   *                   toString.
   */
  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "coupon_id") // thông qua khóa ngoại user_id
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private CouponsEntity coupon;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) // Đánh dấu có mỗi quan hệ 1-1 với Session
  @JoinColumn(name = "session_id", nullable = false) // Liên kết với nhau qua khóa ngoại session_id
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private SessionsEntity session;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false) // thông qua khóa ngoại user_id
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private UsersEntity user;

  @OneToMany(mappedBy = "salesOrders", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  // MappedBy trỏ tới tên biến salesOrders ở trong CcTransactionsEntity.
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private Set<CcTransactionsEntity> ccTransactions;

  @OneToMany(mappedBy = "salesOrders", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  // MappedBy trỏ tới tên biến salesOrders ở trong OrderProductsEntity.
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private Set<OrderProductsEntity> orderProducts;
}
