import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Dashboard from './AgriTwin/Dashboard/Dashboard';
import KiaanGPT from './AgriTwin/KiaanGPT/KiaanGPT';
import TenantAnalytics from './AgriTwin/Analytics/TenantAnalytics';
import PlantationProcessHistory from './AgriTwin/Process/PlantationProcessHistory/PlantationProcessHistory';
import LogProcess from './AgriTwin/Process/LogProcess/LogProcess';
import IrrigationSchedule from './AgriTwin/Irrigation/IrrigationSchedule/IrrigationSchedule';
import IrrigationHistoricalData from './AgriTwin/Irrigation/IrrigationHistoricalData/IrrigationHistoricalData';
import SoilHistory04 from './AgriTwin/History/04/SoilHistory04';
import SoilHistory05 from './AgriTwin/History/05/SoilHistory05';
import WeatherHistory04 from './AgriTwin/History/04/WeatherHistory04';
import WeatherHistory05 from './AgriTwin/History/05/WeatherHistory05';
import EnvironmentHistory04 from './AgriTwin/History/04/EnvironmentHistory04';
import EnvironmentHistory05 from './AgriTwin/History/05/EnvironmentHistory05';
import WeatherForecast from './AgriTwin/WeatherForecast/WeatherForecast';
import DiseaseManagement from './AgriTwin/DiseaseManagement/DiseaseManagement'
import Reports04 from './AgriTwin/Reports/Reports';
import Reports05 from './AgriTwin/Reports/Reports05';

import ProjectManagement from './AgriTwin/ProjectManagement/ProjectManagement';

import SubscriptionBilling from "./AgriTwin/SubscriptionBilling/SubscriptionBilling"
import YieldForecast from "./AgriTwin/YieldForecast/YieldForecast"
import Sustainability from "./AgriTwin/Sustainability/Sustainability"
import CarbonTrading from "./AgriTwin/CarbonTrading/CarbonTrading"

import ExpenditureManagement from "./AgriTwin/ExpendentitureManagement/ExpenditureManagement"
import InventoryManagement from "./AgriTwin/InventoryManagement/InventoryManagement"
import LabourManagement from "./AgriTwin/LabourManagement/LabourManagement"
import AIInsights from "./AgriTwin/AIInsights/AIInsights"
import AR from "./AgriTwin/AR/AR"
import PestManagement from './AgriTwin/PestManagement/PestManagement';
import DigitalTwin from './AgriTwin/DigitalTwin/DigitalTwin';
import Drone from './AgriTwin/Drone/Drone';
import DailyActivities from './AgriTwin/DailyActivities/DailyActivity';
import Consultation from './AgriTwin/Consultation/Consultation';
import Trade from './AgriTwin/Trade/Trade';
import Support from './AgriTwin/Support/Support';
import CropHealthIndex from './AgriTwin/CropHealthIndex/CropHealthIndex';
import FaultReporting from './AgriTwin/FaultReporting/FaultReporting';
import Logistics from './AgriTwin/Logistics/Logistics';
import SurveillanceHub from './AgriTwin/Dashboard/Surveillance/SurveillanceHub';
import LabReports from './AgriTwin/LabReports/LabReports';
import Ecosystem from './AgriTwin/Ecosystem/Ecosystem';
import Community from './AgriTwin/Community/Community';
import ResourceManagement from './AgriTwin/ResourceManagement/ResourceManagement';
import KiaanSpace from './AgriTwin/KiaanSpace/KiaanSpace';
import Rewards from './AgriTwin/Rewards/Rewards';
import LandScape from './AgriTwin/Landscape/Landscape';
import Marketplace from './AgriTwin/Marketplace/Marketplace';
import Reports from './AgriTwin/Reports/Reports';
import Livestock from './AgriTwin/Livestock/Livestock';
import AgenticAI from './AgriTwin/AgenticAI/AgenticAI';
import LogMonitor from './AgriTwin/LogMonitor/LogMonitor';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="agentic-ai" element={<AgenticAI />} />
          <Route path="log-monitor" element={<LogMonitor />} />
          <Route path="surveillancehub" element={<SurveillanceHub />} />
          <Route path="statistics" element={<TenantAnalytics />} />
          {/* <Route path="reports" element={tenantId=="MYSCHMBN04" ? <Reports04 /> : <Reports05 />} />
          
          <Route path="logprocess" element={<LogProcess />} />
          
          
          
          <Route path="soilhistory" element={ tenantId=="MYSCHMBN04" ? <SoilHistory04 /> : <SoilHistory05 /> } />
          <Route path="weatherhistory" element={tenantId=="MYSCHMBN04" ? <WeatherHistory04 /> : <WeatherHistory05 /> } />
          <Route path="environmenthistory" element={tenantId=="MYSCHMBN04" ? <EnvironmentHistory04 /> : <EnvironmentHistory05 /> } />
          <Route path="forecasts" element={<WeatherForecast />} /> */}
          

          <Route path="activities" element={<DailyActivities />} />
          <Route path="irrigation/schedule" element={<IrrigationSchedule />} />
          <Route path="irrigation/history" element={<IrrigationHistoricalData />} />
          <Route path="processhistory" element={<PlantationProcessHistory />} />
          <Route path="reports" element={<Reports />} />
          
          
          <Route path="livestock" element={<Livestock />} />
          
          <Route path="resourcemgmt" element={<ResourceManagement />} /> 
          <Route path="expendituremgmt" element={<ExpenditureManagement />} />
          <Route path="inventorymgmt" element={<InventoryManagement />} />
          <Route path="labourmgmt" element={<LabourManagement />} /> 

          <Route path="landscape" element={<LandScape />} />
          <Route path="projectmanagement" element={<ProjectManagement />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="kiaanspace" element={<KiaanSpace />} />
          <Route path="disease-management/prediction" element={<DiseaseManagement />} />
          <Route path="kiaangpt" element={<KiaanGPT />} />  
          <Route path="crophealth" element={<CropHealthIndex />} />
          <Route path="labreports" element={<LabReports />} />
          <Route path="ecosystem" element={<Ecosystem />} />
          <Route path="faultreporting" element={<FaultReporting />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="agriverse" element={<AR />} />
          <Route path="digitaltwin" element={<DigitalTwin />} />
          <Route path="insights" element={<AIInsights />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="drone" element={<Drone />} />
          <Route path="pestmgmt" element={<PestManagement />} />
          <Route path="yieldforecast" element={<YieldForecast />} />
          <Route path="trade" element={<Trade />} />
          <Route path="sustainability" element={<Sustainability />} />
          <Route path="carbontrading" element={<CarbonTrading />} />
          <Route path="subscriptionbilling" element={<SubscriptionBilling />} />
          <Route path="community" element={<Community />} />
          <Route path="rewards" element={<Rewards />} /> 
          <Route path="support" element={<Support />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;