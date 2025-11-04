import { Breadcrumb, Card, Space } from 'antd';
import BranchesWrapper from './_components/BranchesWrapper';
import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';

export default function BranchesPage() {
  return (
    <div className="mt-3">
      <BreadcrumbComponent items={[{ title: 'Partner' }, { title: 'Branches' }]} />
      <Space direction="vertical" className="flex w-full">
        <BranchesWrapper />
      </Space>
    </div>
  );
}
