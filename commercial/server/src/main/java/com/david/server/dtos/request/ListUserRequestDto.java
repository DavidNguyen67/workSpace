/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-29 22:29:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-30 10:40:16
 * @FilePath       : ListUserRequestDto.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ListUserRequestDto {
  // @NotNull(message = "Skip must not be null")
  // @Digits(integer = Integer.MAX_VALUE, fraction = 0, message = "Skip must be a
  // valid integer")
  private Integer limit;

  // @NotNull(message = "Offset must not be null")
  // @Digits(integer = Integer.MAX_VALUE, fraction = 0, message = "Offset must be
  // a valid integer")
  private Integer offset;
}
