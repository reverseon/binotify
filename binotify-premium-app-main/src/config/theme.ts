import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
}
const theme = extendTheme({ 
  config, 
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  // custom color
  colors: {
    brand_blue: {
      default: '#6adcff',
      darker: '#3a9bd7',
    },
  },
})

export default theme