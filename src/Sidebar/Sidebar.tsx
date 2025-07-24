"use client"

import * as React from "react"
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  GalleryVerticalEnd,
  LayoutDashboard,
  Workflow,
  Droplets,
  Leaf,
  History,
  LogOut,
  ChartColumnDecreasingIcon,
  EarthIcon,
  DollarSignIcon,
  FileCheckIcon,
  IndianRupeeIcon,
  AxeIcon,
  ActivityIcon,
  FileUserIcon,
  BotIcon,
  ShoppingCartIcon,
  Eye,
  BugIcon,
  TowerControl,
  Plane,
  ChartLineIcon,
  Calendar,
  Headset,
  BotMessageSquare,
  Sheet,
  FileBarChart2Icon,
  BaggageClaimIcon,
  Sprout,
  UserCog,
  XCircle,
  DatabaseZap,
  Camera,
  Users,
  Plus,
  Sparkles,
  FileText,
  Microscope,
  Network,
  UserPlus,
  Podcast,
  SendToBack,
  HardHat,
  TrophyIcon,
  LandPlotIcon,
  LandmarkIcon,
  IndianRupee,
  Dog
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { cn } from "@/lib/utils"
import { loginActions } from "@/redux/login-slice"
import { POST } from "@/utils/ApiHandler"
// This is sample data.

const mockSensorData = {
  temperature: 24.5,
  humidity: 65,
  windSpeed: 12,
  batteryLevels: 85,
  activeAlerts: 2,
  activeDevices: 24,
  cropHealth: 96,
  soilMoisture: 72,
  yieldPrediction: 92,
  pestRisk: 'Low',
  irrigationEfficiency: 94,
  nutrientLevels: 'Optimal'
}

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




