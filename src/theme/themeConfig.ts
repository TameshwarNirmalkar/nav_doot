import { type ThemeConfig, theme } from 'antd';

const grayColor = '#504f4f';
const grayBgcolor = '#FFF';
const themeItemBgColor = '#007bff';
const textColor = '#333';
const selectedItemTextColor = '#fff';
const selectedItemBgColor = textColor;
const itemDisabledColor = '#939393';

const descLabelBg = '#cee3ff';

const customTheme: ThemeConfig = {
  algorithm: theme.compactAlgorithm,
  token: {
    colorPrimary: '#007bff',
    colorInfo: '#ff8316',
    colorError: '#cc0000',
    fontSize: 14,
  },
  components: {
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
      horizontalItemHoverBg: grayColor,
      horizontalItemHoverColor: 'white',
      subMenuItemBg: grayBgcolor,
      horizontalItemBorderRadius: 3,
    },
    Dropdown: {
      // colorBgElevated: grayBgcolor,
      controlItemBgHover: '#007bff',
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
    Descriptions: {
      itemPaddingBottom: 10,
      itemPaddingEnd: 0,
      labelColor: grayBgcolor,
      labelBg: descLabelBg,
    },
  },
};

export default customTheme;
