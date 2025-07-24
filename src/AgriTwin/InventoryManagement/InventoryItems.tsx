import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Edit, Trash2, PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/inventory`;

const InventoryTable = ({ items, onEdit, onDelete, loading, error }) => {
  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
      <p className="text-gray-500 dark:text-gray-400 text-lg">
        No items available
      </p>
      <p className="text-gray-400 dark:text-gray-500 mt-2">
        Click the "Add Item" button to add your first inventory item.
      </p>
    </div>
  );

  return (
    <>
      {loading && <div className="text-center p-4">Loading...</div>}
      {error && <div className="text-center text-red-600 p-4">{error}</div>}
      {!loading && !error && items.length === 0 && <EmptyState />}
      {!loading && !error && items.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Badge variant={item.quantity > item.threshold ? "success" : "destructive"}>
                    {item.quantity > item.threshold ? "In Stock" : "Low Stock"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="p-2">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    onClick={() => onDelete(item._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

const InventoryItems = () => {
  const { tenantId } = useSelector((state) => state.login); // Fetch tenantId from Redux store
  const [inventoryItems, setInventoryItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 0,
    threshold: 0,
    tenantId: tenantId, // Include tenantId in the newItem state
  });

  const [loading, setLoading] = useState(false);  // Add loading state
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    const fetchInventoryItems = async () => {
      setLoading(true);
      setError(null);  // Reset error state on new fetch
      try {
        const response = await fetch(`${API_BASE_URL}/list?tenantId=${tenantId}`);
        const data = await response.json();
        if (data.success) {
          setInventoryItems(data.items);
        } else {
          setError("Unable to fetch data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
        setError("Unable to fetch data. Please try again later.");
      } finally {
        setLoading(false);  // Stop loading once fetch is done
      }
    };
    fetchInventoryItems();
  }, [tenantId]);

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${editingItem._id}?tenantId=${tenantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem) // No need to include tenantId in body, it's in query
      });
      const data = await response.json();
      
      if (data.success) {
        setInventoryItems(
          inventoryItems.map((item) =>
            item._id === editingItem._id ? data.item : item
          )
        );
        toast({ title: "Success", description: "Item updated successfully" });
        setIsEditing(false);
      } else {
        console.error("Server error:", data.error);
        toast({ 
          title: "Error", 
          description: data.error || "Failed to update item", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast({ 
        title: "Error", 
        description: "Network error: " + error.message, 
        variant: "destructive" 
      });
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${itemId}?tenantId=${tenantId}`, {
        method: "DELETE"
      });
      const data = await response.json();
      
      if (data.success) {
        toast({ title: "Success", description: "Item deleted successfully" });
        setInventoryItems(inventoryItems.filter((item) => item._id !== itemId));
      } else {
        console.error("Server error:", data.error);
        toast({ 
          title: "Error", 
          description: data.error || "Failed to delete item", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast({ 
        title: "Error", 
        description: "Network error: " + error.message, 
        variant: "destructive" 
      });
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/add?tenantId=${tenantId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      
      if (data.success) {
        toast({ title: "Success", description: "Item added successfully" });
        setInventoryItems([...inventoryItems, data.item]);
        setIsAddDialogOpen(false);
        setNewItem({ name: "", category: "", quantity: 0, threshold: 0, tenantId });
      } else {
        console.error("Server error:", data.error); // Log the specific error from server
        toast({ 
          title: "Error", 
          description: data.error || "Failed to add item", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error("Network error:", error); // Log network errors
      toast({ 
        title: "Error", 
        description: "Network error: " + error.message, 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Inventory Overview</h3>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input placeholder="Search inventory..." className="max-w-xs sm:max-w-sm w-full" />
        <Button variant="outline">
          <ArrowUpDown className="w-4 h-4 mr-2" /> Sort
        </Button>
      </div>

      <InventoryTable items={inventoryItems} onEdit={handleEdit} onDelete={handleDelete} loading={loading} error={error} />

      {/* Add Inventory Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={newItem.category}
                onValueChange={(value) => setNewItem({ ...newItem, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seeds">Seeds</SelectItem>
                  <SelectItem value="fertilizers">Fertilizers</SelectItem>
                  <SelectItem value="pesticides">Pesticides</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="threshold">Alert Threshold</Label>
              <Input
                id="threshold"
                type="number"
                value={newItem.threshold}
                onChange={(e) => setNewItem({ ...newItem, threshold: Number(e.target.value) })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Name</Label>
            <Input value={editingItem?.name || ""} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
            <Label>Category</Label>
            <Input value={editingItem?.category || ""} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} />
            <Label>Quantity</Label>
            <Input type="number" value={editingItem?.quantity || 0} onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryItems;