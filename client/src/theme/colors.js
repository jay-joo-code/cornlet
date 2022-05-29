const palette = {
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
}

const theme = {
  ...palette,

  // region
  collegetown: '#66C088',
  collegetownBg: '#E6F5EB',
  west: '#0275d8',
  westBg: '#D5E8F9',
  north: '#F0AD4E',
  northBg: '#FDF1E2',

  // state feedback
  success: '#66c088',
  primary: '#B31B1B',
  primaryLight: '#d17676',
  blue: '#0275d8',
  warning: '#f0ad4e',
  warningLight: '#FDF1E2',
  danger: '#de6362',

  // text
  text: '#3B454E',
  textLight: '#575859',
  textMuted: '#737576',
  textPlaceholder: '#D3D7DB',

  // brand
  brand: {
    '50': '#ffeeec',
    '100': '#ffd5d1',
    '200': '#ffbab2',
    '300': '#fe9e93',
    '400': '#fe897b',
    '500': '#fe7464',
    '600': '#fe6c5c',
    '700': '#fe6152',
    '800': '#fe5748',
    '900': '#fd4436',
    gradient: 'linear-gradient(131.44deg, #FF5B63 -5.27%, #FC9163 115.64%)',
  },
  brandLight: '#D98D8D',
  brandDark: '#5A0E0E',
  brandBg: '#F4DFDF',

  brand300: '#C65454',
  brand100: '#D98D8D',
  brand100: '#D98D8D',
  brand50: '#F9ECEC',

  // border
  border: {
    default: palette.grey[200],
    light: '#E2E2E3',
    dark: '#C6C6C7',
  },
}

export default theme
