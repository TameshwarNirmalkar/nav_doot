import { Space } from 'antd';
import VendorWrapper from './_components/VendorWrapper';

import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';

export default function VendorsPage() {
  return (
    <div className="mt-3">
      <BreadcrumbComponent items={[{ title: 'Partners' }, { title: 'Vendors' }]} />
      <Space direction="vertical" className="flex w-full">
        <VendorWrapper />
      </Space>
    </div>
  );
}
