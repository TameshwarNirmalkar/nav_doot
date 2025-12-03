import { Button, Checkbox, CheckboxChangeEvent, CheckboxProps, Dropdown, Space } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { IoCaretDown } from 'react-icons/io5';
import { TbFilterCheck } from 'react-icons/tb';

const CheckboxGroup = Checkbox.Group;

const DropdownWithCheckboxes = ({ tableColumns, onFilterChangeValue }: { tableColumns: Array<any>; onFilterChangeValue?: (val: string[]) => void }) => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const optiions = useMemo(() => {
    return tableColumns.map((el) => ({
      label: el.title,
      value: el.dataIndex,
    }));
  }, [tableColumns]);

  const onGroupChange = useCallback(
    (list: string[]) => {
      setCheckedList(list);
      if (typeof onFilterChangeValue === 'function') {
        onFilterChangeValue(list);
      }
    },
    [onFilterChangeValue],
  );

  // const selectAll = tableColumns.map((el) => (el.dataIndex));
  // const allChecked = checkedList.length === optiions.length;
  // const indeterminate = checkedList.length > 0 && checkedList.length < optiions.length;
  // const onCheckAllChange  = (e: CheckboxChangeEvent) => {
  //   setCheckedList(e.target.checked ? selectAll : []);
  // };

  const renderDropdownContent = () => (
    <div className="bg-white rounded p-2 shadow-2xl shadow-gray-300 border-gray-500" style={{ width: 190 }} onClick={(e) => e.stopPropagation()}>
      {/* <Space direction="vertical" style={{ width: "100%" }}> */}
      {/* <div className="border-b border-gray-200 py-2">
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={allChecked}>
            Select All
          </Checkbox>
        </div> */}
      <CheckboxGroup options={optiions} value={checkedList} onChange={onGroupChange} className="flex flex-col gap-2" />
      {/* </Space> */}
    </div>
  );

  return (
    <Dropdown popupRender={renderDropdownContent} trigger={['click']}>
      <Button type="primary" icon={<TbFilterCheck />} style={{ width: 190 }}>
        <Space>
          Hide Columns ({checkedList.length}){/* <IoCaretDown /> */}
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropdownWithCheckboxes;
