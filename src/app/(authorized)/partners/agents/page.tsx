import BreadcrumbComponent from "@src/components/BreadcrumbComponent/BreadcrumbComponent";
import { Space } from "antd";
import AgentsWrapper from "./_components/AgentsWrapper";

export default function VendorsPage() {
  return (
    <div className="mt-3">
      <BreadcrumbComponent items={[{ title: "Setup & Manage" }, { title: "Partners" }, { title: "Agents-Associates" }]} />
      <Space direction="vertical" className="flex w-full">
        <AgentsWrapper />
      </Space>
    </div>
  );
}
