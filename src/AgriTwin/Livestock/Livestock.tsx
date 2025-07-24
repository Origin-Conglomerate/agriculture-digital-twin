"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { PlusCircle, Dog, Scan, HeartPulse, Weight, Milk, Loader2, Activity, Tag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Livestock {
    id: string
    rfid: string
    name: string
    breed: string
    age: number
    weight: number
    healthStatus: 'excellent' | 'good' | 'fair' | 'poor'
    lastVaccination: string
    milkProduction?: number // in liters
}

const Livestock = () => {
    // Generate dummy livestock data
    const generateDummyLivestock = (): Livestock[] => [
        {
            id: '1',
            rfid: 'RFID-001',
            name: 'Bella',
            breed: 'Holstein Friesian',
            age: 3,
            weight: 550,
            healthStatus: 'excellent',
            lastVaccination: '2023-10-15',
            milkProduction: 22
        },
        {
            id: '2',
            rfid: 'RFID-002',
            name: 'Daisy',
            breed: 'Jersey',
            age: 4,
            weight: 450,
            healthStatus: 'good',
            lastVaccination: '2023-11-02',
            milkProduction: 18
        },
        {
            id: '3',
            rfid: 'RFID-003',
            name: 'Molly',
            breed: 'Sahiwal',
            age: 5,
            weight: 500,
            healthStatus: 'fair',
            lastVaccination: '2023-09-20',
            milkProduction: 15
        },
        {
            id: '4',
            rfid: 'RFID-004',
            name: 'Bessie',
            breed: 'Gir',
            age: 2,
            weight: 480,
            healthStatus: 'excellent',
            lastVaccination: '2023-12-01',
            milkProduction: 20
        },
    ]

    const [livestock, setLivestock] = useState<Livestock[]>(generateDummyLivestock())
    const [isAdding, setIsAdding] = useState(false)
    const [isScanning, setIsScanning] = useState(false)
    const [newAnimal, setNewAnimal] = useState<Omit<Livestock, 'id'>>({
        rfid: '',
        name: '',
        breed: '',
        age: 0,
        weight: 0,
        healthStatus: 'good',
        lastVaccination: new Date().toISOString().split('T')[0]
    })
    const [activeTab, setActiveTab] = useState<'all' | 'healthy' | 'needsAttention'>('all')

    const handleAddAnimal = async () => {
        setIsAdding(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800))

            const newAnimalWithId = {
                ...newAnimal,
                id: `animal-${Date.now()}`,
                weight: Number(newAnimal.weight),
                age: Number(newAnimal.age)
            }

            setLivestock(prev => [...prev, newAnimalWithId])
            toast({
                title: "Success",
                description: "New animal added to livestock",
            })
            setNewAnimal({
                rfid: '',
                name: '',
                breed: '',
                age: 0,
                weight: 0,
                healthStatus: 'good',
                lastVaccination: new Date().toISOString().split('T')[0]
            })
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to add animal",
                variant: "destructive",
            })
        } finally {
            setIsAdding(false)
        }
    }

    const handleScanRFID = () => {
        setIsScanning(true)
        // Simulate RFID scan
        setTimeout(() => {
            setNewAnimal(prev => ({
                ...prev,
                rfid: `RFID-${Math.floor(1000 + Math.random() * 9000)}`
            }))
            setIsScanning(false)
            toast({
                title: "RFID Scanned",
                description: "Animal tag detected successfully",
            })
        }, 1500)
    }

    const filteredLivestock = livestock.filter(animal => {
        if (activeTab === 'healthy') return animal.healthStatus === 'excellent' || animal.healthStatus === 'good'
        if (activeTab === 'needsAttention') return animal.healthStatus === 'fair' || animal.healthStatus === 'poor'
        return true
    })

    const healthStatusColor = (status: Livestock['healthStatus']) => {
        switch (status) {
            case 'excellent': return 'bg-green-100 text-green-800'
            case 'good': return 'bg-blue-100 text-blue-800'
            case 'fair': return 'bg-yellow-100 text-yellow-800'
            case 'poor': return 'bg-red-100 text-red-800'
        }
    }
    return (
        <Card className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-lg">
            <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <CardTitle className="text-xl md:text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                            <Dog className="w-6 h-6 text-green-600 dark:text-blue-400" />
                            Livestock Management
                        </CardTitle>
                        <CardDescription className="text-sm md:text-base text-green-700 dark:text-blue-200">
                            RFID-enabled cattle tracking and health monitoring
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-white/30 dark:bg-black/30 px-3 py-1">
                        <Tag className="w-4 h-4 mr-2" />
                        RFID Tracking Enabled
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex space-x-2">
                        <Button
                            variant={activeTab === 'all' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('all')}
                            className="text-xs md:text-sm"
                        >
                            All Animals
                        </Button>
                        <Button
                            variant={activeTab === 'healthy' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('healthy')}
                            className="text-xs md:text-sm"
                        >
                            Healthy
                        </Button>
                        <Button
                            variant={activeTab === 'needsAttention' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('needsAttention')}
                            className="text-xs md:text-sm"
                        >
                            Needs Attention
                        </Button>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Animal
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add New Animal</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder="RFID Tag"
                                        value={newAnimal.rfid}
                                        onChange={(e) => setNewAnimal({ ...newAnimal, rfid: e.target.value })}
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={handleScanRFID}
                                        disabled={isScanning}
                                    >
                                        {isScanning ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Scan className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <Input
                                    placeholder="Animal Name"
                                    value={newAnimal.name}
                                    onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                                />
                                <Input
                                    placeholder="Breed"
                                    value={newAnimal.breed}
                                    onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        type="number"
                                        placeholder="Age (years)"
                                        value={newAnimal.age}
                                        onChange={(e) => setNewAnimal({ ...newAnimal, age: Number(e.target.value) })}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Weight (kg)"
                                        value={newAnimal.weight}
                                        onChange={(e) => setNewAnimal({ ...newAnimal, weight: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Health Status</label>
                                        <select
                                            value={newAnimal.healthStatus}
                                            onChange={(e) => setNewAnimal({ ...newAnimal, healthStatus: e.target.value as Livestock['healthStatus'] })}
                                            className="w-full p-2 border rounded-md"
                                        >
                                            <option value="excellent">Excellent</option>
                                            <option value="good">Good</option>
                                            <option value="fair">Fair</option>
                                            <option value="poor">Poor</option>
                                        </select>
                                    </div>
                                    <Input
                                        type="date"
                                        label="Last Vaccination"
                                        value={newAnimal.lastVaccination}
                                        onChange={(e) => setNewAnimal({ ...newAnimal, lastVaccination: e.target.value })}
                                    />
                                </div>
                                <Button
                                    onClick={handleAddAnimal}
                                    disabled={isAdding}
                                    className="w-full mt-4"
                                >
                                    {isAdding ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        'Add Animal'
                                    )}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            <TableRow>
                                <TableHead className="w-[100px]">RFID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Breed</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Weight</TableHead>
                                <TableHead>Health</TableHead>
                                <TableHead>Milk</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLivestock.map((animal) => (
                                <TableRow key={animal.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-gray-500" />
                                            {animal.rfid}
                                        </div>
                                    </TableCell>
                                    <TableCell>{animal.name}</TableCell>
                                    <TableCell>{animal.breed}</TableCell>
                                    <TableCell>{animal.age} yrs</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Weight className="w-4 h-4 text-gray-500" />
                                            {animal.weight} kg
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn("px-2 py-1 text-xs", healthStatusColor(animal.healthStatus))}>
                                            <HeartPulse className="w-3 h-3 mr-1" />
                                            {animal.healthStatus.charAt(0).toUpperCase() + animal.healthStatus.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {animal.milkProduction && (
                                            <div className="flex items-center gap-2">
                                                <Milk className="w-4 h-4 text-gray-500" />
                                                {animal.milkProduction} L/day
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">
                                            <Activity className="w-4 h-4 mr-2" />
                                            Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-green-50 dark:bg-green-900/20">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-green-700 dark:text-green-300">Total Animals</p>
                                <Dog className="text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">
                                {livestock.length}
                            </h3>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-blue-700 dark:text-blue-300">Healthy Animals</p>
                                <HeartPulse className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                                {livestock.filter(a => a.healthStatus === 'excellent' || a.healthStatus === 'good').length}
                            </h3>
                        </CardContent>
                    </Card>

                    <Card className="bg-orange-50 dark:bg-orange-900/20">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-orange-700 dark:text-orange-300">Avg Milk Production</p>
                                <Milk className="text-orange-600 dark:text-orange-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}

export default Livestock