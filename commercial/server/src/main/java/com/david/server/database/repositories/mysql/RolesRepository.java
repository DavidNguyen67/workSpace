/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:44:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-22 17:57:31
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.database.repositories.mysql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.david.server.database.models.mysql.RolesEntity;

@Repository
public interface RolesRepository extends JpaRepository<RolesEntity, String> {
}
