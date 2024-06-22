/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:12:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 19:21:19
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.models.mysql;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

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
public class BaseEntity {
  @Id
  private String id;

  @CreationTimestamp
  @Column(name = "inserted_at", updatable = false)
  private Timestamp insertedAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private Timestamp updatedAt;

}
