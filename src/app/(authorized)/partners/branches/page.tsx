import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';
import BranchesWrapper from './_components/BranchesWrapper';
import { Breadcrumb, Card, Space } from 'antd';

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
