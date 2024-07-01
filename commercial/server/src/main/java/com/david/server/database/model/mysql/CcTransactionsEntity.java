/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 22:09:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 09:42:15
 * @FilePath       : CcTransactionsEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.model.mysql;

import java.sql.Timestamp;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "cc_transactions")
@Data
@EqualsAndHashCode(callSuper = true)
public class CcTransactionsEntity extends BaseEntity {
  @Column
  private String code;

  @Column(name = "order_id", nullable = false) // thông qua khóa ngoại order_id
  private UUID orderId;

  @Column
  private Timestamp transdate;

  @Column(nullable = false)
  private String processor;

  @Column(name = "processor_trans_id", nullable = false)
  private String processorTransId;

  @Column(nullable = false)
  private Double amount;

  @Column(name = "cc_num")
  private String ccNum;

  @Column(name = "cc_type")
  private String ccType;

  @Column
  private String response;

}
