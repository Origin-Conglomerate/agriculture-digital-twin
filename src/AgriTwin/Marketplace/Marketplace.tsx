"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PlusCircle,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  IndianRupee,
  Loader2,
  Sparkles,
  Package,
  Calculator,
  PieChartIcon,
  Search,
  Star,
  Truck,
  Leaf,
  Scale,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Interfaces
interface Product {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  vendor: string
  rating: number
  location: string
  dateAdded: string
}

interface ProductFormProps {
  onSubmit: (product: Product) => void
  loading: boolean
  initialProduct?: Product
}

interface ProductAnalyticsProps {
  products: Product[]
}

interface AIInsights {
  prediction: string
  alerts: string[]
  recommendations: string[]
}

// Helper functions for date formatting
const formatDisplayDate = (dateString: string): string => {
  if (!dateString) return ""
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// ProductAnalytics Component
const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No product data available
        </p>
      </div>
    )
  }

  const totalProducts = products.length
  const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / totalProducts
  const totalInventory = products.reduce((sum, product) => sum + product.quantity, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Total Products</p>
            <Package className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">
            {totalProducts}
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Avg. Price</p>
            <Calculator className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300 flex items-center">
            <IndianRupee className="mr-1" />
            {averagePrice.toFixed(2)}
          </h3>
        </CardContent>
      </Card>

      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 dark:text-blue-200">Total Inventory</p>
            <Scale className="text-green-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-blue-300">
            {totalInventory} kg
          </h3>
        </CardContent>
      </Card>
    </div>
  )
}

// ProductForm Component
const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, loading, initialProduct }) => {
  const [product, setProduct] = useState<Product>(
    initialProduct || {
      id: '',
      name: "",
      category: "Grains",
      price: 0,
      quantity: 0,
      vendor: "",
      rating: 0,
      location: "",
      dateAdded: new Date().toISOString()
    }
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(product)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        className="bg-white/80 dark:bg-gray-800/80"
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            className="w-full p-2 border rounded-md bg-white/80 dark:bg-gray-800/80"
            required
          >
            <option value="Grains">Grains</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Spices">Spices</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <Input
          type="number"
          placeholder="Quantity (kg)"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
          className="bg-white/80 dark:bg-gray-800/80"
          required
          min="0"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder="Price per kg"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
          className="bg-white/80 dark:bg-gray-800/80"
          required
          min="0"
          step="0.01"
        />
        
        <Input
          placeholder="Vendor"
          value={product.vendor}
          onChange={(e) => setProduct({ ...product, vendor: e.target.value })}
          className="bg-white/80 dark:bg-gray-800/80"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Location"
          value={product.location}
          onChange={(e) => setProduct({ ...product, location: e.target.value })}
          className="bg-white/80 dark:bg-gray-800/80"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
          <select
            value={product.rating}
            onChange={(e) => setProduct({ ...product, rating: Number(e.target.value) })}
            className="w-full p-2 border rounded-md bg-white/80 dark:bg-gray-800/80"
            required
          >
            <option value="0">0 Stars</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {initialProduct ? "Updating..." : "Adding..."}
          </>
        ) : initialProduct ? (
          "Update Product"
        ) : (
          "Add Product"
        )}
      </Button>
    </form>
  )
}

