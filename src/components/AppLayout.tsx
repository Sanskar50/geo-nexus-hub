import React from 'react';
import { motion } from 'framer-motion';
import MapContainer from './MapContainer';
import SidePanel from './SidePanel';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Operations Dashboard
              </h1>
              <p className="text-muted-foreground">
                Real-time monitoring and control center
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-10 gap-6 min-h-0">
          {/* Map Section - 70% on desktop */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 h-full"
          >
            <MapContainer />
          </motion.div>

          {/* Side Panel - 30% on desktop */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 h-full"
          >
            <SidePanel />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;