import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';
import { Space } from 'antd';
import CustomerWrapper from './_components/CustomerWrapper';

export default function BranchesPage() {
  return (
    <div className="mt-3">
      <BreadcrumbComponent items={[{ title: 'Partners' }, { title: 'Customers' }]} />
      <Space direction="vertical" className="flex w-full">
        <CustomerWrapper />
      </Space>
    </div>
  );
}
