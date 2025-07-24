import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import ProjectManagementApplication from './ProjectManagementApplication';
import ProjectDashboard from './ProjectDashboard';

const ProjectManagement = () => {
    const [projectStatus, setProjectStatus] = useState('application'); // 'application' or 'active'

    return (
        <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
            <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
                <div className="flex flex-col">
                    <CardTitle className="text-2xl font-bold text-green-900 dark:text-white">
                        Project Management
                    </CardTitle>
                    <CardDescription className="text-green-700 dark:text-blue-200">
                        Manage your project from the comfort of your home
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6 max-w-full">
                <Tabs 
                    defaultValue={projectStatus} 
                    className="w-full"
                    onValueChange={setProjectStatus}
                >
                    <TabsList className="grid w-full grid-cols-2 bg-green-50 dark:bg-gray-800 mb-4">
                        <TabsTrigger value="application">
                            Apply
                        </TabsTrigger>
                        <TabsTrigger value="active">
                            Dashboard
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="application">
                        <ProjectManagementApplication />
                    </TabsContent>

                    <TabsContent value="active">
                        <ProjectDashboard />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default ProjectManagement;