// Main AgriMarketplace Component
export default function Marketplace() {
  // Dummy data for products
  const dummyProducts: Product[] = [
    {
      id: '1',
      name: "Organic Basmati Rice",
      category: "Grains",
      price: 85.50,
      quantity: 500,
      vendor: "Green Fields Farm",
      rating: 4,
      location: "Punjab",
      dateAdded: "2023-10-15"
    },
    {
      id: '2',
      name: "Alphonso Mangoes",
      category: "Fruits",
      price: 120.75,
      quantity: 200,
      vendor: "Maharashtra Fruits Co.",
      rating: 5,
      location: "Maharashtra",
      dateAdded: "2023-10-18"
    },
    {
      id: '3',
      name: "Fresh Cauliflower",
      category: "Vegetables",
      price: 25.00,
      quantity: 300,
      vendor: "Vegetable King",
      rating: 3,
      location: "Haryana",
      dateAdded: "2023-10-20"
    },
    {
      id: '4',
      name: "Desi Cow Ghee",
      category: "Dairy",
      price: 550.00,
      quantity: 50,
      vendor: "Pure Dairy Farms",
      rating: 4,
      location: "Gujarat",
      dateAdded: "2023-10-22"
    },
    {
      id: '5',
      name: "Turmeric Powder",
      category: "Spices",
      price: 180.00,
      quantity: 100,
      vendor: "Spice Route",
      rating: 4,
      location: "Kerala",
      dateAdded: "2023-10-25"
    },
    {
      id: '6',
      name: "Organic Wheat",
      category: "Grains",
      price: 32.75,
      quantity: 800,
      vendor: "Golden Grains",
      rating: 4,
      location: "Madhya Pradesh",
      dateAdded: "2023-10-28"
    },
    {
      id: '7',
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: 18.50,
      quantity: 400,
      vendor: "Farm Fresh",
      rating: 3,
      location: "Karnataka",
      dateAdded: "2023-11-01"
    },
    {
      id: '8',
      name: "Shimla Apples",
      category: "Fruits",
      price: 95.00,
      quantity: 150,
      vendor: "Himalayan Orchards",
      rating: 5,
      location: "Himachal Pradesh",
      dateAdded: "2023-11-05"
    }
  ]

  const [products, setProducts] = useState<Product[]>(dummyProducts)
  const [activeTab, setActiveTab] = useState("overview")
  const [isAdding, setIsAdding] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [aiInsights, setAIInsights] = useState<AIInsights>({
    prediction: "Based on current market trends, we predict a 10-15% increase in prices for grains and dairy products next month.",
    alerts: [
      "High demand for organic products detected",
      "Low inventory alert for dairy products",
    ],
    recommendations: [
      "Consider stocking more organic grains before price increase",
      "Connect with verified vendors for bulk discounts"
    ]
  })

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Handle add product
  const handleAddProduct = (newProduct: Product) => {
    setIsAdding(true)
    setTimeout(() => {
      const productWithId = {
        ...newProduct,
        id: Math.random().toString(36).substring(2, 9),
        dateAdded: new Date().toISOString()
      }
      setProducts(prev => [...prev, productWithId])
      toast({
        title: "Success",
        description: "Product added successfully",
      })
      setOpenAddDialog(false)
      setIsAdding(false)
    }, 1000)
  }

  // Handle update product
  const handleUpdateProduct = (updatedProduct: Product) => {
    if (!editingProduct) return
    
    setIsUpdating(true)
    setTimeout(() => {
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id ? updatedProduct : product
      ))
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
      setEditingProduct(null)
      setIsUpdating(false)
    }, 1000)
  }

  // Handle delete product
  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId))
    toast({
      title: "Success",
      description: "Product deleted successfully",
    })
  }

  // Categories for filter
  const categories = ["All", "Grains", "Vegetables", "Fruits", "Dairy", "Spices", "Other"]

  return (
    <Card className="w-full max-w-[89vw] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <div className="flex flex-col">
            <CardTitle className="text-lg md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-blue-400" />
              Agri-Products Marketplace
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
              Connect with farmers and vendors across India
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
              <Truck className="mr-1 h-3 w-3" /> Pan-India
            </Badge>
            <Badge variant="outline" className="min-w-fit whitespace-nowrap bg-white/30 dark:bg-black/30 px-3 py-1 text-xs md:text-sm">
              <Leaf className="mr-1 h-3 w-3" /> 100% Organic
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full bg-green-50 dark:bg-gray-800 p-2 rounded-lg">
            <TabsTrigger
              value="overview"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "overview" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <PieChartIcon className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "products" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <Package className="w-4 h-4" /> Products
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "analytics" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <TrendingUp className="w-4 h-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger
              value="ai-insights"
              className={cn(
                "flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1 transition-all duration-300",
                activeTab === "ai-insights" ? "bg-green-200 dark:bg-blue-900" : ""
              )}
            >
              <Sparkles className="w-4 h-4" /> AI Insights
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <TabsContent value="overview" className="space-y-4">
                <ProductAnalytics products={products} />
              </TabsContent>

              <TabsContent value="products">
                <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4 md:p-6 space-y-4 md:space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row gap-2 w-full">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search products or vendors..."
                          className="pl-10 bg-white/80 dark:bg-gray-800/80 w-full"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-2 border rounded-md bg-white/80 dark:bg-gray-800/80"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700 w-full md:w-auto">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Product
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                        <DialogHeader>
                          <DialogTitle>Add New Product</DialogTitle>
                        </DialogHeader>
                        <ProductForm onSubmit={handleAddProduct} loading={isAdding} />
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-10 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          No products match your search criteria
                        </p>
                      </div>
                    ) : (
                      <Table className="min-w-full">
                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                          <TableRow>
                            <TableHead className="px-4 py-3 text-left">Product</TableHead>
                            <TableHead className="px-4 py-3 text-left">Category</TableHead>
                            <TableHead className="px-4 py-3 text-left">Price (₹/kg)</TableHead>
                            <TableHead className="px-4 py-3 text-left">Quantity</TableHead>
                            <TableHead className="px-4 py-3 text-left">Vendor</TableHead>
                            <TableHead className="px-4 py-3 text-left">Rating</TableHead>
                            <TableHead className="px-4 py-3 text-left">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                          {filteredProducts.map((product) => (
                            <TableRow
                              key={product.id}
                              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            >
                              <TableCell className="px-4 py-3">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {product.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {product.location}
                                </div>
                              </TableCell>
                              <TableCell className="px-4 py-3">
                                <Badge variant="outline" className="capitalize">
                                  {product.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="px-4 py-3">
                                <div className="flex items-center">
                                  <IndianRupee className="w-4 h-4 mr-1" />
                                  {product.price.toFixed(2)}
                                </div>
                              </TableCell>
                              <TableCell className="px-4 py-3">
                                {product.quantity} kg
                              </TableCell>
                              <TableCell className="px-4 py-3">
                                {product.vendor}
                              </TableCell>
                              <TableCell className="px-4 py-3">
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < product.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="px-4 py-3">
                                <div className="flex space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => setEditingProduct(product)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="text-white hover:bg-red-700"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="ai-insights">
                <Card className="bg-white/50 dark:bg-gray-900/50">
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">AI Market Prediction</h3>
                      <p className="text-green-700 dark:text-blue-200">{aiInsights.prediction}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">Alerts</h3>
                      {aiInsights.alerts.map((alert, index) => (
                        <div key={index} className="flex items-center gap-2 text-green-700 dark:text-blue-200">
                          <AlertCircle className="w-4 h-4" />
                          {alert}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-blue-300">Recommendations</h3>
                      {aiInsights.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-center gap-2 text-green-700 dark:text-blue-200">
                          <Sparkles className="w-4 h-4" />
                          {recommendation}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        {/* Edit Product Dialog */}
        <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
          <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              onSubmit={handleUpdateProduct}
              loading={isUpdating}
              initialProduct={editingProduct || undefined}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}