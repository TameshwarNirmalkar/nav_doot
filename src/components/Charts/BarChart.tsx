"use client";

import React, { memo } from "react";
import { Column } from "@ant-design/plots";

const BarChart = () => {
  const config = {
    height: 300,
    legend: false,
    data: {
      type: "fetch",
      value: "https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json",
    },
    xField: "year",
    yField: "value",
    stack: true,
    colorField: "type",
    label: {
      text: "value",
      textBaseline: "bottom",
      position: "inside",
    },
    interaction: {
      elementHighlightByColor: {
        link: true,
      },
    },
    state: {
      active: { linkFill: "rgba(0,0,0,0.25)", lineWidth: 0.1 },
      inactive: { opacity: 0.5 },
    },
    scale: {
      color: {
        range: ["#f4664a", "#faad14", "#a0d911", "#52c41a", "13c2c2", "#1890ff", "#2f54eb", "#722ed1"],
      },
    },
  };

  return (
    <div>
      <Column {...config} />
    </div>
  );
};

export default memo(BarChart);
