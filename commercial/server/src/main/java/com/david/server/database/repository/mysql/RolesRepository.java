/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 15:44:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:02:47
 * @FilePath       : RolesRepository.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.database.repository.mysql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.david.server.database.model.mysql.RolesEntity;

@Repository
public interface RolesRepository extends JpaRepository<RolesEntity, String> {
}
