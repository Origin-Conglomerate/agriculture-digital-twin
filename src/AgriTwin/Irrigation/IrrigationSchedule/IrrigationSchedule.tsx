import React from 'react';
import ControlPanel from './ControlPanel';
import AIInsights from './AIInsights';
import IoTSensorReadings from './IoTSensorReadings';
import ThreeDPlotMap from './ThreeDPlotMap';
import IrrigationScheduling from './IrrigationScheduling';
import ZonesValvesMapping from './ZonesValvesMapping';
import FertigationScheduling from './FertigationScheduling';

const IrrigationSchedule: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Row 1: Three equal height cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="h-full">
          <IoTSensorReadings />
        </div>
        <div className="h-full">
          <ControlPanel />
        </div>
        <div className="h-full">
          <AIInsights />
        </div>
      </div>

      {/* Row 2: Full width components */}
      <div className="grid grid-cols-1 lg:grid-cols-1">
        <div className="h-full w-full">
          <FertigationScheduling />
        </div>
      </div>
    </div>
  );
};

export default IrrigationSchedule;
