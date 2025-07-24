import * as React from "react"
import {
  Menu, User, SunIcon, MoonIcon,
  Bell, Activity,
  Droplets, 
  BarChart2, 
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import logo from '@/assets/logo/logo.png'
import { useDispatch, useSelector } from "react-redux"
import { loginActions } from "@/redux/login-slice"
import { GET, POST } from "@/utils/ApiHandler"

// Updated mock data
const mockSensorData = {
  temperature: 24.5,
  humidity: 65,
  windSpeed: 12,
  batteryLevels: 85,
  activeAlerts: 2,
  activeDevices: 24,
  cropHealth: 96,
  soilMoisture: 46,
  yieldPrediction: 14,
  pestRisk: 'Low',
  irrigationEfficiency: 94,
  nutrientLevels: 'Optimal'
}

const solutions = [
  {
    title: "Precision Agriculture",
    href: "/",
    description: "Optimize crop yields with data-driven insights",
  },
  {
    title: "Sustainable Farming",
    href: "/",
    description: "Eco-friendly practices for long-term agricultural success",
  },
  {
    title: "Supply Chain Management",
    href: "/",
    description: "Streamline your agricultural supply chain",
  },
  {
    title: "Farm-to-Table Solutions",
    href: "/",
    description: "Connect directly with consumers and restaurants",
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string;
    icon?: React.ReactNode;
    metric?: string | number;
    status?: "success" | "warning" | "error";
  }
>(({ className, title, children, icon, metric, status, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
            {metric && (
              <Badge variant={status || "default"} className="ml-auto">
                {metric}
              </Badge>
            )}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function Navbar() {
  const isLoggedIn = true;
  const [theme, setTheme] = React.useState("dark")
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState(3)
  const [analytics, setAnalytics] = React.useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  React.useEffect(() => {
    document.body.className = theme
  }, [theme])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await GET(`${import.meta.env.VITE_API_URL}/api/v1/analytics`,"");
      const data = response.data.analytics.analytics;
      const filteredAnalytics = Object.entries(data)
        .filter(([key, value]) => typeof value === 'object' && value.status.startsWith('Low'))
        .map(([key, value]) => ({
          title: key,
          description: value.description
        }));
      setAnalytics(filteredAnalytics);
      setNotifications(filteredAnalytics.length);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  React.useEffect(() => {
    fetchAnalytics();
  }, []);

  const logoutHandler = () => {
    try {
      
      console.log(token);
      // Call logout endpoint
      POST(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {userId}, token);
      
      // Redux dispatch actions
      dispatch(loginActions.userLoggedInStatus({ status: false }));
      dispatch(loginActions.userLogout());
      dispatch(loginActions.unsetTenantId());
      dispatch(loginActions.unsetIsAdmin());
      
      navigate("/");
    } catch (error) {
      console.error('Logout failed:', error);
      // Still logout the user from frontend even if API call fails
      dispatch(loginActions.userLoggedInStatus({ status: false }));
      dispatch(loginActions.userLogout());
      dispatch(loginActions.unsetTenantId());
      dispatch(loginActions.unsetIsAdmin());
      navigate("/");
    }
  };

  const LoggedInNavigation = () => (
    <NavigationMenu className="hidden lg:flex space-x-6">
      <NavigationMenuList className="flex items-center gap-6">
        {/* Direct Metric Displays */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link to="#" className="flex items-center gap-2">
                <Badge variant={mockSensorData.cropHealth > 80 ? "success" : "warning"} className="px-3 py-1">
                  <span className="font-semibold">Crop Health Index: {mockSensorData.cropHealth}%</span>
                </Badge>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Crop Health Index</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link to="#" className="flex items-center gap-2">
                <Badge variant="default" className="px-3 py-1">
                  <span className="font-semibold">Yield Prediction: {mockSensorData.yieldPrediction} tons</span>
                </Badge>
              </Link>
            </TooltipTrigger>
            <TooltipContent>AI-powered yield forecasts</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Monitoring Dropdown - Keep this but with updated content */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Activity className="w-4 h-4 mr-2" />
            Sensors
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-2 gap-3 p-6 w-[500px]">
              <ListItem
                to="#"
                title="Soil Moisture"
                icon={<Droplets className="w-4 h-4" />}
                metric={`${mockSensorData.soilMoisture}%`}
                status="success"
              >
                Real-time soil moisture levels
              </ListItem>
              {/* ... other sensor items ... */}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Direct Metric Displays */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link to="/pest-management" className="flex items-center gap-2">
                <Badge variant={mockSensorData.pestRisk === 'Low' ? "success" : "destructive"} className="px-3 py-1">
                  <span className="font-semibold">Pest Risk: {mockSensorData.pestRisk}</span>
                </Badge>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Current pest risk assessment</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link to="/irrigation" className="flex items-center gap-2">
                <Badge variant={mockSensorData.irrigationEfficiency > 90 ? "success" : "warning"} className="px-3 py-1">
                  <span className="font-semibold">Irrigation: {mockSensorData.irrigationEfficiency}%</span>
                </Badge>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Irrigation</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Analytics Dropdown with Enhanced Features */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <BarChart2 className="w-4 h-4 mr-2" />
            Analytics
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px]">
              <ListItem
                to="#"
                title="Dashboard"
                icon={<Activity className="w-4 h-4" />}
              >
                Overview of all system metrics and KPIs
              </ListItem>
              <ListItem
                to="#"
                title="Reports"
                icon={<BarChart2 className="w-4 h-4" />}
              >
                Generated insights and historical data
              </ListItem>
              <ListItem
                to="#"
                title="Predictions"
                icon={<Activity className="w-4 h-4" />}
              >
                AI-powered forecasts and recommendations
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link to="/irrigation" className="flex items-center gap-2">
                <Badge variant={mockSensorData.irrigationEfficiency > 90 ? "success" : "warning"} className="px-3 py-1">
                  <span className="font-semibold">Current Stage: Flower Bud Differentiation</span>
                </Badge>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Current Stage</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </NavigationMenuList>
    </NavigationMenu>
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm shadow-md"
          : "bg-background",
        theme
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-0.5">
              
              <span className="text-green-700 font-[600] md:mb-0.5 text-2xl">AGRITWIN</span>
            </Link>
          </div>

          {isLoggedIn ? (
            <div className="hidden md:block">
              <LoggedInNavigation />
            </div>
          ) : (
            <div className="hidden md:block">
              {!isLoggedIn &&
                <div className="hidden md:block">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <Link
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  to="/"
                                >
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                    Featured Product
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    Discover our latest innovation in sustainable farming
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <ListItem to="/" title="Seeds">
                              High-yield, disease-resistant crop varieties
                            </ListItem>
                            <ListItem to="/" title="Equipment">
                              Modern farming tools and machinery
                            </ListItem>
                            <ListItem to="/" title="AgriTech Solutions">
                              IoT devices and software for smart farming
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {solutions.map((solution) => (
                              <ListItem
                                key={solution.title}
                                title={solution.title}
                                to={solution.href}
                              >
                                {solution.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link to="/" className={navigationMenuTriggerStyle()}>
                          About Us
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <a href="#contact" className={navigationMenuTriggerStyle()}>
                          Contact
                        </a>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>}
            </div>
          )}

          <div className="flex items-center space-x-2">
            {isLoggedIn && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Sheet>
                      <SheetTrigger>
                        <Button variant="ghost" size="icon" className="relative">
                          <Bell className="h-5 w-5" />
                          {notifications > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                              {notifications}
                            </span>
                          )}
                        </Button>
                      </SheetTrigger>
                      {/* <Alerts /> */}
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle className="font-bold text-lg text-gray-800 dark:text-white">Alerts</SheetTitle>
                          <SheetDescription>
                          {analytics.map(({ title, description }) => (
                              <div key={title} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
                                <h4 className="font-bold text-lg text-gray-800">{title}</h4>
                                <p className="text-gray-600">{description.split(".")[0]}</p>
                              </div>
                            ))}
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  </TooltipTrigger>
                  <TooltipContent>
                    You have {notifications} unread notifications
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Button variant="ghost" size="icon" className="relative" onClick={toggleTheme}>
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    {isLoggedIn ? (
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>
    ) : (
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>
    )}
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-[300px]">
    {isLoggedIn ? (
      <>
        <DropdownMenuItem>
          <Link to="#" className="w-full flex items-center justify-between">
            Crop Health Index
            <Badge variant={mockSensorData.cropHealth > 80 ? "success" : "warning"}>
              {mockSensorData.cropHealth}%
            </Badge>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/yield-prediction" className="w-full flex items-center justify-between">
            Yield Prediction
            <Badge variant="default">{mockSensorData.yieldPrediction} tons</Badge>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/pest-management" className="w-full flex items-center justify-between">
            Pest Risk
            <Badge variant={mockSensorData.pestRisk === 'Low' ? "success" : "destructive"}>
              {mockSensorData.pestRisk}
            </Badge>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/irrigation" className="w-full flex items-center justify-between">
            Irrigation
            <Badge variant={mockSensorData.irrigationEfficiency > 90 ? "success" : "warning"}>
              {mockSensorData.irrigationEfficiency}%
            </Badge>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/irrigation" className="w-full flex items-center justify-between">
            Sustainability Index
            <Badge variant={mockSensorData.irrigationEfficiency > 90 ? "success" : "warning"}>
              98%
            </Badge>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="#" className="w-full flex items-center justify-between">
            Carbon Emission
            <Badge variant={mockSensorData.irrigationEfficiency > 90 ? "success" : "warning"}>
              26%
            </Badge>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="#" className="w-full flex items-center justify-between">
            Stage: Plantation
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="#" className="w-full">Sensors</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="#" className="w-full">Analytics</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="#" className="w-full">Expenditure</Link>
        </DropdownMenuItem>
      </>
    ) : (
      <>
        <DropdownMenuItem className="md:hidden">
          <Link to="/#" className="w-full">Products</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="md:hidden">
          <Link to="/#" className="w-full">Solutions</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="md:hidden">
          <Link to="/#" className="w-full">About Us</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="md:hidden">
          <Link to="#contact" className="w-full">Contact</Link>
        </DropdownMenuItem>
      </>
    )}
  </DropdownMenuContent>
</DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}