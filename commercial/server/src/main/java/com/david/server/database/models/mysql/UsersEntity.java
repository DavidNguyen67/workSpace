/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 14:56:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-29 14:24:03
 * @FilePath       : UsersEntity.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.models.mysql;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.*;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true)
public class UsersEntity extends BaseEntity {
  @Column(unique = true)
  private String email;

  @Column(nullable = false, unique = false)
  private String firstName;

  @Column(nullable = false, unique = false)
  private String lastName;

  @Column(columnDefinition = "boolean default true")
  private Boolean active;

  /**
   * Thiết lập mối quan hệ nhiều-nhiều giữa UsersEntity và RolesEntity.
   * 
   * @CascadeType.ALL được sử dụng để áp dụng các thao tác (persist, merge,
   *                  remove,
   *                  refresh, detach)
   * @FetchType.LAZY được sử dụng khi dữ liệu liên quan sẽ chỉ được tải khi cần
   *                 thiết, tức là khi nó thực sự được truy cập
   *                 từ thực thể chính đến thực thể liên quan.
   * 
   * @JoinTable định nghĩa bảng liên kết trung gian "user_roles" giữa bảng "users"
   *            và "roles".
   * @JoinColumn(name = "user_id") chỉ định cột khóa chính trong bảng này
   *                  tham chiếu đến "user_id".
   * @inverseJoinColumns = @JoinColumn(name = "role_id") chỉ định cột khóa chính
   *                     trong bảng RolesEntity tham chiếu đến "role_id".
   * 
   * @EqualsAndHashCode.Exclude được sử dụng để loại trừ một
   *                            trường khỏi việc tính
   *                            toán phương thức equals và hashCode.
   * 
   * @ToString.Exclude được sử dụng để loại trừ một trường khỏi phương thức
   *                   toString.
   */
  @ManyToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
  @JoinTable(name = "user_roles", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
      @JoinColumn(name = "role_id") })
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  Set<RolesEntity> roles = new HashSet<>();

  /**
   * Mối quan hệ một-nhiều với thực thể SalesOrdersEntity.
   *
   * @OneToMany: Đánh dấu đây là mối quan hệ một-nhiều.
   * @mappedBy = "user": Chỉ ra rằng mối quan hệ này được ánh xạ bởi thuộc tính
   *           "user" trong lớp SalesOrdersEntity.
   * @CascadeType.ALL: Áp dụng tất cả các kiểu cascade (PERSIST,
   *                   MERGE, REMOVE, REFRESH, DETACH).
   * @FetchType.LAZY: Sử dụng phương thức tải dữ liệu lười (lazy
   *                  loading).
   * @EqualsAndHashCode.Exclude: Loại trừ trường này khỏi các phương thức
   *                             equals và hashCode được tạo bởi Lombok.
   * @ToString.Exclude: Loại trừ trường này khỏi phương thức toString được tạo
   *                    bởi Lombok.
   */
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  private Set<SalesOrdersEntity> salesOrders;
}
