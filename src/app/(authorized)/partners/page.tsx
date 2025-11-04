import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';
import PartnerWrapper from './_components/PartnerWrapper';

export default function PartnerPage() {
  return (
    <div>
      <BreadcrumbComponent items={[{ title: 'Partners' }]} />
      <PartnerWrapper />
    </div>
  );
}
