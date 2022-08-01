import { IS_BROWSER } from "fresh/runtime.ts";
import { Configuration, setup } from "twind";
import typography from '@twind/typography'
import { lineClamp } from '@twind/line-clamp'
export * from "twind";
export const config: Configuration = {
  theme: {
    fontFamily: {
      sans: "Inter",
    },
    extend: {
      colors: {
        'neutral': "#9DB4C0"
      },
      typography:{
        green: {
          css: {
            '--tw-prose-a': 'text-green-400'
          },
        },
      },
    }
  },
  preflight: {
    '@import': `url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;500;600;700;800;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');`,
  },
  darkMode: "class",
  mode: "silent",
  plugins: {
    'line-clamp': lineClamp,
    ...typography({
      className: 'prose', // Defaults to 'prose'
    }),
  }
};
if (IS_BROWSER) setup(config);
