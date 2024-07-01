/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-30 21:20:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:16:29
 * @FilePath       : DeleteUserRequestDto.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeleteUserRequestDto {
  private String id;
}
