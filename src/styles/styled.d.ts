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
      write_100: string;
    };
    border: {
      default: string;
      diary_border: string;
    };
  }
}
