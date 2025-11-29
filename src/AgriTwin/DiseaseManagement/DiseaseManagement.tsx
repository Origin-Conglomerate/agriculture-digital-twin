'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
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
  Upload,
  FileType,
  Brain,
  Microscope,
  Activity,
  PieChart
} from 'lucide-react';
import pesticide from "@/assets/DiseaseManagement/pesticide.jpeg"
import bananaDisease from "@/assets/panama.jpeg"  // Using an existing image from assets

const useDiseaseHistory = () => {
  const [history, setHistory] = useState<any[]>([]);

  const addToHistory = (data: any) => {
    setHistory(prev => [...prev, { ...data, timestamp: new Date() }]);
  };

  return { history, addToHistory };
};

export default function DiseaseManagement() {
  const { token } = useSelector((state: any) => state.login);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [alert, setAlert] = useState<{ show: boolean; message: string; variant: 'default' | 'destructive' }>({ show: false, message: '', variant: 'default' });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
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

  // Handle file selection from input
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle upload button click in dialog
  const handleUploadClick = () => {
    if (uploadedImage) {
      setShowUploadDialog(false);
      handleFile();
    }
  };

  // Prediction handler with simulated data
  const handleFile = async () => {
    setLoading(true);
    setAlert({
      show: true,
      message: 'Analyzing image with AI...',
      variant: 'default'
    });

    // Set the HARDCODED banana disease image (not the uploaded one)
    setImagePreview(bananaDisease);

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 20) {
      setUploadProgress(progress);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Hardcoded simulation for Banana Panama disease
    setPrediction("Banana Panama Disease");
    setConfidenceScore(92.5);

    setDiseaseDescription("Banana Panama disease is a devastating fungal infection caused by Fusarium oxysporum f.sp. cubense. It affects banana plants, causing wilting, yellowing of leaves, and eventual plant death. This disease is particularly dangerous as it can completely destroy banana crops.");

    setPesticideRecommendation({
      name: "FusaGuard Pro",
      description: "A specialized fungicide targeting Fusarium infections in banana plantations, with enhanced soil penetration and systemic protection.",
      formula: "Azoxystrobin 22.9%, Tebuconazole 14.3%",
      image: pesticide,
      effectiveness: 88,
      ecoRating: 75,
      applicationMethod: "Soil drench and foliar spray",
      safetyPeriod: "72 hours"
    });

    setTreatmentTimeline([
      { day: 1, action: "Initial fungicide application" },
      { day: 7, action: "Soil treatment and root zone management" },
      { day: 14, action: "Secondary fungicide application" },
      { day: 21, action: "Comprehensive plant health assessment" },
      { day: 30, action: "Quarantine and soil sterilization" }
    ]);

    setShowSolutions(true);
    addToHistory({
      disease: "Banana Panama Disease",
      date: new Date(),
      severity: "High",
      treatment: "FusaGuard Pro"
    });

    setLoading(false);
    setUploadProgress(0);
    setIsPredicting(true);
  };

  const handleResetAnalysis = () => {
    // Reset all analysis-related states
    setShowSolutions(false);
    setIsPredicting(false);
    setPrediction('');
    setDiseaseDescription('');
    setPesticideRecommendation(null);
    setTreatmentTimeline([]);
    setConfidenceScore(null);
    setImagePreview(null);
    setUploadedImage(null);
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
          {!showSolutions && !showUploadDialog && (
            <div className="flex flex-col items-center space-y-4">
              <div className="aspect-square w-full max-w-md bg-green-50/50 dark:bg-blue-900/20 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-green-600/60 dark:text-blue-400/60 space-y-3">
                  <CloudUpload className="h-16 w-16" />
                  <p className="text-sm font-medium">Upload Plant Image for Analysis</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto mt-4 bg-green-100/80 hover:bg-green-200/80 dark:bg-blue-900/40 dark:hover:bg-blue-800/40 border-green-300 dark:border-blue-700 text-green-900 dark:text-blue-200"
                onClick={() => setShowUploadDialog(true)}
                disabled={loading}
              >
                <CloudUpload className="h-5 w-5 mr-2" />
                Upload Image
              </Button>
            </div>
          )}

          {!showSolutions && showUploadDialog && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <Card className="p-6 bg-white/90 dark:bg-gray-800/90">
                <h3 className="text-lg font-semibold text-green-900 dark:text-blue-200 mb-4">
                  Upload Plant Image
                </h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-green-300 dark:border-blue-700 rounded-lg p-8 text-center">
                    {uploadedImage ? (
                      <div className="space-y-3">
                        <img
                          src={uploadedImage}
                          alt="Uploaded preview"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-green-600 dark:text-blue-300">Image ready to analyze</p>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <CloudUpload className="h-12 w-12 mx-auto mb-3 text-green-600 dark:text-blue-400" />
                        <p className="text-green-800 dark:text-blue-200 font-medium">
                          Click to select image
                        </p>
                        <p className="text-sm text-green-600 dark:text-blue-300 mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </label>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowUploadDialog(false);
                        setUploadedImage(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                      onClick={handleUploadClick}
                      disabled={!uploadedImage}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload & Analyze
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
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
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-2 w-full max-w-md">
                  <Progress 
                    value={uploadProgress} 
                    className="w-full h-[6px] bg-green-100/50 dark:bg-blue-900/20"
                  />
                  <p className="text-xs text-green-600/80 dark:text-blue-300/80 text-center">
                    Processing {uploadProgress}%...
                  </p>
                </div>
              )}
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
                            { title: "Severity Level", value: "High", icon: <AlertTriangle className="h-5 w-5" /> },
                            { title: "Affected Area", value: "65%", icon: <PieChart className="h-5 w-5" /> },
                            { title: "Progress Stage", value: "Advanced", icon: <Activity className="h-5 w-5" /> }
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
                              {[
                                'Yellowing and wilting of leaves', 
                                'Brown discoloration of vascular tissues', 
                                'Stunted plant growth', 
                                'Premature fruit drop'
                              ].map((symptom, i) => (
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
                              {[
                                'High soil moisture', 
                                'Warm tropical climate', 
                                'Poor soil drainage', 
                                'Infected planting material'
                              ].map((factor, i) => (
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
            {showSolutions && (
              <Button 
                variant="outline"
                size="lg"
                className="w-full md:w-auto group bg-white/80 dark:bg-gray-800/80 hover:bg-green-50/50 dark:hover:bg-blue-900/30 transition-colors"
                onClick={handleResetAnalysis}
              >
                <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform" />
                New Analysis
              </Button>
            )}
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
