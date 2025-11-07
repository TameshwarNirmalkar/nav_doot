"use client";

import { FunnelPlotOutlined } from "@ant-design/icons";
import { theme } from "antd";
import { ColumnGroupType, ColumnType } from "antd/es/table";
import React from "react";
import { RiFilter3Fill } from "react-icons/ri";

// 1. Define the props interface for the ACTUAL React Component
interface FilterIconComponentProps {
  filtered?: boolean;
}

// Define the type for a single column object
type AntdColumnType<T> = ColumnType<T> | ColumnGroupType<T>;

const CustomFilterIconComponent: React.FC<FilterIconComponentProps> = ({ filtered }) => {
  const { token } = theme.useToken();
  return (
    <RiFilter3Fill
      style={{
        color: filtered ? token.colorPrimary : undefined,
        transition: "color 0.3s",
        fontSize: "16px",
      }}
    />
  );
};

const TableFilterIcon = (filtered: boolean): React.ReactNode => {
  return <CustomFilterIconComponent filtered={filtered} />;
};

const CreateFilterableColumn = <T extends object = Record<string, any>>(columnProps: Omit<AntdColumnType<T>, "filterIcon">): AntdColumnType<T> => ({
  filterIcon: TableFilterIcon,
  ...columnProps,
});

export default CreateFilterableColumn;
