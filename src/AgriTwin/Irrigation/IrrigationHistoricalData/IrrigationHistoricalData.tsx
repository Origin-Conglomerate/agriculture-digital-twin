import React from 'react';
import DownloadReports from './DownloadReports';
import IrrigationHistory from './IrrigationHistory';
import EnergyConsumption from './EnergyConsumption';
import FertigationHistory from './FertigationHistory';
import SoilProfilingReport from './SoilProfiling';
import ScheduledIrrigation from './ScheduledIrrigation';
import ScheduledFertigation from './ScheduledFertigation';

const IrrigationHistoricalData: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4">
        Irrigation and Fertigation Module
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-3">
          <IrrigationHistory />
        </div>
        <div className="lg:col-span-3">
          <FertigationHistory />
        </div>
        <div className="lg:col-span-3">
          <EnergyConsumption />
          
        </div>
        <div className="lg:col-span-2">
        <DownloadReports />
        </div>
        <div className="lg:col-span-1">
          <SoilProfilingReport />
        </div>
        <div className="lg:col-span-3">
          <ScheduledIrrigation />
        </div>
        <div className="lg:col-span-3">
          <ScheduledFertigation />
        </div>
      </div>
    </div>
  );
};

export default IrrigationHistoricalData;
