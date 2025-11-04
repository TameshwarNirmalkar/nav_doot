import { type ThemeConfig, theme } from 'antd';

const grayColor = '#504f4f';
const grayBgcolor = '#2e2e2e';

const customTheme: ThemeConfig = {
  algorithm: theme.compactAlgorithm,

  // components: {
  //   Button: {
  //     algorithm: true,
  //     defaultActiveBorderColor: "rgb(250,173,20)",
  //     defaultActiveColor: "rgb(250,173,20)",
  //   },
  //   Layout: {
  //     headerBg: "rgb(FF,FF,FF)",
  //     headerColor: "white",
  //     headerPadding: "20px 10px",
  //     headerHeight: "auto",
  //     lightTriggerColor: "rgb(250,140,22)",
  //     bodyBg: "rgb(240,240,240)",
  //     siderBg: "#0F172A",
  //     triggerBg: "rgb(ff,83,16)",
  //   },
  //   Input: {
  //     paddingXS: 12,
  //     paddingXXS: 6,
  //   },
  //   Divider: {
  //     colorSplit: "rgb(250,140,22)",
  //     colorTextHeading: "rgb(247,128,0)",
  //     colorText: "rgb(250,140,22)",
  //   },
  //   Space: {
  //     padding: 16,
  //   },
  //   Anchor: {
  //     colorSplit: "rgb(250,140,22)",
  //   },
  //   Breadcrumb: {
  //     colorPrimaryBorder: "rgb(250,140,22)",
  //     colorText: "rgb(250,140,22)",
  //     colorBgTextHover: "rgba(250,140,22,0)",
  //     itemColor: "rgb(43,43,43)",
  //     lastItemColor: "rgb(250,140,22)",
  //     linkColor: "rgba(43,43,43,0.69)",
  //   },
  //   Dropdown: {
  //     colorPrimary: "rgb(250,140,22)",
  //     colorTextLightSolid: "rgb(255,255,255)",
  //   },
  //   Cascader: {
  //     colorHighlight: "rgb(250,140,22)",
  //   },
  //   Mentions: {
  //     activeBorderColor: "rgb(250,140,22)",
  //     hoverBorderColor: "rgb(250,84,28)",
  //   },
  //   Rate: {
  //     starColor: "rgb(250,140,22)",
  //   },
  //   Slider: {
  //     colorPrimaryBorderHover: "rgb(250,140,22)",
  //   },
  //   Avatar: {
  //     colorTextLightSolid: "rgb(255,255,255)",
  //     colorTextPlaceholder: "rgb(250,140,22)",
  //   },
  //   Empty: {
  //     colorTextDescription: "rgb(250,140,22)",
  //   },
  //   Image: {
  //     colorBgMask: "rgb(250,140,22)",
  //     colorBgContainerDisabled: "rgba(250,140,22,0.34)",
  //   },
  //   List: {
  //     colorBorder: "rgb(250,84,28)",
  //   },
  //   Popover: {
  //     colorBgElevated: "rgb(250,102,28)",
  //     colorText: "rgba(255,255,255,0.88)",
  //     colorTextHeading: "rgba(255,255,255,0.88)",
  //   },
  //   Tooltip: {
  //     colorBgSpotlight: "rgb(250,140,22)",
  //   },
  //   Notification: {
  //     colorBgElevated: "rgba(252,213,171,0.69)",
  //   },
  //   Progress: {
  //     colorText: "rgba(250,83,28,0.58)",
  //   },
  //   Skeleton: {
  //     gradientFromColor: "rgb(255,230,204)",
  //     gradientToColor: "rgba(250,83,28,0.28)",
  //   },
  //   Spin: {
  //     dotSize: 50,
  //   },
  //   Menu: {
  //     itemBg: "transparent",
  //     colorText: "#ccffff",
  //     itemActiveBg: "rgb(ff,83,16)",
  //     itemSelectedBg: "#ff8316",
  //     colorPrimary: "#ffffff",
  //   },
  //   Tag: {
  //     defaultBg: "#ff8316",
  //     defaultColor: "white",
  //   },
  // },
  token: {
    colorPrimary: '#f97316',
    colorInfo: '#ff8316',
    colorError: '#cc0000',
    fontSize: 14,
  },
  components: {
    Menu: {
      itemBg: grayBgcolor, // Optional: Change the selected item's background and text color as well
      itemColor: 'white',
      itemSelectedColor: 'white', // Optional: Change the text color of all unselected items
      itemActiveBg: 'white',
      itemSelectedBg: grayColor,
      itemHoverBg: grayColor,
      itemHoverColor: 'white',
      subMenuItemSelectedColor: 'white',
      itemDisabledColor: 'white',

      horizontalItemSelectedColor: 'white',
      horizontalItemHoverBg: grayColor,
      horizontalItemHoverColor: 'white',
      subMenuItemBg: grayBgcolor,
      horizontalItemBorderRadius: 3,
    },
    Dropdown: {
      // colorBgElevated: grayBgcolor,
      // colorText: '#FFF',
      controlItemBgHover: grayColor,
      padding: 0,
    },
    Layout: {
      triggerColor: '#FFF', // This token controls the color of the text and icons in the Sider trigger
      triggerBg: grayBgcolor, // Optional: Change the background color when the trigger is hovered
    },

    Table: {
      padding: 5,
      borderRadiusOuter: 6,
    },
    Card: {
      bodyPadding: 10,
      headerPadding: 10,
    },
    Popover: {
      // colorBgElevated: grayColor,
      // colorTextHeading: 'white',
    },
    Breadcrumb: {
      separatorMargin: 3,
      separatorColor: '#6b6b6b',
      linkHoverColor: '#6b6b6b',
      itemColor: '#6b6b6b',
    },
  },
};

export default customTheme;
