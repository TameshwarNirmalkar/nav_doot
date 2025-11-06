'use client';

import type { SelectProps } from 'antd';
import { Select, Tag } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { TbFilterPlus } from 'react-icons/tb';

type TagRenderProps = Parameters<NonNullable<SelectProps['tagRender']>>[0];

interface CustomTagRenderProps extends TagRenderProps {
  title?: string;
}

type CustomTagRender = (props: CustomTagRenderProps) => React.ReactElement;

export default memo(function FilterColumnComponent({ tableColumns, onFilterChangeValue }: { tableColumns: Array<any>; onFilterChangeValue?: (val: string[]) => void }) {
  // const [checkedValues, setCheckedValues] = useState<string[]>([]);
  // const [selectedValues, setSelectedValues] = useState<string[]>([]);
  // console.log('====== ', selectedValues);

  const optiions = useMemo(() => {
    return tableColumns.map((el) => ({
      label: el.title,
      value: el.dataIndex,
    }));
  }, [tableColumns]);

  const handleSelectChange = useCallback(
    (values: string[]) => {
      // setSelectedValues(values);
      if (typeof onFilterChangeValue === 'function') {
        onFilterChangeValue(values);
      }
    },
    [onFilterChangeValue],
  );

  // const handleCheckboxChange = (value: string, e: CheckboxChangeEvent) => {
  //   const isChecked = e.target.checked;
  //   if (isChecked) {
  //     setCheckedValues((prev) => [...prev, value]);
  //   } else {
  //     setCheckedValues((prev) => prev.filter((v) => v !== value));
  //   }
  // };

  const tagRender: CustomTagRender = (props) => {
    const { label, closable, onClose } = props;

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose}>
        {label}
      </Tag>
    );
  };

  return <Select mode="multiple" showSearch={false} tagRender={tagRender} placeholder="Select Columns to Filter" style={{ width: 350 }} suffixIcon={<TbFilterPlus size={18} color="#F97316" />} maxTagCount="responsive" onChange={handleSelectChange} options={optiions} />;
});
