import { Close } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, IconButton, Modal } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { incomeTypes, expensesType } from '../optypesenums';
import { fetchAddOperation, fetchEditOperation } from '../store';
import './css/form-op.css';

export default function AddOperation({open, onClose, editId}) {
    const operations = useSelector(state => state.operations.data);
    const editItem = operations.filter(value => value._id === editId)[0];    
    const [date, setDate] = useState(editId ? new Date(editItem.date) : new Date());
    const [description, setDescription] = useState(editId ? editItem.description : '');
    const [type, setType] = useState(editId ? editItem.type : 0);
    const [amount, setAmount] = useState(editId ? editItem.amount : 0);
    const [isIncome, setIsIncome] = useState(editId ? editItem.income : 0);
    const dispatch = useDispatch();

    const clearInputs = () => {
        setDate(new Date());
        setDescription('');
        setType(0);
        setAmount(0);
        setIsIncome(0);
    }
    const createHandler = event => {
        event.preventDefault();
        const newOperation = {
            date: date.toISOString().slice(0, 10),
            description,
            type,
            amount,
            income: isIncome
        }
        dispatch(fetchAddOperation(newOperation));
        onClose();
        clearInputs();
    }
    const editHandler = event => {
        event.preventDefault();
        const editOperation = {
            date: date.toISOString().slice(0, 10),
            description,
            type,
            amount,
            income: isIncome
        }        
        dispatch(fetchEditOperation({operation: editOperation, id: editId}));
        onClose();
    }

    const createSelectItems = (opType) => {
        if (opType === 0) {
            return incomeTypes.map( item => <MenuItem key={item.index} value={item.index}>
                {item.text}
            </MenuItem>)
        } else
        if (opType === 1) {
            return expensesType.map( item => <MenuItem key={item.index} value={item.index}>
                {item.text}
            </MenuItem>)
        }
    }
    return <Modal 
        open={open}
        onClose={onClose}
        sx={{display: 'flex', alignItems: 'center'}}
        >
        <>
            <IconButton 
                onClick={onClose}
                sx={{position: 'absolute', top: 15, right: 15}}>
                <Close />
            </IconButton>
            <form 
                onSubmit={ editId ? editHandler : createHandler} 
                onClick={event => event.stopPropagation()}
                className="form">
            <DatePicker 
                onChange={newValue => setDate(newValue)} 
                value={date}
                renderInput={(params)=><TextField {...params} />}
                label="Дата операции"
                toolbarFormat='dd.MM.yyyy'
            />
            {/* <TextField label="Тип" type='text' value={type} onChange={event => setType(event.target.value)} /> */}
            <FormControl fullWidth>
                <InputLabel id='select-type-operation'>Тип</InputLabel>
                <Select
                    labelId='select-type-operation'
                    label='Тип'
                    value={isIncome}
                    onChange={event => {
                        setType(0);
                        setIsIncome(event.target.value)
                    }}
                    >
                        <MenuItem value={0}>Доход</MenuItem>
                        <MenuItem value={1}>Расход</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id='select-type-operation'>Типы {isIncome === 0 ? 'доходов' : 'расходов'}</InputLabel>
                <Select
                    labelId='select-type-operation'
                    label={`Типы ${isIncome === 0 ? 'доходов' : 'расходов'}`}
                    value={type}
                    onChange={event => setType(event.target.value)}
                    >
                        {createSelectItems(isIncome)}
                </Select>
            </FormControl>
            <TextField label='Описание' value={description} onChange={event => setDescription(event.target.value)} />
            <TextField type='number' label="Сумма" value={amount} onChange={event => setAmount(event.target.value)} 
                inputProps={{min: 1}}
            />        
            <Button type='submit' variant='contained'>
                { editId ? 'Редактировать' : 'Создать' }
            </Button>
        </form>
    </>
    </Modal>
}
/*
{
    date: Date,
    description: String,
    type: String,
    amount: Number,
    isIncome: Boolean
}
*/