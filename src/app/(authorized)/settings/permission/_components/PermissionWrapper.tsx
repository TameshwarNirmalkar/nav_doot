"use client";

import { Card } from "antd";
import React, { memo } from "react";
import PermissionTable from "./PermissionTable";

export default memo(function PermissionWrapper() {
  return (
    <Card title="Permission">
      <PermissionTable />
    </Card>
  );
});
