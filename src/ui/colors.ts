export const colors = {
  white: '#fff',
  black: '#000',
  charcoal: '#424E58',
  slateGray: '#697580',
  cadetBlue: '#ABB4BB',
  columbiaBlue: '#C8E6EF',
  fireOral: '#EB5E5B',
  lavendarBlush: '#FDEFEF',
  electric: '#057EE3',
  purple: '#733E71',
  honeyYellow: '#FFB400',
  appleGreen: '#7FB800',
  blue: '#45A1F8',
  cultured: '#EEF3F4',
  shadow: '#18274B',
  bg: '#E2E2DF',
  popupBb: '#272A2B',
  transparent: 'transparent',
};

export const setOpacity = (hex: string, alpha: number) => {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    throw new Error('Bad Hex');
  }

  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  return `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, '0')}`.toUpperCase();
};
