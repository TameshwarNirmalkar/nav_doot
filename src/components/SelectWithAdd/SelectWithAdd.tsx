import { App, Button, Divider, Form, Input, InputRef, Select, Space } from 'antd';
import React, { memo, useCallback, useRef, useState } from 'react';
import IconLoader from '../IconLoader/IconLoader';

type FieldListType = {
  field_id: number | string;
  field_name: string;
};

interface SelectWithAddI<T extends Record<string, any>> {
  dropDownList: T[];
  field_id: string;
  loadingState: boolean;
  buttonLabel: string;
  formItemLabel: string;
  onAddHandler: (txt: string) => void;
  onItemSelectHandler?: (options: any) => void;
  formPlaceholder?: string;
  htmlProps?: { tabIndex: number };
}

export default memo(function SelectWithAdd({ dropDownList, field_id, loadingState, buttonLabel, formItemLabel, onAddHandler, onItemSelectHandler, formPlaceholder, htmlProps }: SelectWithAddI<FieldListType>) {
  const inputRef = useRef<InputRef>(null);
  const [local_name, setLocalName] = useState<string>('');
  // const { message } = App.useApp();

  const onAddFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(event.target.value);
  };

  const onItemSelect = useCallback(
    (_fldval: FieldListType, option: any) => {
      if (typeof onItemSelectHandler === 'function') {
        onItemSelectHandler(option);
      }
    },
    [onItemSelectHandler],
  );

  return (
    <Form.Item
      layout="vertical"
      label={
        <Space>
          <span>{formItemLabel}</span>
        </Space>
      }
      name={field_id}
      rules={[{ required: true, message: 'Required' }]}>
      <Select
        tabIndex={htmlProps?.tabIndex}
        style={{ width: '100%' }}
        placeholder={formPlaceholder || 'Select Branch'}
        optionFilterProp="label"
        filterSort={(optionA, optionB) => (optionA?.field_name ?? '').toLowerCase().localeCompare((optionB?.field_name ?? '').toLowerCase())}
        fieldNames={{ label: 'field_name', value: 'field_id' }}
        options={dropDownList}
        onSelect={onItemSelect}
        popupRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <div className="p-3 align-middle justify-between flex gap-2">
              <Input placeholder="Please enter value" ref={inputRef} value={local_name} onChange={onAddFieldChange} onKeyDown={(e) => e.stopPropagation()} />
              <Button type="primary" icon={loadingState ? <IconLoader showLoader={loadingState} iconSize={20} /> : null} onClick={() => onAddHandler(local_name)} disabled={loadingState}>
                {buttonLabel}
              </Button>
            </div>
          </>
        )}
      />
    </Form.Item>
  );
});
