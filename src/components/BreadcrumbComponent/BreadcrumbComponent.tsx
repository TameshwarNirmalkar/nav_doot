import { Breadcrumb, BreadcrumbProps } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { memo } from "react";
import { IoCaretForwardSharp } from "react-icons/io5";
import { TbArrowBadgeRightFilled } from "react-icons/tb";

interface CustomBreadcrumbProps {
  // We grab the type of the 'items' prop directly from the library's props type
  items: BreadcrumbProps["items"];
}

// Define the structure of a single item
// interface BreadcrumbItemI {
//   title: string | React.ReactElement | React.ReactNode;
//   href?: string;
// }
// separator={<TbArrowBadgeRightFilled size={24} />}

export default memo(function BreadcrumbComponent({ items }: CustomBreadcrumbProps) {
  return <Breadcrumb style={{ marginBottom: 10 }} items={items} />;
});
