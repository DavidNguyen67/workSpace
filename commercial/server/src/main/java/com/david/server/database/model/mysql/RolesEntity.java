/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 23:46:59
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.model.mysql;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "roles")
@Data
@EqualsAndHashCode(callSuper = true)
public class RolesEntity extends BaseEntity {
  @Column(nullable = false)
  private String name;

  /**
   * Thiết lập mối quan hệ nhiều-nhiều giữa UsersEntity và RolesEntity.
   * 
   * @CascadeType.ALL được sử dụng để áp dụng các thao tác (persist, merge,
   *                  remove,
   *                  refresh, detach).
   * @FetchType.LAZY được sử dụng khi dữ liệu liên quan sẽ chỉ được tải khi cần
   *                 thiết, tức là khi nó thực sự được truy cập
   *                 từ thực thể chính đến thực thể liên quan.
   * 
   * @JoinTable định nghĩa bảng liên kết trung gian "user_roles" giữa bảng "users"
   *            và "roles".
   * @JoinColumn(name = "user_roles") chỉ định cột khóa chính trong bảng này
   *                  tham chiếu đến "user_roles".
   * @inverseJoinColumns = @JoinColumn(name = "user_id") chỉ định cột khóa chính
   *                     trong bảng RolesEntity tham chiếu đến "user_id".
   * 
   * @EqualsAndHashCode.Exclude được sử dụng để loại trừ một trường khỏi việc tính
   *                            toán phương thức equals và hashCode.
   * 
   * @ToString.Exclude được sử dụng để loại trừ một trường khỏi phương thức
   *                   toString.
   */
  @ManyToMany(cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
  @JoinTable(name = "user_roles", joinColumns = { @JoinColumn(name = "role_id") }, inverseJoinColumns = {
      @JoinColumn(name = "user_id") })
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  Set<UsersEntity> users = new HashSet<>();

}
