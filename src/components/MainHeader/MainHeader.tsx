'use client';

import { Badge, ConfigProvider, Dropdown, Flex, Input, MenuProps, Popover, Space, Tag } from 'antd';
import Link from 'next/link';
import React, { memo } from 'react';
import { BiBell, BiHelpCircle } from 'react-icons/bi';
import { CgBell, CgShoppingCart } from 'react-icons/cg';
import { GoBell, GoBellFill } from 'react-icons/go';
import { LuLogOut } from 'react-icons/lu';
import { PiCirclesThreeBold, PiUserCircleDashedFill } from 'react-icons/pi';
import { RiProfileFill } from 'react-icons/ri';
import { SlSettings } from 'react-icons/sl';

const MainHeader = () => {
  const items: MenuProps['items'] = [
    {
      key: 'my_profile',
      label: <Link href={'/my_profile'}>My Profile</Link>,
      icon: <RiProfileFill size={16} />,
    },
    // {
    //   key: 'company_profile',
    //   label: 'Company Profile',
    //   icon: <PiUserCircleDashedFill size={16} />,
    // },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SlSettings size={16} />,
    },
    {
      key: '4',
      label: 'Logout',
      icon: <LuLogOut size={16} />,
    },
  ];

  const content = (
    <div className="flex">
      <ul className="">
        <li className="flex align-middle border-b border-b-blue-200 p-1">
          <span>Notifiction</span>
        </li>
        <li className="flex align-middle border-b border-b-blue-200 p-1">Buyer 3</li>
        <li className="flex align-middle border-b border-b-blue-200 p-1">Customer request</li>
        <li className="flex align-middle border-b border-b-blue-200 p-1">Orders</li>
        <li className="flex align-middle border-b border-b-blue-200 p-1">Consignment status</li>
        <li className="flex align-middle border-b border-b-blue-200 p-1">Dispatch</li>
      </ul>
    </div>
  );

  return (
    <div className="flex align-middle justify-between">
      <Space size={'middle'}>
        <Popover placement="bottom" content={content} style={{ width: 200 }} arrow={true}>
          <GoBellFill size={20} className="text-red-700" />
        </Popover>
        <ConfigProvider
          theme={{
            token: {
              colorBgElevated: '#1098f5',
              colorText: 'white',
            },
          }}>
          <Popover placement="bottom" content={content} style={{ width: 200 }} arrow={true}>
            <BiHelpCircle size={22} className="text-blue-400" />
          </Popover>
        </ConfigProvider>

        <Dropdown menu={{ items }} placement="bottomRight" trigger={['hover']} overlayStyle={{ width: 200 }}>
          <SlSettings size={20} className="cursor-pointer" />
        </Dropdown>

        <div className="border-0 rounded-3xl bg-purple-700 pl-2" style={{ backgroundColor: '#007bff' }}>
          <Dropdown menu={{ items }} placement="bottomRight" trigger={['hover']} overlayStyle={{ width: 200 }}>
            <Flex align="center" className="cursor-pointer">
              <span className="text-white px-1">John Doe</span>
              <PiUserCircleDashedFill size={32} color="white" />
            </Flex>
          </Dropdown>
        </div>
      </Space>
    </div>
  );
};

export default memo(MainHeader);
