import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';
import { Space } from 'antd';
import BranchesWrapper from './_components/BranchesWrapper';

export default function BranchesPage() {
  return (
    <div>
      {/* <BreadcrumbComponent items={[{ title: 'Partner' }, { title: 'Branches' }]} /> */}
      {/* <Space direction="vertical" className="flex w-full"> */}
      <BranchesWrapper />
      {/* </Space> */}
    </div>
  );
}
