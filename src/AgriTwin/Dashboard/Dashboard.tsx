import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Surveillance from './Surveillance/Surveillance'

import Irrigation from './Irrigation';
import Soil04 from './04/Soil04';
import Soil05 from './05/Soil05';
import Weather04 from './04/Weather04';
import Weather05 from './05/Weather05';
import Environment04 from './04/Environment04';
import Environment05 from './05/Environment05';
import CurrentConditions from './CurrentConditions'
import PlantationProcess from './PlantationProcess'
import Forecasts from './Forecasts'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Plus, Wrench, HelpCircle } from 'lucide-react'


export default function Dashboard() {
  const { token , tenantId} = useSelector((state: any) => state.login);
  //console.log(tenantId);
  const [alerts, setAlerts] = useState([])
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    // Simulating alert fetching
    setAlerts(['Low soil moisture detected', 'Irrigation system needs maintenance'])

    const intervalId = setInterval(() => {
      setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [alerts.length])

  const gridComponents = [
    {
      title: "Surveillance",
      component: Surveillance,
      colSpan: { sm: 'col-span-1', md: 'md:col-span-2', lg: 'lg:col-span-2', xl: 'xl:col-span-2' },
      rowSpan: { sm: 'row-span-1', md: 'md:row-span-1', lg: 'lg:row-span-1', xl: 'xl:row-span-1' },
    },
    {
      title: "Irrigation",
      component: Irrigation,
      colSpan: { sm: 'col-span-1', md: 'md:col-span-2', lg: 'lg:col-span-2', xl: 'xl:col-span-2' },
      rowSpan: { sm: 'row-span-1', md: 'md:row-span-1', lg: 'lg:row-span-1', xl: 'xl:row-span-1' },
    },
    // {
    //   title: "Plantation Process",
    //   component: PlantationProcess,
    //   colSpan: { sm: 'col-span-1', md: 'md:col-span-2', lg: 'lg:col-span-2', xl: 'xl:col-span-2' },
    //   rowSpan: { sm: 'row-span-1', md: 'md:row-span-1', lg: 'lg:row-span-1', xl: 'xl:row-span-1' },
    // },
    // {
    //   title: "Soil",
    //   component: tenantId === 'MYSCHMBN04' ? Soil04 : Soil05,
    //   colSpan: { sm: 'col-span-1', md: 'md:col-span-2', lg: 'lg:col-span-2', xl: 'xl:col-span-2' },
    //   rowSpan: { sm: 'row-span-1', md: 'md:row-span-1', lg: 'lg:row-span-1', xl: 'xl:row-span-1' },
    // },
    // {
    //   title: "Weather",
    //   component: tenantId === 'MYSCHMBN04' ?  Weather04 : Weather05,
    //   colSpan: { sm: 'col-span-1', md: 'md:col-span-2', lg: 'lg:col-span-2', xl: 'xl:col-span-2' },
    //   rowSpan: { sm: 'row-span-1', md: 'md:row-span-1', lg: 'lg:row-span-1', xl: 'xl:row-span-1' },
    // },
    // {
    //   title: "Environment",
    //   component: tenantId === 'MYSCHMBN04' ? Environment04 : Environment05,
    //   colSpan: { sm: 'col-span-1', md: 'md:col-span-2', lg: 'lg:col-span-2', xl: 'xl:col-span-2' },
    //   rowSpan: { sm: 'row-span-1', md: 'md:row-span-1', lg: 'lg:row-span-1', xl: 'xl:row-span-1' },
    // },
    // {
    //   title: "Current Conditions",
    //   component: CurrentConditions,
    //   colSpan: { sm: 'col-span-1', md: 'md:col-span-2', lg: 'lg:col-span-2', xl: 'xl:col-span-2' },
    //   rowSpan: { sm: 'row-span-1', md: 'md:row-span-1', lg: 'lg:row-span-1', xl: 'xl:row-span-1' },
    // },
    // {
    //   title: "Forecasts",
    //   component: Forecasts,
    //   colSpan: { sm: 'col-span-1', md: 'md:col-span-2', lg: 'lg:col-span-2', xl: 'xl:col-span-2' },
    //   rowSpan: { sm: 'row-span-1', md: 'md:row-span-1', lg: 'lg:row-span-1', xl: 'xl:row-span-1' },
    // },
    // Add other components similarly
  ]

  return (
    <>
    
      <div className="grid gap-4  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
        {gridComponents.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${item.colSpan.sm} ${item.colSpan.md} ${item.colSpan.lg} ${item.colSpan.xl} 
                        ${item.rowSpan.sm} ${item.rowSpan.md} ${item.rowSpan.lg} ${item.rowSpan.xl}`}
          >
            <item.component />
          </motion.div>
        ))}
      </div>
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Link to="/agentic-ai">
        <Button className="rounded-full shadow-lg gap-2 dark:bg-white bg-black hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Agentic AI
        </Button>
        </Link>
        <Link to="/log-monitor">
        <Button variant="outline" className="rounded-full shadow-lg">
          <Wrench className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="rounded-full shadow-lg">
          <HelpCircle className="h-4 w-4" />
        </Button>
        </Link>
      </div>
      </>
  )
}



// return (
//   {/*<div className="container mx-auto p-4">*/}
//     {/* {alerts.length > 0 && (
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-4"
//       >
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Alert</AlertTitle>
//           <AlertDescription>{alerts[currentAlertIndex]}</AlertDescription>
//         </Alert>
//       </motion.div>
//     )} */}

//     <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {gridComponents.map((item, index) => (
//         <motion.div
//           key={item.title}
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//           className={`${item.colSpan.sm} ${item.colSpan.md} ${item.colSpan.lg} ${item.colSpan.xl} 
//                       ${item.rowSpan.sm} ${item.rowSpan.md} ${item.rowSpan.lg} ${item.rowSpan.xl}`}
//         >
//           <item.component />
//         </motion.div>
//       ))}
//     </div>
//   {/*</div>*/}
// )
// }