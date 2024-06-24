/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 21:16:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-24 21:17:17
 * @CopyRight      : Con chù chù 🥴🥴
 **/

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default sleep;
