import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchDeleteOperation } from '../store';
import { incomeTypes, expensesType } from '../optypesenums';
import { Box, Card, CardContent, CardHeader, IconButton, Menu } from '@mui/material';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import AddOperation from './AddOperation';
import { useState } from 'react';

export default function Operation({op}) {
    const date = new Date(op.date);
    const dispatch = useDispatch();
    const deleteHandler = (id) => {        
        dispatch(fetchDeleteOperation(id));
    }
    const [openEdit, setOpenEdit] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const typesArray = op.income === 0 ? incomeTypes : expensesType;
    const opType = typesArray[op.type];

    const openMenuHandle = event => {
        setAnchorEl(event.currentTarget)
    }
    const closeMenuHandle = () => {
        setAnchorEl(null);
    }
    return <>
        <Card sx={
            {                
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: 250,
                position: 'relative',
                ":hover": {
                    background: '#b5e8dc'
                }
            }
            }>
            <CardHeader
                title={date.toLocaleDateString()}
                titleTypographyProps={{
                    fontSize: 12
                }}
                avatar={<opType.icon />}
                action={
                    <IconButton 
                        aria-label='settings'
                        onClick={openMenuHandle}>
                        <MoreVert />
                    </IconButton>
                }
            />    
            <Menu
                open={openMenu}
                onClose={closeMenuHandle}
                anchorEl={anchorEl}
                >
                <IconButton
                    onClick={()=>{setOpenEdit(true)}}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    onClick={()=>deleteHandler(op._id)}                 
                    color="error"                                
                    >                           
                    <Delete/>
                </IconButton>
            </Menu>                                               
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div>{opType.text}</div>                    
                        <div style={{fontSize: 12}}>{op.description}</div>
                    </div>
                    <span style={{
                        backgroundColor: op.income === 0 ? 'lightblue' : 'lightcoral',
                        padding: 5,
                        borderRadius: 5
                    }}                    
                    >{op.income === 0 ? '+' : '-'} {op.amount}</span>
                </Box>
            
            </CardContent>
        </Card>
        { openEdit && <AddOperation open={openEdit} editId={op._id} onClose={()=>{setOpenEdit(false)}}/>}
    </>
}
