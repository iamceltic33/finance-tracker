import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './css/list-op.css';
import Operation from './Operation';

const sortNewest = (a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate - aDate;
}

const sortLatest = (a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate - bDate;
}
const filterIncomeOnly = item => item.income === 0;
const filterExpenseOnly = item => item.income === 1;
const resetFilter = () => {return true}
const resetSort = () => {return 0}

let filterFn = resetFilter;
let sortFn = resetSort;

export default function ListOperation() {
    const operationsDB = useSelector((state) => state.operations.data);
    const [operations, setOperations] = useState(operationsDB);
    useEffect(()=>{
        setOperations(operationsDB);
    }, [operationsDB])  
        
    const sortChange = (sortValue) => {
        switch(sortValue) {
            case 'newest': sortFn = sortNewest; break;
            case 'latest': sortFn = sortLatest; break;
            case 'standart': sortFn = resetSort; break;
            default: ;
        }
        listRender();
    }
    const filterChange = (filterValue) => {
        switch(filterValue) {
            case 'income': filterFn = filterIncomeOnly; break;
            case 'expenses': filterFn = filterExpenseOnly; break;
            case 'all': filterFn = resetFilter; break;
            default: ;
        }
        listRender();
    }
    
    const listRender = () => {
        const operationsCopy = operationsDB.filter(filterFn);
        operationsCopy.sort(sortFn);
        setOperations(operationsCopy);
    }
    
    return <>
        <div className='controls' style={{display: 'flex', paddingTop: 30}}>
            <FormControl sx={{width: 200, marginRight: 1}}>
                <InputLabel id="sort-select-label">Сортировка</InputLabel>
                <Select
                    labelId="sort-select-label"
                    id="sort-select"                    
                    label="Сортировка"
                    defaultValue="standart"
                    onChange={event => sortChange(event.target.value)}
                >
                    <MenuItem value='newest'>Сначала новые</MenuItem>
                    <MenuItem value='latest'>Сначала старые</MenuItem>
                    <MenuItem value='standart'>По умолчанию</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{width: 200, marginRight: 1}}>
                <InputLabel id="filter-select-label">Фильтрация</InputLabel>
                <Select
                    labelId="filter-select-label"
                    id="filter-select"                    
                    label="Фильтрация"
                    defaultValue="all"
                    onChange={event => filterChange(event.target.value)}
                >
                    <MenuItem value='income'>Доходы</MenuItem>
                    <MenuItem value='expenses'>Расходы</MenuItem>
                    <MenuItem value='all'>Все</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className='list-op'>
            {operations.map(op => <Operation op={op} key={op._id}z/>)}
        </div>
    </>
}
