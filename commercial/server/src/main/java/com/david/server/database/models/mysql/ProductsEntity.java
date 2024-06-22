/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 23:05:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 23:55:18
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "products")
@Data
@EqualsAndHashCode(callSuper = true)
public class ProductsEntity extends BaseEntity {
  @Column(nullable = false)
  private String sku;

  @Column(nullable = false)
  private String name;

  @Column
  private String description;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) // Đánh dấu có mỗi quan hệ 1-1 với ProductStatuses
  @JoinColumn(name = "product_status_id", nullable = false) // Liên kết với nhau qua khóa ngoại product_status_id
  private ProductStatusesEntity productStatus;

  @Column(name = "regular_price")
  private double regularPrice = 0.0;

  @Column(name = "discount_price")
  private double discountPrice = 0.0;

  @Column
  private int quantity = 0;

  @Column
  private boolean taxable = false;

  /**
   * Thiết lập mối quan hệ nhiều-nhiều giữa ProductsEntity và TagsEntity.
   * CascadeType.ALL được sử dụng để áp dụng các thao tác (persist, merge,
   * remove,
   * refresh, detach)
   * từ thực thể chính đến thực thể liên quan.
   *
   * @JoinTable định nghĩa bảng liên kết trung gian "product_tags" giữa bảng
   *            "products"
   *            và "products".
   * @JoinColumn(name = "product_id") chỉ định cột khóa chính trong bảng này
   *                  tham chiếu đến "product_id" của bảng product_tags
   * @inverseJoinColumns = @JoinColumn(name = "tag_id") chỉ định cột khóa chính
   *                     trong bảng TagsEntity tham chiếu đến "tag_id". của bảng
   *                     product_tags
   */
  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinTable(name = "product_tags", joinColumns = { @JoinColumn(name = "product_id")
  }, inverseJoinColumns = {
      @JoinColumn(name = "tag_id") })
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  Set<TagsEntity> tags = new HashSet<>();

  /**
   * Thiết lập mối quan hệ nhiều-nhiều giữa ProductsEntity và CategoriesEntity.
   * CascadeType.ALL được sử dụng để áp dụng các thao tác (persist, merge,
   * remove,
   * refresh, detach)
   * từ thực thể chính đến thực thể liên quan.
   *
   * @JoinTable định nghĩa bảng liên kết trung gian "product_categories" giữa bảng
   *            "products"
   *            và "products".
   * @JoinColumn(name = "product_id") chỉ định cột khóa chính trong bảng này
   *                  tham chiếu đến "product_id" của bảng product_categories
   * @inverseJoinColumns = @JoinColumn(name = "category_id") chỉ định cột khóa
   *                     chính.
   *                     trong bảng CategoriesEntity tham chiếu đến "category_id"
   *                     của bảng
   *                     product_categories
   */
  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinTable(name = "product_categories", joinColumns = { @JoinColumn(name = "product_id")
  }, inverseJoinColumns = {
      @JoinColumn(name = "category_id") })
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  Set<CategoriesEntity> categories = new HashSet<>();
}
