import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Upload, LandPlot, Users, LandPlotIcon } from 'lucide-react';

const ProjectManagementApplication = () => {
  const [formData, setFormData] = useState({
    landSize: '',
    location: '',
    landType: '',
    ownership: '',
    projectDuration: '',
    expectedCrops: '',
    additionalDetails: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Card className="w-full mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="md:flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <LandPlotIcon className="text-green-600 dark:text-blue-400" />
              Project Management Application
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-blue-200">
              Submit your land details for our managed farming services
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
            New Application
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="landSize">Land Size (Acres)</Label>
              <Input 
                id="landSize"
                type="number"
                placeholder="Enter land size"
                className="bg-white/50 dark:bg-gray-800/50"
                value={formData.landSize}
                onChange={(e) => setFormData({...formData, landSize: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <Input 
                  id="location"
                  placeholder="Enter location"
                  className="bg-white/50 dark:bg-gray-800/50 pl-10"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="landType">Land Type</Label>
              <Select 
                onValueChange={(value) => setFormData({...formData, landType: value})}
              >
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                  <SelectValue placeholder="Select land type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="irrigated">Irrigated Land</SelectItem>
                  <SelectItem value="rainfed">Rainfed Land</SelectItem>
                  <SelectItem value="greenhouse">Greenhouse Ready</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDuration">Project Duration</Label>
              <Select
                onValueChange={(value) => setFormData({...formData, projectDuration: value})}
              >
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea 
              id="additionalDetails"
              placeholder="Any specific requirements or details about your land..."
              className="bg-white/50 dark:bg-gray-800/50 min-h-[100px]"
              value={formData.additionalDetails}
              onChange={(e) => setFormData({...formData, additionalDetails: e.target.value})}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2 hover:bg-green-100 dark:hover:bg-blue-900"
            >
              <Upload className="w-4 h-4" />
              Upload Land Documents
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectManagementApplication;