import { Inter, Roboto, Open_Sans, Noto_Sans, Playfair_Display, Merriweather, Roboto_Mono, Source_Code_Pro, Bebas_Neue, Dancing_Script, Pacifico } from 'next/font/google';

export const fonts = {
  inter: Inter({ subsets: ['latin'] }),
  roboto: Roboto({ weight: ['400', '700'], subsets: ['latin'] }),
  openSans: Open_Sans({ subsets: ['latin'] }),
  notoSans: Noto_Sans({ subsets: ['latin'] }),
  playfairDisplay: Playfair_Display({ subsets: ['latin'] }),
  merriweather: Merriweather({ weight: ['400', '700'], subsets: ['latin'] }),
  robotoMono: Roboto_Mono({ subsets: ['latin'] }),
  sourceCodePro: Source_Code_Pro({ subsets: ['latin'] }),
  bebasNeue: Bebas_Neue({ weight: '400', subsets: ['latin'] }),
  dancingScript: Dancing_Script({ subsets: ['latin'] }),
  pacifico: Pacifico({ weight: '400', subsets: ['latin'] })
}; 