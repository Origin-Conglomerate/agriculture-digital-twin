import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tractor,
  Users,
  Plus,
  Edit2,
  Trash2,
  Database,
  AlertCircle
} from 'lucide-react';

const ResourceCard = ({ title, type, status, quantity, lastMaintenance }) => (
  <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 hover:shadow-green-100/50 transition-all duration-300">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-green-800 dark:text-blue-200">{title}</h3>
        <Badge
          variant={status === 'Available' ? 'outline' : status === 'In Use' ? 'default' : 'secondary'}
          className="bg-white/30 dark:bg-black/30"
        >
          {status}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-green-700 dark:text-blue-200">
          <Tractor className="w-4 h-4 mr-2" />
          {type}
        </div>
        <div className="flex items-center text-sm text-green-700 dark:text-blue-200">
          <Database className="w-4 h-4 mr-2" />
          Quantity: {quantity}
        </div>
        <div className="flex items-center text-sm text-green-700 dark:text-blue-200">
          <AlertCircle className="w-4 h-4 mr-2" />
          Last Maintenance: {lastMaintenance}
        </div>
      </div>
    </CardContent>
  </Card>
);

const Resources = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Tractor Model X",
      type: "Heavy Equipment",
      status: "Available",
      quantity: 3,
      lastMaintenance: "2024-03-15"
    },
    {
      id: 2,
      title: "Irrigation System Pro",
      type: "Infrastructure",
      status: "In Use",
      quantity: 2,
      lastMaintenance: "2024-03-10"
    },
    {
      id: 3,
      title: "Drone Fleet Alpha",
      type: "Monitoring Equipment",
      status: "Maintenance",
      quantity: 5,
      lastMaintenance: "2024-03-20"
    }
  ]);

  return (
    // <div className="container mx-auto p-4">
    <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl">
      {/* <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Database className="text-green-600 dark:text-blue-400" />
                Resource Management
              </CardTitle>
              <p className="text-green-700 dark:text-blue-200 mt-1">
                Manage and track all farm resources efficiently
              </p>
            </div>
            
          </div>
        </CardHeader> */}

      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resource Cards */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} {...resource} />
              ))}
            </div>
          </div>

          {/* Resource Table */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 dark:bg-gray-800/80">
              <CardContent className="p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" /> Add Resource
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                    <DialogHeader>
                      <DialogTitle>Add New Resource</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 p-4">
                      <div className="space-y-2">
                        <Label>Resource Name</Label>
                        <Input placeholder="Enter resource name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="heavy">Heavy Equipment</SelectItem>
                            <SelectItem value="infra">Infrastructure</SelectItem>
                            <SelectItem value="monitoring">Monitoring Equipment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input type="number" placeholder="Enter quantity" />
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                        Add Resource
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.title}</TableCell>
                        <TableCell>{resource.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant={resource.status === 'Available' ? 'outline' :
                              resource.status === 'In Use' ? 'default' : 'secondary'}
                            className="bg-white/30 dark:bg-black/30"
                          >
                            {resource.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{resource.quantity}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

          </div>

        </div>
      </CardContent>
    </Card>
    // </div>
  );
};

export default Resources;