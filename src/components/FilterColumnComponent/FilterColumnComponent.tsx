'use client';

import { Button, Checkbox, CheckboxChangeEvent, Dropdown, MenuProps } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { TbFilterPlus } from 'react-icons/tb';

export default memo(function FilterColumnComponent({ tableColumns }: { tableColumns: Array<any> }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const onCheckBoxChange = useCallback(
    (e: CheckboxChangeEvent, item: { [key: string]: string }) => {
      const isChecked = e.target.checked;
      const itemId = item.dataIndex;
      if (isChecked) {
        setCheckedItems([...checkedItems, item.dataIndex]);
      } else {
        setCheckedItems(checkedItems.filter((elf: any) => elf !== itemId));
      }
    },
    [checkedItems],
  );

  const filterMenu: MenuProps['items'] = useMemo(() => {
    return tableColumns.map((el, i) => ({
      label: (
        <Checkbox onChange={(e: CheckboxChangeEvent) => onCheckBoxChange(e, el)} title={el.title}>
          {el.title}
        </Checkbox>
      ),
      key: `${el.title}_${i}`,
    }));
  }, [tableColumns, onCheckBoxChange]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      setIsOpen(false);
    }
  }, []);

  const openDropDown = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <div>
      <Dropdown menu={{ items: filterMenu }} placement="bottomRight" trigger={['click']} onOpenChange={handleOpenChange} open={isOpen}>
        <Button type="primary" icon={<TbFilterPlus />} onClick={openDropDown}>
          Add Filter
        </Button>
      </Dropdown>
    </div>
  );
});
