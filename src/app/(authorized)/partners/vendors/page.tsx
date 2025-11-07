import BreadcrumbComponent from "@src/components/BreadcrumbComponent/BreadcrumbComponent";
import { Space } from "antd";
import VendorWrapper from "./_components/VendorWrapper";

export default function VendorsPage() {
  return (
    <div className="mt-3">
      <BreadcrumbComponent items={[{ title: "Partners" }, { title: "Vendors" }]} />
      <Space direction="vertical" className="flex w-full">
        <VendorWrapper />
      </Space>
    </div>
  );
}
