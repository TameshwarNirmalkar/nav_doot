import { Breadcrumb, Space } from 'antd';
import CustomerWrapper from './_components/CustomerWrapper';
import { PiCaretDoubleRightBold, PiCaretDoubleRightDuotone } from 'react-icons/pi';
import { TbCaretRightFilled } from 'react-icons/tb';
import { BiCaretRight } from 'react-icons/bi';
import { IoCaretForwardSharp } from 'react-icons/io5';
import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';

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
