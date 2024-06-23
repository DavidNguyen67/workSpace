/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:44:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-23 15:29:49
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.repositories.mysql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.david.server.database.models.mysql.RolesEntity;
import com.david.server.database.repositories.mysql.interfaces.IRolesRepository;

/**
 * Interface đại diện cho một repository để quản lý các entity trong cơ sở dữ
 * liệu.
 * Cung cấp các phương thức cơ bản để thao tác với cơ sở dữ liệu như lưu, cập
 * nhật, xóa và truy vấn dữ liệu.
 * 
 * @template T - Kiểu của entity được quản lý.
 * @template ID - Kiểu của khóa chính của entity.
 * @interface JpaRepository
 * @extends IRolesRepository // Giả sử là interface khác nếu có
 */
@Repository
public interface RolesRepository extends JpaRepository<RolesEntity, String>, IRolesRepository {
  @Override
  default void test() {
    System.out.println("hehe");
  }
}
