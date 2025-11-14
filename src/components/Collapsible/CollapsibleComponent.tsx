import { Collapse, CollapseProps } from 'antd';
import React, { memo, useMemo } from 'react';
import { PiCaretDownFill, PiCaretUpFill } from 'react-icons/pi';

export default memo(function CollapsibleComponent({ items, expandIconPosition = 'end', activeKey, onChange }: CollapseProps) {
  // Define the custom icon logic
  const customExpandIcon: CollapseProps['expandIcon'] = (panelProps) => {
    const { isActive } = panelProps;
    return isActive ? <PiCaretDownFill /> : <PiCaretUpFill />;
  };

  return <Collapse activeKey={activeKey} expandIconPosition={expandIconPosition} expandIcon={customExpandIcon} accordion items={items} onChange={onChange} />;
});
