import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { Slice, VictoryContainer, VictoryLabel, VictoryPie } from 'victory';
import { expensesType, incomeTypes } from '../optypesenums';

export default function Statistic() {
    const operations = useSelector(state => state.operations.data);
    let total = 0;
    let totalIncome = 0;
    let totalExpense = 0;
    let maxExpense, maxIncome;
    let catIncomes = {};
    incomeTypes.forEach(element => {
        catIncomes[element.text] = 0;
    })
    let catExpenses = {};
    expensesType.forEach(element => {
        catExpenses[element.text] = 0;
    })
    operations.forEach(element => {
        let amount = element.amount;
        if (element.income === 0) {
            if (maxIncome === undefined || maxIncome.amount < element.amount) {
                maxIncome = element;
            }
            totalIncome += amount;
            catIncomes[incomeTypes[element.type].text] += amount;
        } else {
            if (maxExpense === undefined || maxExpense.amount < element.amount) {
                maxExpense = element;
            }
            totalExpense += amount;
            catExpenses[expensesType[element.type].text] += amount;
            amount *= -1;
        }        
        total += amount;        
    });
    const expensesByCats = Object.keys(catExpenses).map(key => {
        return  {
            x: key,
            y: catExpenses[key],
            active: false
        }
    })
    const incomeByCats = Object.keys(catIncomes).map(key => {
        return {
            x: key,
            y: catIncomes[key]
        }
    })
    const handleClick = event => {
        console.log(event);
    }
    return <>
        <Grid container spacing={2} sx={{marginBottom: 1}}>
            <Grid item xs={4}>                
                <TableContainer sx={{width: 300}} component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    Общие расходы
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Итого
                                </TableCell>
                                <TableCell>
                                    {total}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Доходы
                                </TableCell>
                                <TableCell>
                                    {totalIncome}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Расходы
                                </TableCell>
                                <TableCell>
                                    {totalExpense}
                                </TableCell>
                            </TableRow>
                            {maxExpense &&
                            <TableRow>
                                <TableCell>
                                    Максимальный расход
                                </TableCell>
                                <TableCell>
                                    {expensesType[maxExpense.type].text} <br />
                                    {maxExpense?.description} <br />
                                    {maxExpense.amount}
                                </TableCell>
                            </TableRow>
                            }
                            {maxIncome &&
                            <TableRow>
                                <TableCell>
                                    Максимальный доход
                                </TableCell>
                                <TableCell>
                                    {incomeTypes[maxIncome.type].text} <br />
                                    {maxIncome?.description} <br />
                                    {maxIncome.amount}
                                </TableCell>
                            </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={8}>
                <VictoryPie 
                    data={[{x:'Доходы', y: totalIncome}, {x:'Расходы', y:totalExpense}]}
                    colorScale={['lightblue', 'lightcoral']}
                    labelComponent={<VictoryLabel style={{
                        fontSize: 14 
                    }}/>}
                    width={400}
                    height={300}
                    containerComponent={<VictoryContainer 
                        responsive={false}
                        width={400}
                        height={300}
                        />}
                    dataComponent={<Slice events={{
                        onClick: handleClick
                    }} />}
                    />
            </Grid>
        </Grid>
        <Grid container spacing={2} sx={{marginBottom: 1}}>
            <Grid item xs={4}>
                <TableContainer sx={{width: 300}} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    Расходы по категориям
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                expensesByCats.map((item,index) =><TableRow key={index}
                                    onMouseEnter={() => {
                                        expensesByCats[index].active = true;
                                    }}
                                    onMouseLeave={()=>{
                                        expensesByCats[index].active = false;
                                    }}
                                >
                                    <TableCell>{item.x}</TableCell>
                                    <TableCell>{item.y}</TableCell>
                                </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={8}>
                <VictoryPie 
                    data={expensesByCats}
                    labels={({datum}) => datum.y > 0 ? datum.x : ''}
                    colorScale='qualitative'
                    labelComponent={<VictoryLabel style={{
                        fontSize: 14 
                    }}/>}                    
                    width={400}
                    height={300}
                    containerComponent={<VictoryContainer 
                        responsive={false}
                        width={400}
                        height={300}
                        />}
                    />
                    
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TableContainer sx={{width: 300}} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    Доходы по категориям
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                incomeByCats.map((item, index) => <TableRow key={index}>
                                    <TableCell>{item.x}</TableCell>
                                    <TableCell>{item.y}</TableCell>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={8} alignItems={'center'}>
                <VictoryPie 
                    data={incomeByCats}
                    labels={({datum}) => datum.y > 0 ? datum.x : ''}
                    colorScale='qualitative'
                    labelComponent={<VictoryLabel style={{
                        fontSize: 14
                    }}/>}
                    width={400}
                    height={300}
                    containerComponent={<VictoryContainer 
                        responsive={false}
                        width={400}
                        height={300}
                        />}
                    />
            </Grid>
        </Grid>
    </>
}
