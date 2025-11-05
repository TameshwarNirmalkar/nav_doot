import LocationTableList from '@src/app/(authorized)/location/serviceable_area/_components/AddCountry/TableList';
import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';
import { Breadcrumb, Space } from 'antd';

export default function ServiceableAreaPage() {
  return (
    <div>
      {/* <BreadcrumbComponent items={[{ title: 'Network' }, { title: 'Serviceable Area' }]} /> */}
      {/* <Space direction="vertical" className="flex w-full"> */}
      <LocationTableList />
      {/* </Space> */}
    </div>
  );
}
