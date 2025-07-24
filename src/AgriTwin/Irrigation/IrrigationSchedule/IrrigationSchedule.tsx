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
    <div className="container mx-auto p-4">
      {/* < variant="h2" color="blue-gray" className="mb-4">
        Irrigation and Fertigation Module
      </Typography> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* <div className="lg:col-span-2">
          <ThreeDPlotMap />
        </div> */}
        <div className="lg:col-span-1">
          <IoTSensorReadings />
        </div>
        <div className="lg:col-span-1">
          <ControlPanel />
        </div>
        <div className="lg:col-span-1">
          <AIInsights />
        </div>
      </div>
    </div>
  );
};

export default IrrigationSchedule;
