import { type ThemeConfig, theme } from 'antd';

const grayColor = '#504f4f';
const grayBgcolor = '#FFF';
const themeItemBgColor = '#0253c7';
const textColor = '#333';
const selectedItemTextColor = '#fff';
const selectedItemBgColor = textColor;
const itemDisabledColor = '#939393';
const drawerBgColor = '#dcdcdc';

const defaultColor = '#f17f20';
const defaultHoverColor = '#e46800';

const descLabelBg = '#cee3ff';
const cardHeaderBg = '#ebebeb';

const customTheme: ThemeConfig = {
  algorithm: theme.compactAlgorithm,
  token: {
    colorPrimary: '#0253c7',
    // colorInfo: '#ff8316',
    // colorError: '#cc0000',
    fontSize: 14,
  },
  components: {
    Form: {
      itemMarginBottom: 10,
    },
    Menu: {
      itemBg: grayBgcolor, // Optional: Change the selected item's background and text color as well
      itemColor: textColor,
      itemSelectedColor: selectedItemTextColor, // Optional: Change the text color of all unselected items
      itemActiveBg: textColor,
      itemSelectedBg: themeItemBgColor,
      itemHoverBg: themeItemBgColor,
      itemHoverColor: selectedItemBgColor,
      subMenuItemSelectedColor: textColor,
      itemDisabledColor,

      horizontalItemSelectedColor: 'white',
      horizontalItemHoverBg: 'grayColor',
      horizontalItemHoverColor: 'white',
      subMenuItemBg: grayBgcolor,
      horizontalItemBorderRadius: 3,
    },
    Dropdown: {
      // colorBgElevated: themeItemBgColor,
      // controlItemBgHover: 'white',
      // colorText: 'white',

      // colorBgTextHover: themeItemBgColor,
      // colorPrimaryTextHover: themeItemBgColor,
      padding: 0,
    },
    Layout: {
      triggerColor: '#FFF', // This token controls the color of the text and icons in the Sider trigger
      triggerBg: grayBgcolor, // Optional: Change the background color when the trigger is hovered
      bodyBg: '#dcdcdc',
    },

    Table: {
      padding: 5,
      borderRadiusOuter: 6,
    },
    Card: {
      bodyPadding: 10,
      headerPadding: 10,
      headerBg: cardHeaderBg,
      headerHeight: 46,
      // colorBgContainer: cardHeaderBg,
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
    Descriptions: {
      itemPaddingBottom: 10,
      itemPaddingEnd: 0,
      labelColor: 'strong',
      labelBg: '#ebebeb',
      fontWeightStrong: 25,
    },
    Drawer: {
      paddingLG: 10,
      // colorBgElevated: drawerBgColor,
    },
    Button: {
      colorBgContainer: defaultColor,
      colorText: '#fff',
      defaultHoverColor: defaultHoverColor,
      defaultHoverBorderColor: '#a34900',
      defaultActiveColor: '#a34900',
      defaultActiveBorderColor: '#a34900',
    },
  },
};

export default customTheme;
