import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  StopCircle, 
  Play, 
  RotateCcw, 
  Download, 
  Activity,
  Box,
  Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const KiaanSpace = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectionReport, setDetectionReport] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [metrics, setMetrics] = useState({
    totalObjects: 0,
    uniqueObjects: 0,
    processingTime: 0
  });
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const processingRef = useRef(false);
  const reportRef = useRef(null);

  // Existing camera and processing functions remain the same
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsStreaming(true);
      toast({
        title: "Camera Started",
        description: "Now capturing and processing frames...",
        className: "bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800"
      });
      startFrameCapture();
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
      processingRef.current = false;
      toast({
        title: "Camera Stopped",
        description: "Processing final results..."
      });
    }
  };

  const captureFrame = async () => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      
      // Wait for video metadata to load
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        
        // Convert to base64 and remove the data URL prefix
        const base64Data = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
        resolve(base64Data);
      } else {
        resolve(null);
      }
    });
  };

  const sendFrameToServer = async (base64Frame) => {
    try {
      console.log('Sending frame to server...'); // Debug log
      const response = await fetch('http://192.168.0.197:5000/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frame: base64Frame })
      });
      
      console.log('Server response status:', response.status); // Debug log
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Server response data:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Error sending frame:', error);
      toast({
        title: "Processing Error",
        description: error.message,
        variant: "destructive"
      });
      return null;
    }
  };

  const startFrameCapture = async () => {
    processingRef.current = true;
    
    while (processingRef.current) {
      if (!isProcessing) {
        setIsProcessing(true);
        
        const frame = await captureFrame();
        if (frame) {
          const result = await sendFrameToServer(frame);
          if (result) {
            setDetectionReport(prev => {
              const newDetections = result.detections;
              return prev ? {
                detections: [...prev.detections, ...newDetections]
              } : result;
            });
          }
        }
        
        setIsProcessing(false);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      }
    }
  };

  useEffect(() => {
    return () => {
      processingRef.current = false;
      if (streamRef.current) {
        stopCamera();
      }
    };
  }, []);

  // Rest of the existing functions remain the same...

  const resetDetections = () => {
    setDetectionReport(null);
    setMetrics({
      totalObjects: 0,
      uniqueObjects: 0,
      processingTime: 0
    });
    toast({
      title: "Reset Complete",
      description: "All detections have been cleared",
      className: "bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800"
    });
  };

  const exportToPDF = async () => {
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('detection-report.pdf');
      
      toast({
        title: "Export Successful",
        description: "Detection report has been downloaded",
        className: "bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800"
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not generate PDF report",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-4 w-full mx-auto">
      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-green-100/50 dark:border-blue-900/30 rounded-2xl shadow-2xl hover:shadow-green-100/50 transition-all duration-300 ease-in-out">
        <CardHeader className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-900 dark:text-white flex items-center gap-3">
                <Camera className="text-green-600 dark:text-blue-400" />
                KiaanSpace
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-blue-200">
              Reality capture and AI-powered analytics for Farmers
              </CardDescription>
            </div>
            {/* <Badge variant="outline" className="bg-white/30 dark:bg-black/30">
              AI-Powered
            </Badge> */}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Metrics Cards */}
          {isStreaming && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 dark:text-blue-200">Total Objects</p>
                      <h3 className="text-2xl font-bold text-green-900 dark:text-white">{metrics.totalObjects}</h3>
                    </div>
                    <Box className="text-green-600 dark:text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 dark:text-blue-200">Unique Objects</p>
                      <h3 className="text-2xl font-bold text-green-900 dark:text-white">{metrics.uniqueObjects}</h3>
                    </div>
                    <Activity className="text-green-600 dark:text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-gray-800/80">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 dark:text-blue-200">Processing Time</p>
                      <h3 className="text-2xl font-bold text-green-900 dark:text-white">{metrics.processingTime}ms</h3>
                    </div>
                    <Clock className="text-green-600 dark:text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Video Feed */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-1">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full aspect-video object-cover rounded-xl"
            />
            {isProcessing && (
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-blue-500/90 text-white border-none">
                  Processing...
                </Badge>
              </div>
            )}
          </div>
          
          {/* Control Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {!isStreaming ? (
              <Button 
                onClick={startCamera} 
                className="bg-green-600 hover:bg-green-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Detection
              </Button>
            ) : (
              <Button 
                onClick={stopCamera} 
                variant="destructive" 
                className="flex items-center gap-2"
              >
                <StopCircle className="w-4 h-4" />
                Stop Detection
              </Button>
            )}
            
            <Button 
              onClick={resetDetections} 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-blue-900"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            
            <Button 
              onClick={exportToPDF} 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-blue-900"
              disabled={!detectionReport}
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>

          {/* Detection Results */}
          {detectionReport && detectionReport.detections && detectionReport.detections.length > 0 && (
            <div ref={reportRef} className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-green-900 dark:text-white flex items-center gap-2">
                <Activity className="text-green-600 dark:text-blue-400" />
                Detection Report
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detectionReport.detections.map((detection, idx) => (
                  <Card key={idx} className="bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <img 
                        src={`data:image/jpeg;base64,${detection.image}`} 
                        alt={`Detection ${idx + 1}`}
                        className="w-full rounded-lg mb-3"
                      />
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-900 dark:text-white">Objects Detected:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(detection.counts).map(([obj, count]) => (
                            <Badge 
                              key={obj}
                              variant="outline" 
                              className="bg-green-100 dark:bg-blue-900 text-green-800 dark:text-blue-200"
                            >
                              {obj}: {count}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KiaanSpace;