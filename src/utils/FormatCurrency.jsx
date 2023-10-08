
const currencyFormat = new Intl.NumberFormat(undefined,{
    currency : 'USD',
    style: 'currency',
})

export default function FormatCurrency( number) {
    return currencyFormat.format(number) 
}

