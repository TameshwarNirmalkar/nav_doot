import AddCountry from '@src/app/(authorized)/location/serviceable_area/_components/AddCountry/AddCountry';
import LocationTableList from '@src/app/(authorized)/location/serviceable_area/_components/AddCountry/TableList';
import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';
import { Breadcrumb, Card, Space } from 'antd';

export default function CountryPage() {
  return (
    <div className="mt-3">
      <BreadcrumbComponent items={[{ title: 'Location' }, { title: 'Searchable Area' }]} />
      <Space direction="vertical" className="flex w-full">
        <LocationTableList />
      </Space>
    </div>
  );
}