export default function AppSidebar() {

  const { tenantId, isAdmin, user_name, email, token, userId } = useSelector((state:any) => state.login)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    try {
      
      //console.log(token);
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

  const tenantMenuItems = [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Overview",
          url: "/"
        }
      ]
    },
    {
      title: "Surveillance",
      url: "#",
      icon: Camera,
      items: [
        {
          title: "Hub",
          url: "/surveillancehub"
        }
      ]
    },
    {
      title: "Analytics",
      url: "#",
      icon: FileBarChart2Icon,
      items: [
        {
          title: "Statistics",
          url: "/statistics"
        },
      ]
    },
    {
      title: "Process",
      url: "#",
      icon: Workflow,
      items: [
        {
          title: "Process History",
          url: "/processhistory"
        }
      ]
    },
    {
      title: "Irrigation",
      url: "#",
      icon: Droplets,
      items: [
        {
          title: "Schedule",
          url: "/irrigation/schedule"
        },
        {
          title: "History",
          url: "/irrigation/history"
        }
      ]
    },
    {
      title: "KiaanSpace",
      url: "#",
      icon: HardHat,
      items: [
        {
          title: "Walkthrough",
          url: "/kiaanspace"
        }
      ]
    },
    {
      title: "LandScape",
      url: "#",
      icon: LandPlotIcon,
      items: [
        {
          title: "Layouts",
          url: "/landscape",
        }
      ]
    },
    {
      title: "Project Management",
      url: "#",
      icon: LandmarkIcon,
      items: [
        {
          title: "Portfolio",
          url: "/projectmanagement",
        }
      ]
    },
    {
      title: "Lab Analysis",
      url: "#",
      icon: Microscope,
      items: [
        {
          title: "Reports",
          url: "/labreports"
        }
      ]
    },
    {
      title: "Disease Management",
      url: "#",
      icon: Leaf,
      items: [
        {
          title: "Disease Prediction",
          url: "/disease-management/prediction"
        }
      ]
    },
    {
      title: "Livestock",
      url: "#",
      icon: Dog,
      items: [
        {
          title: "Manage",
          url: "/livestock"
        }
      ]
    },
    {
      title: "Ecosystem",
      url: "#",
      icon: Network,
      items: [
        {
          title: "Agreements and Networks",
          url: "/ecosystem"
        }
      ]
    },
    {
      title: "History",
      url: "#",
      icon: History,
      items: [
        {
          title: "Soil",
          url: "/soilhistory"
        },
        {
          title: "Weather",
          url: "/weatherhistory"
        },
        {
          title: "Environment",
          url: "/environmenthistory"
        }
      ]
    },
    {
      title: "Crop Health",
      url: "#",
      icon: Sprout,
      items: [
        {
          title: "Index",
          url: "/crophealth"
        }
      ]
    },
    {
      title: "Fault Reporting",
      url: "#",
      icon: XCircle,
      items: [
        {
          title: "Metrics",
          url: "/faultreporting"
        }
      ]
    },
    {
      title: "KiaanGPT",
      url: "#",
      icon: BotMessageSquare,
      items: [
        {
          title: "Conversation",
          url: "/kiaangpt"
        }
      ]
    },
   
    {
      title: "Reports",
      url: "#",
      icon: Sheet,
      items: [
        {
          title: "Sheet",
          url: "/reports"
        }
      ]
    },
    {
      title: "Logistics",
      url: "#",
      icon: DatabaseZap,
      items: [
        {
          title: "Sheet",
          url: "/logistics"
        }
      ]
    },
    {
      title: "Weather",
      url: "#",
      icon: ChartLineIcon,
      items: [
        {
          title: "Forecasts",
          url: "/forecasts"
        }
      ]
    },
    {
      title: "Augmented Reality",
      url: "#",
      icon: Eye,
      items: [
        {
          title: "AgriVerse-AgriTwin",
          url: "/agriverse"
        }
      ]
    },
    {
      title: "Digital Twin",
      url: "#",
      icon: TowerControl,
      items: [
        {
          title: "Simulator",
          url: "/digitaltwin"
        }
      ]
    },
    {
      title: "Daily Activity",
      url: "#",
      icon: ActivityIcon,
      items: [
        {
          title: "Logs",
          url: "/activities"
        }
      ]
    },
    {
      title: "Drone",
      url: "#",
      icon: Plane,
      items: [
        {
          title: "Scout & Spray",
          url: "/drone"
        }
      ]
    },
    {
      title: "AI Intelligence Hub",
      url: "#",
      icon: BotIcon,
      items: [
        {
          title: "Farm Insights",
          url: "/insights"
        }
      ]
    },
    {
      title: "Consultation",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Schedule",
          url: "/consultation"
        }
      ]
    },
    {
      title: "Pest Management",
      url: "#",
      icon: BugIcon,
      items: [
        {
          title: "Control & Alerts",
          url: "/pestmgmt"
        }
      ]
    },
    {
      title: "Yield Forecast",
      url: "#",
      icon: ChartColumnDecreasingIcon,
      items: [
        {
          title: "Forecasts",
          url: "/yieldforecast"
        }
      ]
    },
    {
      title: "Trade",
      url: "#",
      icon: BaggageClaimIcon,
      items: [
        {
          title: "Supply Chain",
          url: "/trade"
        }
      ]
    },
    {
      title: "Sustainability",
      url: "#",
      icon: EarthIcon,
      items: [
        {
          title: "Vizualizer",
          url: "/sustainability"
        }
      ]
    },
    {
      title: "Carbon",
      url: "#",
      icon: FileCheckIcon,
      items: [
        {
          title: "Dashboard",
          url: "/carbontrading"
        }
      ]
    },
    {
      title: "MarketPlace",
      url: "#",
      icon: ShoppingCartIcon,
      items: [
        {
          title: "Products",
          url: "/marketplace"
        }
      ]
    },
    {
      title: "Resource",
      url: "#",
      icon: SendToBack,
      items: [
        {
          title: "Management",
          url: "/resourcemgmt"
        }
      ]
    },
    {
      title: "Expenditure",
      url: "#",
      icon: IndianRupeeIcon,
      items: [
        {
          title: "Manage",
          url: "/expendituremgmt"
        }
      ]
    },
    {
      title: "Inventory",
      url: "#",
      icon: AxeIcon,
      items: [
        {
          title: "Manage",
          url: "/inventorymgmt"
        }
      ]
    },
    {
      title: "Labour",
      url: "#",
      icon: FileUserIcon,
      items: [
        {
          title: "Manage",
          url: "/labourmgmt"
        }
      ]
    },
    {
      title: "Rewards",
      url: "#",
      icon: TrophyIcon,
      items: [
        {
          title: "View",
          url: "/rewards"
        }
      ]
    },
    {
      title: "Subscription",
      url: "#",
      icon: IndianRupee,
      items: [
        {
          title: "Billing",
          url: "/subscriptionbilling"
        }
      ]
    },
    {
      title: "Community",
      url: "#",
      icon: Podcast,
      items: [
        {
          title: "Connect",
          url: "/community"
        }
      ]
    },
    {
      title: "Support",
      url: "#",
      icon: Headset,
      items: [
        {
          title: "Raise Ticket",
          url: "/support"
        }
      ]
    }
  ];

  // Admin Menu Items
  const adminMenuItems = [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Overview",
          url: "/"
        },
      ]
    },
    {
      title: "Surveillance",
      url: "#",
      icon: Camera,
      items: [
        {
          title: "Hub",
          url: "/surveillancehub"
        }
      ]
    },
    {
      title: "Analytics",
      url: "#",
      icon: FileBarChart2Icon,
      items: [
        {
          title: "Statistics",
          url: "/statistics"
        },
      ]
    },
    {
      title: "Admin",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "SaaS Analytics",
          url: "/analytics"
        },
        {
          title: "Manage Users",
          url: "/users"
        }
      ]
    },
    {
      title: "Tenants",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Manage",
          url: "/tenants"
        },
        // {
        //   title: "Onboarding",
        //   url: "/onboardtenant"
        // },
        {
          title: "Profile",
          url: "/onboardtenant/formdata"
        },
        // {
        //   title: "Form Builder",
        //   url: "/onboardtenant/formbuilder"
        // },
        // {
        //   title: "Irrigation Config",
        //   url: "-irrigation-profiles"
        // }
      ]
    },
    {
      title: "Process",
      url: "#",
      icon: Workflow,
      items: [
        {
          title: "Process Management",
          url: "/process"
        },
        {
          title: "Process History",
          url: "/processhistory"
        }
      ]
    },
    {
      title: "Irrigation",
      url: "#",
      icon: Droplets,
      items: [
        {
          title: "Schedule",
          url: "/irrigation/schedule"
        },
        {
          title: "History",
          url: "/irrigation/history"
        }
      ]
    },
    {
      title: "LandScape",
      url: "#",
      icon: LandPlotIcon,
      items: [
        {
          title: "Layouts",
          url: "/landscape",
        }
      ]
    },
    {
      title: "Project Management",
      url: "#",
      icon: LandmarkIcon,
      items: [
        {
          title: "Portfolio",
          url: "/projectmanagement",
        }
      ]
    },
    {
      title: "KiaanSpace",
      url: "#",
      icon: HardHat,
      items: [
        {
          title: "Walkthrough",
          url: "/kiaanspace"
        }
      ]
    },
    {
      title: "Lab Analysis",
      url: "#",
      icon: Microscope,
      items: [
        {
          title: "Reports",
          url: "/labreports"
        }
      ]
    },
    {
      title: "Disease Management",
      url: "#",
      icon: Leaf,
      items: [
        {
          title: "Disease Prediction",
          url: "/disease-management/prediction"
        }
      ]
    },
    {
      title: "Ecosystem",
      url: "#",
      icon: Network,
      items: [
        {
          title: "Agreements and Networks",
          url: "/ecosystem"
        }
      ]
    },
    {
      title: "History",
      url: "#",
      icon: History,
      items: [
        {
          title: "Soil",
          url: "/soilhistory"
        },
        {
          title: "Weather",
          url: "/weatherhistory"
        },
        {
          title: "Environment",
          url: "/environmenthistory"
        }
      ]
    },
    {
      title: "Crop Health",
      url: "#",
      icon: Sprout,
      items: [
        {
          title: "Index",
          url: "/crophealth"
        }
      ]
    },
    {
      title: "Fault Reporting",
      url: "#",
      icon: XCircle,
      items: [
        {
          title: "Metrics",
          url: "/faultreporting"
        }
      ]
    },
    {
      title: "KiaanGPT",
      url: "#",
      icon: BotMessageSquare,
      items: [
        {
          title: "Conversation",
          url: "/kiaangpt"
        }
      ]
    },
    {
      title: "Reports",
      url: "#",
      icon: Sheet,
      items: [
        {
          title: "Sheet",
          url: "/reports"
        }
      ]
    },
    {
      title: "Logistics",
      url: "#",
      icon: DatabaseZap,
      items: [
        {
          title: "Sheet",
          url: "/logistics"
        }
      ]
    },
    {
      title: "Weather",
      url: "#",
      icon: ChartLineIcon,
      items: [
        {
          title: "Forecasts",
          url: "/forecasts"
        }
      ]
    },
    {
      title: "Augmented Reality",
      url: "#",
      icon: Eye,
      items: [
        {
          title: "AgriVerse-AgriTwin",
          url: "/agriverse"
        }
      ]
    },
    {
      title: "Digital Twin",
      url: "#",
      icon: TowerControl,
      items: [
        {
          title: "Simulator",
          url: "/digitaltwin"
        }
      ]
    },
    {
      title: "Daily Activity",
      url: "#",
      icon: ActivityIcon,
      items: [
        {
          title: "Logs",
          url: "/activities"
        }
      ]
    },
    {
      title: "Drone",
      url: "#",
      icon: Plane,
      items: [
        {
          title: "Scout & Spray",
          url: "/drone"
        }
      ]
    },
    {
      title: "AI Intelligence Hub",
      url: "#",
      icon: BotIcon,
      items: [
        {
          title: "Farm Insights",
          url: "/insights"
        }
      ]
    },
    {
      title: "Consultation",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Schedule",
          url: "/consultation"
        }
      ]
    },
    {
      title: "Pest Management",
      url: "#",
      icon: BugIcon,
      items: [
        {
          title: "Control & Alerts",
          url: "/pestmgmt"
        }
      ]
    },
    {
      title: "Yield Forecast",
      url: "#",
      icon: ChartColumnDecreasingIcon,
      items: [
        {
          title: "Forecasts",
          url: "/yieldforecast"
        }
      ]
    },
    {
      title: "Trade",
      url: "#",
      icon: BaggageClaimIcon,
      items: [
        {
          title: "Supply Chain",
          url: "/trade"
        }
      ]
    },
    {
      title: "Sustainability",
      url: "#",
      icon: EarthIcon,
      items: [
        {
          title: "Vizualizer",
          url: "/sustainability"
        }
      ]
    },
    {
      title: "Carbon",
      url: "#",
      icon: FileCheckIcon,
      items: [
        {
          title: "Dashboard",
          url: "/carbontrading"
        }
      ]
    },
    {
      title: "MarketPlace",
      url: "#",
      icon: ShoppingCartIcon,
      items: [
        {
          title: "KiaanKart",
          url: "https://kiaankart.com"
        }
      ]
    },
    {
      title: "Resource",
      url: "#",
      icon: SendToBack,
      items: [
        {
          title: "Management",
          url: "/resourcemgmt"
        }
      ]
    },
    {
      title: "Expenditure",
      url: "#",
      icon: IndianRupeeIcon,
      items: [
        {
          title: "Manage",
          url: "/expendituremgmt"
        }
      ]
    },
    {
      title: "Inventory",
      url: "#",
      icon: AxeIcon,
      items: [
        {
          title: "Manage",
          url: "/inventorymgmt"
        }
      ]
    },
    {
      title: "Labour",
      url: "#",
      icon: FileUserIcon,
      items: [
        {
          title: "Manage",
          url: "/labourmgmt"
        }
      ]
    },
    {
      title: "Rewards",
      url: "#",
      icon: TrophyIcon,
      items: [
        {
          title: "View",
          url: "/rewards"
        }
      ]
    },
    {
      title: "Subscription",
      url: "#",
      icon: DollarSignIcon,
      items: [
        {
          title: "Billing",
          url: "/subscriptionbilling"
        }
      ]
    },
    {
      title: "Community",
      url: "#",
      icon: Podcast,
      items: [
        {
          title: "Connect",
          url: "/community"
        }
      ]
    },
    {
      title: "Support",
      url: "#",
      icon: Headset,
      items: [
        {
          title: "Raise Ticket",
          url: "/support"
        }
      ]
    }
  ];

  const data = {
    user: {
      name: "User",
      email: "user@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "KiaanIOT",
        logo: GalleryVerticalEnd,
        plan: "SAAS",
      },
      {
        name: "KiaanAgrow",
        logo: AudioWaveform,
        plan: " AgriTech Startup",
      },
      {
        name: "KiaanKart",
        logo: Command,
        plan: "E-Commerce",
      },
    ],
    navMain: isAdmin ? adminMenuItems : tenantMenuItems
  }

  const [activeTeam, setActiveTeam] = React.useState(data.teams[0])

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <activeTeam.logo className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {activeTeam.name}
                      </span>
                      <span className="truncate text-xs">
                        {activeTeam.plan}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Teams
                  </DropdownMenuLabel>
                  {data.teams.map((team, index) => (
                    <DropdownMenuItem
                      key={team.name}
                      onClick={() => setActiveTeam(team)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <team.logo className="size-4 shrink-0" />
                      </div>
                      {team.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Add team
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="bg-green-100 dark:bg-black">
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          {/* <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Forward className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <MoreHorizontal className="text-sidebar-foreground/70" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup> */}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">U</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        User
                      </span>
                      <span className="truncate text-xs">
                        user@gmail.com
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={data.user.avatar}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          U
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          User
                        </span>
                        <span className="truncate text-xs">
                          user@gmail.com
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutHandler}>
                    {/* <LogOut /> */}
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Plot
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{tenantId}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <NavigationMenu className="hidden lg:flex space-x-6">
              <NavigationMenuList className="flex flex-wrap items-center gap-2 lg:gap-6">
                {/* Crop Health - Show only on larger screens */}
                <div className="hidden xl:block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to="/crop-health" className="flex items-center gap-2">
                          <Badge variant={mockSensorData.cropHealth > 80 ? "success" : "warning"} className="px-3 py-1">
                            <span className="font-semibold">Sustainability Index: 98%</span>
                          </Badge>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Sustainability Index</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Yield Prediction - Show only on larger screens */}
                <div className="hidden xl:block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to="#" className="flex items-center gap-2">
                          <Badge variant="default" className="px-3 py-1">
                            <span className="font-semibold">Carbon Emission 26%</span>
                          </Badge>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Carbon Emission</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Sensors Dropdown - Always visible */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="hidden lg:inline">Expenditure</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 w-[300px] md:w-[500px]">
                      <ListItem
                        to="/monitoring/soil"
                        title="Overall Expenses"
                        icon={<FileCheckIcon className="w-4 h-4" />}
                        metric={`20k`}
                        status="success"
                      >
                        
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pest Risk - Show only on larger screens */}
                <div className="hidden xl:block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to="/pest-management" className="flex items-center gap-2">
                          <Badge variant={mockSensorData.pestRisk === 'Low' ? "success" : "destructive"} className="px-3 py-1">
                            <span className="font-semibold">Disease Risk: {mockSensorData.pestRisk}</span>
                          </Badge>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Current disease risk assessment</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Irrigation - Show only on larger screens */}
                <div className="hidden xl:block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to="/irrigation" className="flex items-center gap-2">
                          <Badge variant={mockSensorData.irrigationEfficiency > 90 ? "success" : "warning"} className="px-3 py-1">
                            <span className="font-semibold">AR: Enabled</span>
                          </Badge>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>AR</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Analytics Dropdown - Always visible */}
                <div className="hidden xl:block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link to="/irrigation" className="flex items-center gap-2">
                          <Badge variant={mockSensorData.irrigationEfficiency > 90 ? "success" : "warning"} className="px-3 py-1">
                            <span className="font-semibold">IoT Battery: 90%</span>
                          </Badge>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>IoT Battery</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu Button - Show only on smaller screens */}
            {/* <div className="lg:hidden">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <MenuIcon className="w-4 h-4" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[300px]">
                        <ListItem
                          to="/crop-health"
                          title="Crop Health"
                          metric={`${mockSensorData.cropHealth}%`}
                        />
                        <ListItem
                          to="/yield-prediction"
                          title="Yield Prediction"
                          metric={`${mockSensorData.yieldPrediction}%`}
                        />
                        <ListItem
                          to="/pest-management"
                          title="Pest Risk"
                          metric={mockSensorData.pestRisk}
                        />
                        <ListItem
                          to="/irrigation"
                          title="Irrigation"
                          metric={`${mockSensorData.irrigationEfficiency}%`}
                        />
                        <ListItem
                          to="/irrigation"
                          title="Sustainability"
                          metric={`${mockSensorData.irrigationEfficiency}%`}
                        />
                        <ListItem
                          to="/irrigation"
                          title="Carbon Emission"
                          metric={`${mockSensorData.irrigationEfficiency}%`}
                        />
                        <ListItem
                          to="/irrigation"
                          title="Disease Risk"
                          metric={`${mockSensorData.irrigationEfficiency}%`}
                        />
                        
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div> */}

            <div className="lg:hidden flex  justify-items-end ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link to="/irrigation" className="flex items-center gap-2">
                      <Badge variant={mockSensorData.irrigationEfficiency > 90 ? "success" : "warning"} className="px-3 py-1">
                        <span className="font-semibold">AR: Enabled</span>
                      </Badge>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>IoT Battery</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="lg:hidden flex justify-items-end ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link to="/irrigation" className="flex items-center gap-2">
                      <Badge variant={mockSensorData.irrigationEfficiency > 90 ? "success" : "warning"} className="px-3 py-1">
                        <span className="font-semibold">IoT Battery: 90%</span>
                      </Badge>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>IoT Battery</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            </div>

          
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-x-visible">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}