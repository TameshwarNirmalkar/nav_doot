'use client';

import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { memo } from 'react';

interface CustomTableProps<T> {
  titleText?: string;
  onRowClick?: (record: T) => void;
}
type TableComponentProps<T> = TableProps<T> & CustomTableProps<T>;

const TableComponent = <T extends {}>({ titleText, onRowClick, ...tableProps }: TableComponentProps<T>) => {
  return (
    <div>
      <Table<T> bordered={true} {...tableProps} />
    </div>
  );
};

export default memo(TableComponent);
