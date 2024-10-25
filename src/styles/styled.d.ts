import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    layout: {
      max_width: string;
    };
    colors: {
      brand_main: string;
      brand_bg: string;
      system_red: string;
      system_blue: string;
      home_100: string;
      diary_100: string;
      write_purple100: string;
      write_purple200: string;
      write_purple300: string;
      write_gray100: string;
      write_gray200: string;
      write_white100: string;
      write_white200: string;
      modal_purple100: string;
      modal_purple200: string;
      modal_purple300: string;
    };
    border: {
      default: string;
      diary_border: string;
    };
  }
}
