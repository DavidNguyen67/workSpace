/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-30 21:20:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 21:21:00
 * @FilePath       : DeleteUserRequestDto.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.dto.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeleteUserRequestDto {
  private UUID id;
}
