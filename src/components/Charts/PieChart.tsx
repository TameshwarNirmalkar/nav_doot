'use client';

import { Pie } from '@ant-design/plots';
import React, { memo } from 'react';

const PieChart = () => {
  const config = {
    height: 300,
    data: [
      { type: 'Category 1', value: 27 },
      { type: 'Category 2', value: 25 },
      { type: 'Category 3', value: 18 },
      { type: 'Category 4', value: 15 },
      { type: 'Category 5', value: 10 },
      { type: 'Category 6', value: 5 },
    ],
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: false,
    // legend: {
    //   color: {
    //     title: false,
    //     position: 'right',
    //     rowPadding: 5,
    //   },
    // },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'Tata Motors',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 20,
          fontStyle: 'bold',
        },
      },
    ],
  };
  return <Pie {...config} />;
};

export default memo(PieChart);
