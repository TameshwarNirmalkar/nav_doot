"use client";

import MainHeader from "@src/components/MainHeader/MainHeader";
import type { MenuProps } from "antd";
import { Flex, Input, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsCreditCard2FrontFill, BsTools } from "react-icons/bs";
import { CgListTree } from "react-icons/cg";
import { FaHandsHelping } from "react-icons/fa";
import { FaLayerGroup, FaMapLocationDot, FaStreetView, FaTreeCity, FaUserGear, FaUserShield, FaUsers } from "react-icons/fa6";
import { GiMatterStates, GiTicket, GiTransportationRings } from "react-icons/gi";

import { GrDocumentPerformance, GrDocumentStore, GrNavigate, GrScan, GrSystem } from "react-icons/gr";
import { HiDocumentReport } from "react-icons/hi";
import { ImBooks, ImEarth, ImLocation, ImOffice } from "react-icons/im";
import { IoIosBarcode, IoIosCreate, IoIosPricetags } from "react-icons/io";
import { IoBookmarkSharp } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid, LiaShippingFastSolid, LiaStreetViewSolid } from "react-icons/lia";
import { MdDashboardCustomize, MdDeliveryDining, MdGpsFixed, MdOutlineContactPhone, MdOutlineFestival, MdOutlineHistory } from "react-icons/md";
import { PiApplePodcastsLogoFill, PiMapPinSimpleAreaFill, PiUsersFill } from "react-icons/pi";
import { RiCustomerService2Fill, RiPagesLine, RiTimeZoneFill, RiUploadCloud2Fill, RiUserSettingsLine } from "react-icons/ri";
import { SiGitbook, SiNaver, SiProducthunt, SiVictoriametrics } from "react-icons/si";
import { TbBinaryTree2Filled, TbBrandGoogleAnalytics, TbGpsFilled, TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse, TbShoppingBagSearch, TbTimelineEventPlus, TbTransactionRupee } from "react-icons/tb";

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "auto",
  backgroundColor: "#02001c",
  border: "none",
};

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: Array<MenuItem> = [
  {
    key: "dashboard",
    icon: <MdDashboardCustomize size={20} />,
    label: <Link href={"/dashboard/sales"}>Dashboard</Link>,
  },
  {
    key: "booking",
    icon: <GiTicket size={20} />,
    label: <Link href={"/booking"}>Booking</Link>,
  },
  {
    key: "outscan_inscan",
    icon: <GrScan size={20} />,
    label: <Link href={"/out_in_scan"}>Outscan/Inscan</Link>,
  },
  {
    key: "delivery",
    icon: <MdDeliveryDining size={20} />,
    label: <Link href={"/delivery"}>Delivery</Link>,
  },
  {
    key: "pod_management",
    icon: <PiApplePodcastsLogoFill size={20} />,
    label: <Link href={"/pod_management"}>POD Management</Link>,
  },
  {
    key: "tracking",
    icon: <TbGpsFilled size={20} />,
    label: "Tracking",
    children: [
      {
        key: "live",
        icon: <MdGpsFixed size={20} />,
        label: <Link href={"/tracking/live"}>Live Tracking</Link>,
      },
      {
        key: "history",
        icon: <MdOutlineHistory size={20} />,
        label: <Link href={"/tracking/history"}>History</Link>,
      },
      {
        key: "status_report",
        icon: <RiPagesLine size={20} />,
        label: <Link href={"/tracking/status_report"}>Status Report</Link>,
      },
    ],
  },
  {
    key: "analytics",
    icon: <TbBrandGoogleAnalytics size={20} />,
    label: "Analytics",
    children: [
      {
        key: "booking_analytics",
        icon: <SiGitbook size={20} />,
        label: <Link href={"/analytics/booking"}>Booking Analytics</Link>,
      },
      {
        key: "delivery_metrics",
        icon: <SiVictoriametrics size={20} />,
        label: <Link href={"/analytics/delivery_metrics"}>Delivery Metrics</Link>,
      },
      {
        key: "partner_performance",
        icon: <GrDocumentPerformance size={20} />,
        label: <Link href={"/analytics/partner_performance"}>Partner Performance</Link>,
      },
    ],
  },
  {
    key: "setup_manage",
    // icon: <MdDashboardCustomize size={20} />,
    label: <div className="border-b">Setup & Manage</div>,
    disabled: true,
  },
  {
    key: "location",
    icon: <ImLocation size={20} />,
    label: "Network",
    children: [
      {
        key: "serviceable_area",
        icon: <PiMapPinSimpleAreaFill size={20} />,
        label: <Link href={"/location/serviceable_area"}>Serviceable Area</Link>,
      },
      {
        key: "branches_hub",
        icon: <ImEarth size={20} />,
        label: <Link href={"/location/branches_hub"}>Branches/Hubs</Link>,
      },
      {
        key: "partners",
        icon: <FaHandsHelping size={20} />,
        label: <Link href={"/location/partners"}>Partners</Link>,
      },
      // {
      //   key: 'branches_type',
      //   icon: <ImEarth size={20} />,
      //   label: <Link href={'/location/branches_type'}>Branche Type</Link>,
      // },
      // {
      //   key: 'zone',
      //   icon: <RiTimeZoneFill size={20} />,
      //   label: <Link href={'/location/zone'}>Zone/Region</Link>,
      // },
      // {
      //   key: 'region',
      //   icon: <FaMapLocationDot size={20} />,
      //   label: <Link href={'/location/region'}>Region</Link>,
      // },
      // {
      //   key: 'state',
      //   icon: <GiMatterStates size={20} />,
      //   label: <Link href={'/location/state'}>State</Link>,
      // },
      // {
      //   key: 'city',
      //   icon: <FaTreeCity size={20} />,
      //   label: <Link href={'/location/city'}>City</Link>,
      // },
      // {
      //   key: 'postal_code',
      //   icon: <IoIosBarcode size={20} />,
      //   label: <Link href={'/location/postal_code'}>Postal Code</Link>,
      // },
    ],
  },

  // children: [
  //   {
  //     key: 'customers',
  //     icon: <RiCustomerService2Fill size={20} />,
  //     label: <Link href={'/partners/customers'}>Customers</Link>,
  //   },
  //   {
  //     key: 'vendors',
  //     icon: <TbTimelineEventPlus size={20} />,
  //     label: <Link href={'/partners/vendors'}>Vendors</Link>,
  //   },
  //   {
  //     key: 'franchisees',
  //     icon: <TbBinaryTree2Filled size={20} />,
  //     label: <Link href={'/partners/franchisees'}>Franchisees</Link>,
  //   },
  //   {
  //     key: 'agents',
  //     icon: <MdDeliveryDining size={20} />,
  //     label: <Link href={'/partners/agents'}>Agents/Associates</Link>,
  //   },
  // ],
  // },
  {
    key: "contracts",
    icon: <MdOutlineContactPhone size={20} />,
    label: "Contracts",
    children: [
      {
        key: "rfqs",
        icon: <IoIosCreate size={20} />,
        label: <Link href={"/contracts/rfqs"}>RFQs</Link>,
      },
      {
        key: "proposals",
        icon: <ImBooks size={20} />,
        label: <Link href={"/contracts/proposals"}>Praposals</Link>,
      },
      {
        key: "agreements",
        icon: <FaLayerGroup size={20} />,
        label: <Link href={"/contracts/agreements"}>Agreements</Link>,
      },
    ],
  },
  {
    key: "settings",
    icon: <RiUserSettingsLine size={20} />,
    label: "Settings",
    children: [
      {
        key: "users_role",
        icon: <FaUsers size={20} />,
        label: <Link href={"/settings/users_roles"}>Team</Link>,
      },
      {
        key: "permission",
        icon: <FaUserGear size={20} />,
        label: <Link href={"/settings/permission"}>Permission</Link>,
      },
      {
        key: "company_info",
        icon: <FaUserShield size={20} />,
        label: <Link href={"/settings/company_info"}>Company Info</Link>,
      },
      {
        key: "system_logs",
        icon: <GrSystem size={20} />,
        label: <Link href={"/settings/system_logs"}>System Logs</Link>,
      },
    ],
  },

  // {
  //   key: 'transaction',
  //   icon: <TbTransactionRupee size={20} />,
  //   label: 'Transaction',
  //   children: [
  //     {
  //       key: 'booking',
  //       icon: <IoBookmarkSharp size={20} />,
  //       label: <Link href={'/transaction/booking'}>Booking</Link>,
  //     },
  //     {
  //       key: 'mainfest',
  //       icon: <MdOutlineFestival size={20} />,
  //       label: <Link href={'/transaction/mainfest'}>Manifest</Link>,
  //     },
  //     {
  //       key: 'shipment_inscan',
  //       icon: <LiaStreetViewSolid size={20} />,
  //       label: <Link href={'/transaction/shipment_inscan'}>Shipment Inscan</Link>,
  //     },
  //     {
  //       key: 'out_for_delivery',
  //       icon: <LiaShippingFastSolid size={20} />,
  //       label: <Link href={'/transaction/out_for_delivery'}>Out For Delivery</Link>,
  //     },
  //     {
  //       key: 'delivery',
  //       icon: <FaStreetView size={20} />,
  //       label: <Link href={'/transaction/delivery'}>Delivery</Link>,
  //     },
  //   ],
  // },
  // {
  //   key: 'invoicing',
  //   icon: <LiaFileInvoiceDollarSolid size={20} />,
  //   label: 'Invoicing',
  //   children: [
  //     {
  //       key: 'tarrifs',
  //       icon: <IoIosCreate size={20} />,
  //       label: <Link href={'/invoicing/tarrifs'}>Tarrifs</Link>,
  //     },
  //     {
  //       key: 'create_invoice',
  //       icon: <ImBooks size={20} />,
  //       label: <Link href={'/invoicing/create_invoice'}>Create Invoice</Link>,
  //     },
  //     {
  //       key: 'invoice',
  //       icon: <FaLayerGroup size={20} />,
  //       label: <Link href={'/invoicing/invoice'}>Invoice</Link>,
  //     },
  //   ],
  // },
  // {
  //   key: 'report_analysis',
  //   icon: <HiDocumentReport size={20} />,
  //   label: 'Report Analysis',
  //   children: [
  //     {
  //       key: 'booking_report',
  //       icon: <IoIosCreate size={20} />,
  //       label: <Link href={'/report_analysis/booking_report'}>Booking Report</Link>,
  //     },
  //     {
  //       key: 'dispatch_report',
  //       icon: <ImBooks size={20} />,
  //       label: <Link href={'/report_analysis/dispatch_report'}>Dispatch Report</Link>,
  //     },
  //     {
  //       key: 'performance_report',
  //       icon: <FaLayerGroup size={20} />,
  //       label: <Link href={'/report_analysis/performance_report'}>Performance Report</Link>,
  //     },
  //   ],
  // },
  // {
  //   key: 'company_tools',
  //   icon: <BsTools size={20} />,
  //   label: 'Company Tools',
  //   children: [
  //     {
  //       key: 'upload_logo',
  //       icon: <RiUploadCloud2Fill size={20} />,
  //       label: <Link href={'/company_tools/upload_logo'}>Upload Logo</Link>,
  //     },
  //     {
  //       key: 'payment_models',
  //       icon: <BsCreditCard2FrontFill size={20} />,
  //       label: <Link href={'/company_tools/payment_models'}>Payment Models</Link>,
  //     },
  //     {
  //       key: 'transport_models',
  //       icon: <GiTransportationRings size={20} />,
  //       label: <Link href={'/company_tools/transport_models'}>Transport Models</Link>,
  //     },
  //     {
  //       key: 'proof_documents',
  //       icon: <GrDocumentStore size={20} />,
  //       label: <Link href={'/company_tools/proof_documents'}>Proof Documents</Link>,
  //     },
  //   ],
  // },
];
export default function AuthorizedLayout({ children }: { children: React.ReactNode }) {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const selectedMenu = useMemo(() => {
    const keyArray = pathname.split("/").filter((i) => i);
    return keyArray;
  }, [pathname]) as string[];

  useEffect(() => {
    setSelectedKeys(selectedMenu);
    setOpenKeys(selectedMenu.slice(0, selectedMenu.length - 1));
  }, [selectedMenu]);

  const onMenuSelect: MenuProps["onSelect"] = useCallback(({ key, keyPath, selectedKeys, domEvent }: any) => {
    setSelectedKeys(selectedKeys);
  }, []);

  const onMenuChange: MenuProps["onOpenChange"] = useCallback((openKeys: string[]) => {
    setOpenKeys(openKeys);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={270}>
        <div className={`flex align-middle justify-${!collapsed ? "between" : "center"} py-4 px-1`}>
          {!collapsed ? (
            <span className="flex">
              <SiNaver size={20} color="white" />
              <GrNavigate size={20} color="white" />
            </span>
          ) : null}
          <span className="cursor-pointer text-white text-right" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <TbLayoutSidebarRightCollapse size={32} /> : <TbLayoutSidebarLeftCollapse size={32} />}
          </span>
        </div>
        <Menu theme="light" mode="inline" items={items} selectedKeys={selectedKeys} openKeys={openKeys} onSelect={onMenuSelect} onOpenChange={onMenuChange} />
      </Sider>
      <Layout>
        <div className="shadow-gray-200 shadow-md p-10 flex w-full mb-3" style={{ padding: "9px 20px", backgroundColor: "white", position: "sticky", top: 0, zIndex: 1 }}>
          <div className="align-middle justify-between flex w-full">
            <div className="">
              <Input style={{ width: 500 }} placeholder="Search" />
            </div>
            <div>
              <MainHeader />
            </div>
          </div>
        </div>
        <Content style={{ margin: "0 16px" }}>
          <div>
            <section>{children}</section>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>NavDoot ©Created by NavDoot Logistics Solutions Pvt Ltd</Footer>
      </Layout>
    </Layout>
  );
}
