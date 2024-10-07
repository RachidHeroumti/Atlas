module.exports = {
    purge: [],
    darkMode: false,
    theme: {
      extend: {
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],  
        },
        fontSize: {
          'base': '15px',
          '36p':  '36px',
          '12p':'12px',
          '13p':'13px',
          '19p':'19px',
          '16p':'16px',
          '18p':'18px',
          '55p':'55px'

        }, colors: {
          'dark-gray': 'rgb(40, 40, 40)', 
          'titles-color':'#282828',
          'bacgroundApp':'#b4b4b4',
          'white-gray':'#939393'
        },
        fontWeight: {
          base: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeight: {
          'custom-1.3': '1.3',
          'custom-26':'26px',

          
        },
      },
    },
    variants: {},
    plugins: [],
  }