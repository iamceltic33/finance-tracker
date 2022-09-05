import { AccountBalance, Checkroom, CurrencyExchange, DashboardCustomize, DirectionsCar, Fastfood, MonetizationOn, Movie, MultipleStop, PointOfSale, PriceChange, RoomPreferences } from '@mui/icons-material';

export const incomeTypes = [
    {text: 'Зарплата', index: 0, icon: MonetizationOn},
    {text: 'Возврат долга', index: 1, icon: MultipleStop},
    {text: 'Займ', index: 2, icon: CurrencyExchange},
    {text: 'Продажа', index: 3, icon: PointOfSale},
    {text: 'Другие', index: 4, icon: PriceChange}
]

export const expensesType = [
    {text: 'Возврат долга', index: 0, icon: MultipleStop},
    {text: 'Одежда', index: 1, icon: Checkroom},
    {text: 'Еда', index: 2, icon: Fastfood},
    {text: 'Налоги', index: 3, icon: AccountBalance},
    {text: 'Платежи', index: 4, icon: RoomPreferences},
    {text: 'Развлечения', index: 5, icon: Movie},
    {text: 'Поездки', index: 6, icon: DirectionsCar},
    {text: 'Другие', index: 7, icon: DashboardCustomize}
]