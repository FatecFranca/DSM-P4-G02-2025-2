import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Navbar from '../../components/MenuMoblie';
import Sidebarmenu from '../../components/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import PostConfig from '../Components/PostConfig';
import ListConfig from '../Components/ListConfig';
import { ToastContainer } from 'react-toastify';
import Breadcrumb from '../../components/BreadCrumb';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const ConfigSensor = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${
        theme.isDarkMode ? "dark-bg dark-text" : "bg-gray-100 text-gray-800"
      }`}
    >

      <ToastContainer/>
      <Navbar />
      <Sidebarmenu isOpen={isOpen} toggleSidebar={toggleSidebar} />

      
      <div className={`ml-0 md:ml-64 p-4 transition-all mt-20 md:mt-0 duration-300`}>
      <Breadcrumb items={[]} currentPage="Configurações do sensor" />

      
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Configuração do Sensor"
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.isDarkMode
                  ? 'var(--title-color)'
                  : 'var(--title-color)'
              }
            }}
          >
            <Tab
              label="Ver Configuração"
              sx={{
                color: theme.isDarkMode ? 'var(--text-primary)' : 'var(--text-secondary)',
                '&.Mui-selected': {
                  color: theme.isDarkMode ? 'var(--title-color)' : 'var(--title-color)'
                }
              }}
            />
            <Tab
              label="Atualizar Configuração"
              sx={{
                color: theme.isDarkMode ? 'var(--text-primary)' : 'var(--text-secondary)',
                '&.Mui-selected': {
                  color: theme.isDarkMode ? 'var(--title-color)' : 'var(--title-color)'
                }
              }}
            />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <ListConfig />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <PostConfig />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default ConfigSensor;