import Navbar from '@/Navbar/Navbar';
import AppSidebar from '@/Sidebar/Sidebar';
import { Toaster } from "@/components/ui/toaster"

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div>
        <AppSidebar />
        <Toaster />
      </div>
    </div>
  );
};

export default Layout;