import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      colors: {
        shamrock: {
          '50': '#ebfef7',
          '100': '#cffceb',
          '200': '#a3f7db',
          '300': '#68edc9',
          '400': '#42dfba',
          '500': '#1bbf99',
          '600': '#009e80',
          '700': '#007e6a',
          '800': '#016455',
          '900': '#025247',
          '950': '#002e29',
        },
        neutral: {
          '800': '#262629',
          '900': '#1d1d21',
          '950': '#18181B',
        },
      },
    },
  },
}
