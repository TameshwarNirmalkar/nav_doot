import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';
import PermissionWrapper from './_components/PermissionWrapper';

export default function PermissionPage() {
  return (
    <div>
      {/* <BreadcrumbComponent items={[{ title: 'Settings' }, { title: 'Permission' }]} /> */}
      <PermissionWrapper />
    </div>
  );
}
