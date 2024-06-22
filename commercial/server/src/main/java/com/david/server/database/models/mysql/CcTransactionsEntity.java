/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 22:09:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 23:53:39
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "cc_transactions")
@Data
@EqualsAndHashCode(callSuper = true)
public class CcTransactionsEntity extends BaseEntity {
  @Column
  private String code;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id", nullable = false) // thông qua khóa ngoại order_id
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private SalesOrdersEntity salesOrders;

  @Column
  private Timestamp transdate;

  @Column(nullable = false)
  private String processor;

  @Column(name = "processor_trans_id", nullable = false)
  private String processorTransId;

  @Column(nullable = false)
  private double amount;

  @Column(name = "cc_num")
  private String ccNum;

  @Column(name = "cc_type")
  private String ccType;

  @Column
  private String response;

}
