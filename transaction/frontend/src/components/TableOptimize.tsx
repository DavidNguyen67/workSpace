import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import { RefTable } from 'antd/es/table/interface';
import React from 'react';

// interface TableColumn<Data> {
//   key: keyof Data;
//   title: keyof Data;
//   dataIndex: keyof Data;
// }

interface TableOptimizeProps<Data> extends RefTable {
  columns: ColumnType<Data>[];
  dataSource: Data[];
}

const TableOptimize = <Data extends Photo>({
  columns,
  dataSource,
  ...props
}: Readonly<TableOptimizeProps<Data>>) => {
  return (
    <Table
      {...props}
      size='small'
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default TableOptimize;
