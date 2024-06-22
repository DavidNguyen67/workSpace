/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:12:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 15:21:31
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import java.sql.Timestamp;
import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

/**
 * Annotation của Lombok để tạo các phương thức getter, setter, toString,
 * equals, và hashCode.
 */
@Data

/**
 * Annotation của JPA để chỉ ra rằng lớp này là lớp cha mà các lớp thực thể khác
 * có thể kế thừa.
 */
@MappedSuperclass

/**
 * Annotation của JPA để chỉ ra rằng lớp này là lớp cha mà các lớp thực thể
 * khác
 * có thể kế thừa.
 */
public class BaseEntity {
  /**
   * Định danh duy nhất cho thực thể.
   */
  @Id
  private String id;

  /**
   * Dấu thời gian khi thực thể được thêm vào cơ sở dữ liệu.
   * Giá trị này được tự động tạo khi thực thể được chèn và không thể cập nhật.
   */
  @CreationTimestamp
  @Column(name = "inserted_at", updatable = false)
  private Timestamp insertedAt;

  /**
   * Dấu thời gian khi thực thể được cập nhật lần cuối.
   * Giá trị này được tự động cập nhật mỗi khi thực thể được cập nhật.
   */
  @UpdateTimestamp
  @Column(name = "updated_at")
  private Timestamp updatedAt;

}
