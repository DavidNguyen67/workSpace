/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 23:15:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 23:34:20
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "categories")
@Data
@EqualsAndHashCode(callSuper = true)
public class CategoriesEntity extends BaseEntity {
  @Column(nullable = false)
  private String name;

  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JsonIgnore
  private CategoriesEntity parent;

  // Liên kết với nhau qua biến khoá ngoại tên là parent ( tự đặt tên đc )
  @ManyToMany(mappedBy = "parent")
  @JsonIgnore
  private Set<CategoriesEntity> children;
}
