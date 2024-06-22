/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 19:46:24
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
   * CascadeType.ALL được sử dụng để áp dụng các thao tác (persist, merge, remove,
   * refresh, detach)
   * từ thực thể chính đến thực thể liên quan.
   * 
   * @JoinTable định nghĩa bảng liên kết trung gian "user_roles" giữa bảng "users"
   *            và "roles".
   * @JoinColumn(name = "role_id") chỉ định cột khóa chính trong bảng này
   *                  tham chiếu đến "role_id".
   * @inverseJoinColumns = @JoinColumn(name = "user_id") chỉ định cột khóa chính
   *                     trong bảng UsersEntity tham chiếu đến "user_id".
   */
  @ManyToMany(cascade = { CascadeType.ALL })
  @JoinTable(name = "user_roles", joinColumns = { @JoinColumn(name = "role_id") }, inverseJoinColumns = {
      @JoinColumn(name = "user_id") })
  Set<UsersEntity> users = new HashSet<>();

}
