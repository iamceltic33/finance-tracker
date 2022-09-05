import { LocalizationProvider } from '@mui/x-date-pickers';
import './App.css';
import AddOperation from './components/AddOperation';
import ListOperation from './components/ListOperation';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import ruRU from 'moment/locale/ru';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllOperations } from './store';
import { CircularProgress, createTheme, SpeedDial, SpeedDialIcon, Tab, Tabs, ThemeProvider } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import Statistic from './components/Statistic';

const theme = createTheme({
  palette: {
    light: {
      main: '#fff2f2'
    },
    danger: {
      main: "#ff0000"
    }
  }
})

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.operations.loading);  
  useEffect(() => {
    dispatch(fetchAllOperations())
  }, [dispatch])
  const [showAdd, setShowAdd] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }
  return <LocalizationProvider dateAdapter={AdapterMoment} localeText={ruRU}>
    <ThemeProvider theme={theme}>
      <AddOperation open={showAdd} onClose={()=>{setShowAdd(false)}}/>
      
      {loading === 'idle' && <div style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        backgroundColor: '#0000009A',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
            backgroundColor: 'white', 
            width: 'max-content', 
            padding: '5px 5px 2px 5px',
            borderRadius: '5px'}}>
          <CircularProgress />
        </div>
      </div>  
      }
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label='Список' />
        <Tab label='Статистика' />
      </Tabs>
      {tabValue === 0 && (
        <ListOperation />
      )}
      {tabValue === 1 && (
        <Statistic />
      )}
      <SpeedDial
        ariaLabel='speed dial'
        sx={{position: 'fixed', bottom: 16, right: 16}}
        icon={<SpeedDialIcon icon={<Add />} openIcon={<Close />} />}
          onClick={()=>{setShowAdd(!showAdd)}}
      >
      </SpeedDial>
    </ThemeProvider>
  </LocalizationProvider>;
}

export default App;
