import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/labours`;

// Labour Form Component remains unchanged
const LabourForm = ({ labour, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: labour?.name || '',
        role: labour?.role || '',
        status: labour?.status || 'Active',
        hours: labour?.hours || 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                />
            </div>
            <div>
                <Label htmlFor="role">Role</Label>
                <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    required
                />
            </div>
            <div>
                <Label htmlFor="status">Status</Label>
                <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="hours">Hours</Label>
                <Input
                    id="hours"
                    type="number"
                    value={formData.hours}
                    onChange={(e) => setFormData(prev => ({ ...prev, hours: Number(e.target.value) }))}
                    required
                />
            </div>
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">
                    {labour ? 'Update' : 'Add'} Labour
                </Button>
            </div>
        </form>
    );
};

// Labour Table Component remains unchanged
const LabourTable = ({ labours, onEdit, onDelete }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {labours.map((labour) => (
                    <TableRow key={labour._id}>
                        <TableCell className="font-medium">{labour.name}</TableCell>
                        <TableCell>{labour.role}</TableCell>
                        <TableCell>
                            <Badge
                                variant={labour.status === 'Active' ? 'success' : 'secondary'}
                                className="bg-green-100 dark:bg-blue-900"
                            >
                                {labour.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{labour.hours}</TableCell>
                        <TableCell className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(labour)}
                                className="hover:bg-green-100 dark:hover:bg-blue-900"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(labour)}
                                className="hover:bg-red-100 dark:hover:bg-red-900"
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

// Main LaboursOverview Component
const LaboursOverview = ({ onLabourDataUpdate }) => {
    const [labours, setLabours] = useState([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedLabour, setSelectedLabour] = useState(null);
    const [labourToDelete, setLabourToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Add loading state
    const [errorOccurred, setErrorOccurred] = useState(false);  // Add error state
    const { tenantId } = useSelector((state) => state.login); // Get tenantId from Redux store

    // Fetch labours from API
    const fetchLabours = async () => {
        setIsLoading(true);
        setErrorOccurred(false);
        try {
            const response = await fetch(`${API_BASE_URL}/list/${tenantId}`);
            const data = await response.json();
            if (data.success) {
                setLabours(data.labours);
                onLabourDataUpdate(data.labours);
            } else {
                setErrorOccurred(true);
            }
        } catch (error) {
            console.error('Error fetching labours:', error);
            setErrorOccurred(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLabours();
    }, [tenantId]);

    // Add new labour handler
    const handleAdd = async (formData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, tenantId }),
            });
            const data = await response.json();
            if (data.success) {
                toast({
                    title: "Success",
                    description: "Labour added successfully",
                });
                setIsAddDialogOpen(false);
                fetchLabours();
            }
        } catch (error) {
            console.error('Error adding labour:', error);
            toast({
                title: "Error",
                description: "Failed to add labour",
                variant: "destructive",
            });
        }
    };

    // Edit labour handler
    const handleEdit = async (formData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/update/${selectedLabour._id}/${tenantId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                toast({
                    title: "Success",
                    description: "Labour updated successfully",
                });
                setIsEditDialogOpen(false);
                setSelectedLabour(null);
                fetchLabours();
            }
        } catch (error) {
            console.error('Error updating labour:', error);
            toast({
                title: "Error",
                description: "Failed to update labour",
                variant: "destructive",
            });
        }
    };

    // Delete labour handler modified to use AlertDialog
    const handleDelete = (labour) => {
        setLabourToDelete(labour);
        setIsDeleteAlertOpen(true);
    };

    // Delete labour handler
    const confirmDelete = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/delete/${labourToDelete._id}/${tenantId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                toast({
                    title: "Success",
                    description: "Labour deleted successfully",
                });
                fetchLabours();
            }
        } catch (error) {
            console.error('Error deleting labour:', error);
            toast({
                title: "Error",
                description: "Failed to delete labour",
                variant: "destructive",
            });
        } finally {
            setIsDeleteAlertOpen(false);
            setLabourToDelete(null);
        }
    };

    // Empty state component
    const EmptyState = () => (
        <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
                No labour data available
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
                Click the "Add Labour" button to add your first labour record.
            </p>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">
                    Labour Overview
                </h3>
                <Button 
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    <UserPlus className="w-4 h-4 mr-2" /> Add Labour
                </Button>
            </div>

            {/* Display loading, error, or empty state message */}
            {isLoading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : errorOccurred ? (
                <div className="text-center text-red-600">
                    Unable to fetch data. Please try again later.
                </div>
            ) : labours.length === 0 ? (
                <EmptyState />
            ) : (
                <LabourTable
                    labours={labours}
                    onEdit={(labour) => {
                        setSelectedLabour(labour);
                        setIsEditDialogOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            )}

            {/* Add Labour Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Labour</DialogTitle>
                    </DialogHeader>
                    <LabourForm
                        onSubmit={handleAdd}
                        onCancel={() => setIsAddDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Edit Labour Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Labour</DialogTitle>
                    </DialogHeader>
                    <LabourForm
                        labour={selectedLabour}
                        onSubmit={handleEdit}
                        onCancel={() => {
                            setIsEditDialogOpen(false);
                            setSelectedLabour(null);
                        }}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Alert Dialog */}
            <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the labour
                            record for {labourToDelete?.name}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel 
                            onClick={() => {
                                setIsDeleteAlertOpen(false);
                                setLabourToDelete(null);
                            }}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default LaboursOverview;