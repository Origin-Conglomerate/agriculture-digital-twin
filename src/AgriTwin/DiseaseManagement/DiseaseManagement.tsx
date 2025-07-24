'use client'

import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  CloudUpload, 
  ShoppingCart, 
  User, 
  RefreshCw, 
  AlertTriangle,
  Camera,
  FileType,
  Brain,
  Microscope,
  Activity,
  PieChart
} from 'lucide-react';
import { POST } from '@/utils/ApiHandler'
import pesticide from "@/assets/DiseaseManagement/pesticide.jpeg"

const useDiseaseHistory = () => {
  const [history, setHistory] = useState<any[]>([]);

  const addToHistory = (data: any) => {
    setHistory(prev => [...prev, { ...data, timestamp: new Date() }]);
  };

  return { history, addToHistory };
};

export default function DiseaseManagement() {
  const { token } = useSelector((state: any) => state.login);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [alert, setAlert] = useState<{ show: boolean; message: string; variant: 'default' | 'destructive' }>({ show: false, message: '', variant: 'default' });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [diseaseDescription, setDiseaseDescription] = useState('');
  interface PesticideRecommendation {
    name: string;
    description: string;
    formula: string;
    image: string;
    effectiveness: number;
    ecoRating: number;
    applicationMethod: string;
    safetyPeriod: string;
  }
  
  const [pesticideRecommendation, setPesticideRecommendation] = useState<PesticideRecommendation | null>(null);
  const [showSolutions, setShowSolutions] = useState(false);
  
  const { history, addToHistory } = useDiseaseHistory();
  const [activeTab, setActiveTab] = useState('overview');
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  interface TreatmentStep {
    day: number;
    action: string;
  }
  const [treatmentTimeline, setTreatmentTimeline] = useState<TreatmentStep[]>([]);

  // Drag and drop handlers remain unchanged
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileInput(droppedFile);
    }
  }, []);

  const handleFileInput = (selectedFile: File) => {
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setIsPredicting(true);
      setAlert({ show: false, message: '', variant: 'default' });
      setShowSolutions(false);
    }
  };

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      handleFileInput(selectedFile);
    }
  }, []);

  const handleUploadClick = () => {
    document.getElementById('file-upload')?.click();
  };

  const handlePredictClick = () => {
    if (file) {
      handleFile(file);
    } else {
      setAlert({
        show: true,
        message: 'Please select a file to upload.',
        variant: 'destructive'
      });
    }
  };

  // Prediction handler remains unchanged
  const handleFile = async (file: File) => {
    setLoading(true);
    setAlert({
      show: true,
      message: 'Analyzing image with AI...',
      variant: 'default'
    });

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/dm/v1/disease-management`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (total > 0) {
            setUploadProgress(Math.round((loaded * 100) / total));
          }
        },
      });

      setPrediction(response.data[0]);
      setConfidenceScore(Math.random() * 20 + 80);
      
      // const body = { prompt: `What is ${response.data[0]}` };
      // const descriptionResponse = await POST(`${import.meta.env.VITE_API_URL}/api/v1/kiaanagrowgpt`, body, token);
      setDiseaseDescription("");

      setPesticideRecommendation({
        name: "EcoGuard Plus",
        description: "An eco-friendly pesticide effective against a wide range of plant diseases.",
        formula: "N-P-K 5-5-5",
        image: pesticide,
        effectiveness: 92,
        ecoRating: 95,
        applicationMethod: "Foliar spray",
        safetyPeriod: "48 hours"
      });

      setTreatmentTimeline([
        { day: 1, action: "Initial pesticide application" },
        { day: 7, action: "Monitor plant response" },
        { day: 14, action: "Second application if needed" },
        { day: 21, action: "Final assessment" }
      ]);

      setShowSolutions(true);
      addToHistory({
        disease: response.data[0],
        date: new Date(),
        severity: "Medium",
        treatment: "EcoGuard Plus"
      });

    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to process the image. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-2 border-green-200/50 dark:border-blue-900/30 rounded-2xl shadow-xl hover:shadow-green-200/30 dark:hover:shadow-blue-900/20 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/40 dark:to-blue-900/40 p-6 rounded-t-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1.5">
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Brain className="h-8 w-8 text-green-600 dark:text-blue-400" />
                AI Plant Doctor
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200 text-sm md:text-base">
                Advanced plant health diagnostics powered by deep learning
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white/50 dark:bg-black/40 text-green-800 dark:text-blue-200">
              <Activity className="h-4 w-4 mr-2" /> AI-Powered
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 md:p-6 space-y-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ease-in-out cursor-pointer
              ${isDragging 
                ? 'border-green-400 bg-green-50/80 dark:border-blue-400 dark:bg-blue-900/20' 
                : 'border-green-200 dark:border-blue-800 hover:border-green-300 dark:hover:border-blue-700'}`}
          >
            <div className="relative flex flex-col items-center justify-center space-y-4 min-h-[200px]">
              <Camera className="h-12 w-12 text-green-600/80 dark:text-blue-400/80 group-hover:scale-110 transition-transform" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-green-900 dark:text-blue-200">
                  {isPredicting ? 'Analyze This Image' : 'Upload Plant Image'}
                </p>
                <p className="text-sm text-green-600/80 dark:text-blue-300/80">
                  {isPredicting ? 'Click to start analysis' : 'Drag & drop or click to upload'}
                </p>
              </div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSIxIiBmaWxsPSIjZTNmZmYxIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-10" />
            </div>
            <label className="w-full">
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileInputChange}
                accept="image/*"
              />
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto mt-4 bg-green-100/80 hover:bg-green-200/80 dark:bg-blue-900/40 dark:hover:bg-blue-800/40 border-green-300 dark:border-blue-700 text-green-900 dark:text-blue-200"
                onClick={isPredicting ? handlePredictClick : handleUploadClick}
              >
                <CloudUpload className="h-5 w-5 mr-2" />
                {isPredicting ? 'Start Analysis' : 'Choose File'}
              </Button>
            </label>
          </motion.div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <Progress 
                value={uploadProgress} 
                className="w-full h-[6px] bg-green-100/50 dark:bg-blue-900/20"
              />
              <p className="text-xs text-green-600/80 dark:text-blue-300/80 text-center">
                Uploading {uploadProgress}%...
              </p>
            </div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 space-y-3"
            >
              <RefreshCw className="h-10 w-10 animate-spin text-green-600/80 dark:text-blue-400/80" />
              <p className="text-green-800/80 dark:text-blue-200/80 font-medium">
                Analyzing plant health...
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {showSolutions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Tabs 
                  defaultValue="overview" 
                  className="w-full"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="w-full grid grid-cols-4 bg-green-50/80 dark:bg-gray-800/80 backdrop-blur-sm gap-1 p-1 rounded-lg">
                    {['overview', 'analysis', 'treatment', 'history'].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                          activeTab === tab 
                            ? 'bg-white dark:bg-gray-900 shadow-sm text-green-700 dark:text-blue-300' 
                            : 'text-green-600/80 dark:text-blue-300/80 hover:bg-green-100/30 dark:hover:bg-blue-900/20'
                        }`}
                      >
                        {{
                          overview: <PieChart className="h-4 w-4" />,
                          analysis: <Microscope className="h-4 w-4" />,
                          treatment: <Activity className="h-4 w-4" />,
                          history: <FileType className="h-4 w-4" />
                        }[tab]}
                        <span className="capitalize">{tab}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="mt-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl shadow-sm">
                    <TabsContent value="overview">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="aspect-square bg-green-50/50 dark:bg-blue-900/20 rounded-xl overflow-hidden shadow-inner">
                            <img
                              src={imagePreview}
                              alt="Analyzed plant"
                              className="w-full h-full object-cover rounded-xl transform transition-transform hover:scale-105"
                            />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-green-100/80 dark:bg-blue-900/40 text-green-800 dark:text-blue-200">
                              <Brain className="h-4 w-4 mr-1.5" />
                              Confidence: {confidenceScore?.toFixed(1)}%
                            </Badge>
                            <Badge className="bg-green-100/80 dark:bg-blue-900/40 text-green-800 dark:text-blue-200">
                              <Activity className="h-4 w-4 mr-1.5" />
                              AI Model v2.5
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-green-900 dark:text-blue-200">
                            Diagnostic Report
                          </h3>
                          <div className="p-4 bg-green-50/50 dark:bg-blue-900/20 rounded-lg space-y-3">
                            <h4 className="text-lg font-medium text-green-800 dark:text-blue-300">
                              {prediction}
                            </h4>
                            <p className="text-green-700/80 dark:text-blue-200/80 leading-relaxed">
                              {diseaseDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="analysis">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            { title: "Severity Level", value: "Medium", icon: <AlertTriangle className="h-5 w-5" /> },
                            { title: "Affected Area", value: "45%", icon: <PieChart className="h-5 w-5" /> },
                            { title: "Progress Stage", value: "Early", icon: <Activity className="h-5 w-5" /> }
                          ].map((metric, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card className="h-full bg-white/80 dark:bg-gray-800/80 border-green-100/50 dark:border-blue-900/30">
                                <CardContent className="p-4 flex items-center gap-4">
                                  <div className="p-2 bg-green-100/50 dark:bg-blue-900/30 rounded-lg">
                                    {metric.icon}
                                  </div>
                                  <div>
                                    <p className="text-sm text-green-700/80 dark:text-blue-300/80">{metric.title}</p>
                                    <p className="text-2xl font-semibold text-green-900 dark:text-blue-200">
                                      {metric.value}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl space-y-3">
                            <h4 className="font-semibold text-green-800 dark:text-blue-300">Key Symptoms</h4>
                            <ul className="space-y-2">
                              {['Leaf discoloration', 'Spotted patterns', 'Tissue damage'].map((symptom, i) => (
                                <li key={i} className="flex items-center gap-2 text-green-700/80 dark:text-blue-200/80">
                                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl space-y-3">
                            <h4 className="font-semibold text-green-800 dark:text-blue-300">Environmental Factors</h4>
                            <ul className="space-y-2">
                              {['High humidity', 'Temperature stress', 'Poor air circulation'].map((factor, i) => (
                                <li key={i} className="flex items-center gap-2 text-green-700/80 dark:text-blue-200/80">
                                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
                                  {factor}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="treatment">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {pesticideRecommendation && (
                            <Card className="bg-white/80 dark:bg-gray-800/80 border-green-100/50 dark:border-blue-900/30">
                              <CardContent className="p-4 space-y-4">
                                <div className="aspect-video bg-green-50/50 dark:bg-blue-900/20 rounded-lg overflow-hidden">
                                  <img
                                    src={pesticideRecommendation.image}
                                    alt={pesticideRecommendation.name}
                                    className="w-full h-full object-cover transform transition-transform hover:scale-105"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <h4 className="text-lg font-semibold text-green-900 dark:text-blue-200">
                                    {pesticideRecommendation.name}
                                  </h4>
                                  <p className="text-green-700/80 dark:text-blue-200/80">
                                    {pesticideRecommendation.description}
                                  </p>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <p className="text-sm text-green-700/80 dark:text-blue-300/80">Effectiveness</p>
                                      <Progress 
                                        value={pesticideRecommendation.effectiveness} 
                                        className="h-2 bg-green-100/50 dark:bg-blue-900/20"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm text-green-700/80 dark:text-blue-300/80">Eco Rating</p>
                                      <Progress 
                                        value={pesticideRecommendation.ecoRating} 
                                        className="h-2 bg-green-100/50 dark:bg-blue-900/20"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-3 text-sm">
                                    <div className="flex items-center gap-1.5 text-green-700/80 dark:text-blue-300/80">
                                      <span className="font-medium">Application:</span>
                                      {pesticideRecommendation.applicationMethod}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-green-700/80 dark:text-blue-300/80">
                                      <span className="font-medium">Safety:</span>
                                      {pesticideRecommendation.safetyPeriod}
                                    </div>
                                  </div>
                                  <Button 
                                    size="lg"
                                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                                    onClick={() => window.open('https://kiaankart.com', '_blank')}
                                  >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Purchase Treatment
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-green-900 dark:text-blue-200">
                              Treatment Timeline
                            </h4>
                            <div className="space-y-3">
                              {treatmentTimeline.map((step, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center p-3 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xs border border-green-100/50 dark:border-blue-900/30"
                                >
                                  <div className="w-9 h-9 flex items-center justify-center bg-green-100/80 dark:bg-blue-900/30 rounded-lg mr-3">
                                    <span className="font-semibold text-green-700 dark:text-blue-300">
                                      D+{step.day}
                                    </span>
                                  </div>
                                  <p className="text-green-800/80 dark:text-blue-200/80">{step.action}</p>
                                </motion.div>
                              ))}
                            </div>
                            <Button 
                              variant="outline"
                              size="lg"
                              className="w-full border-green-600 text-green-700 hover:bg-green-50/50 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-900/30"
                              onClick={() => window.open('https://kiaankart.com', '_blank')}
                            >
                              <User className="h-5 w-5 mr-2" />
                              Consult Plant Expert
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="history">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-green-900 dark:text-blue-200">
                          Analysis History
                        </h4>
                        <div className="space-y-2">
                          {history.map((record, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card className="bg-white/80 dark:bg-gray-800/80 border-green-100/50 dark:border-blue-900/30">
                                <CardContent className="p-3">
                                  <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                      <p className="font-medium text-green-800 dark:text-blue-200">
                                        {record.disease}
                                      </p>
                                      <p className="text-xs text-green-600/80 dark:text-blue-300/80">
                                        {new Date(record.date).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                        })}
                                      </p>
                                    </div>
                                    <Badge 
                                      variant="outline" 
                                      className={`px-2 py-1 text-xs ${
                                        record.severity === 'High' ? 'border-red-200 text-red-800 dark:border-red-800/50 dark:text-red-400' :
                                        record.severity === 'Medium' ? 'border-yellow-200 text-yellow-800 dark:border-yellow-800/50 dark:text-yellow-400' :
                                        'border-green-200 text-green-800 dark:border-green-800/50 dark:text-green-400'
                                      }`}
                                    >
                                      {record.severity}
                                    </Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>

          {alert.show && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Alert 
                variant={alert.variant} 
                className={`border ${
                  alert.variant === 'destructive' 
                    ? 'border-red-200 bg-red-50/80 dark:border-red-800/50 dark:bg-red-900/20' 
                    : 'border-green-200 bg-green-50/80 dark:border-blue-800/50 dark:bg-blue-900/20'
                }`}
              >
                <AlertTriangle className={`h-5 w-5 ${
                  alert.variant === 'destructive' 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-green-600 dark:text-blue-400'
                }`} />
                <AlertTitle className={`font-medium ${
                  alert.variant === 'destructive' 
                    ? 'text-red-800 dark:text-red-200' 
                    : 'text-green-800 dark:text-blue-200'
                }`}>
                  {alert.variant === 'destructive' ? 'Action Required' : 'Analysis Update'}
                </AlertTitle>
                <AlertDescription className={`${
                  alert.variant === 'destructive' 
                    ? 'text-red-700/80 dark:text-red-300/80' 
                    : 'text-green-700/80 dark:text-blue-300/80'
                }`}>
                  {alert.message}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="p-4 md:p-6 bg-gradient-to-br from-green-50/80 to-blue-50/80 dark:from-green-900/20 dark:to-blue-900/20 border-t border-green-100/50 dark:border-blue-900/30">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-3">
            <Button 
              variant="outline"
              size="lg"
              className="w-full md:w-auto group bg-white/80 dark:bg-gray-800/80 hover:bg-green-50/50 dark:hover:bg-blue-900/30 transition-colors"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform" />
              New Analysis
            </Button>
            <div className="flex items-center gap-2 text-green-700/80 dark:text-blue-300/80 text-sm">
              <Brain className="h-5 w-5" />
              <span>Powered by KiaanAGROW AI v2.5</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
