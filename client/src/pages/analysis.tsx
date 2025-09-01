import { useState, useRef } from "react";
import { ArrowLeft, Upload, Camera, Image, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AloeGuardLogo } from "@/components/aloe-guard-logo";
import { CameraCapture } from "@/components/CameraCapture";
import { useModelPrediction } from "@/hooks/useModelPrediction";
import { useToast } from "@/hooks/use-toast";
import type { PredictionResult } from "@/services/modelService";

export default function Analysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PredictionResult | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { predict, isPredicting, isModelLoading } = useModelPrediction();


  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysisResult(null);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleCameraCapture = (capture: { file: File; preview: string }) => {
    setSelectedFile(capture.file);
    setPreviewUrl(capture.preview);
    setAnalysisResult(null);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const startAnalysis = async () => {
    if (selectedFile) {
      try {
        const result = await predict(selectedFile);
        setAnalysisResult(result);
      } catch (error) {
        // Error handling is done in the hook
      }
    }
  };

  const getSeverityColor = (severity: string | null) => {
    switch (severity) {
      case 'low': return 'bg-yellow-500';
      case 'moderate': return 'bg-orange-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getSeverityDots = (severity: string | null) => {
    const dots = [];
    const activeCount = severity === 'low' ? 1 : severity === 'moderate' ? 2 : severity === 'high' ? 3 : 0;
    
    for (let i = 0; i < 5; i++) {
      dots.push(
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${i < activeCount ? getSeverityColor(severity) : 'bg-gray-200'}`}
        />
      );
    }
    return dots;
  };

  return (
    <div className="bg-[#edfffa] min-h-screen max-w-[393px] mx-auto">
      {/* Header */}
      <header className="pt-8 px-8 pb-4">
        <div className="flex items-center mb-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-8 h-8 p-0 bg-[#1c85672e] rounded-full shadow-[0px_4px_10.8px_#00000040,inset_0px_4px_11.4px_#00000014] mr-4"
            >
              <ArrowLeft className="w-4 h-4 text-[#063528]" />
            </Button>
          </Link>
          <AloeGuardLogo />
        </div>
        
        <h1 className="[font-family:'Roboto',Helvetica] font-bold text-[#063528] text-2xl">
          Plant Analysis
        </h1>
      </header>

      <main className="px-8 pb-20">
        {/* Upload Section */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-6 mb-6">
          <h2 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
            Upload Plant Image
          </h2>
          
          {/* File Upload Area */}
          <div 
            className="border-2 border-dashed border-[#1c8567]/30 rounded-lg p-8 text-center mb-4 cursor-pointer hover:border-[#1c8567]/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <div className="space-y-4">
                <img 
                  src={previewUrl} 
                  alt="Selected plant" 
                  className="max-w-full max-h-48 mx-auto rounded-lg object-cover"
                />
                <p className="text-[#063528]/70">Click to change image</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-[#1c8567]/60 mx-auto mb-4" />
                <p className="text-[#063528]/70 mb-4">Drop your plant image here or</p>
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-[#1c8567]/10 text-[#1c8567] border-[#1c8567]/30"
                >
                  Choose File
                </Button>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* Quick Capture */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => setShowCamera(true)}
              className="flex items-center justify-center space-x-2 bg-[#1c8567] text-white"
            >
              <Camera className="w-4 h-4" />
              <span>Camera</span>
            </Button>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex items-center justify-center space-x-2 bg-[#1c8567]/10 text-[#1c8567] border-[#1c8567]/30"
            >
              <Image className="w-4 h-4" />
              <span>Gallery</span>
            </Button>
          </div>

          {selectedFile && !analysisResult && (
            <Button 
              onClick={startAnalysis}
              disabled={isPredicting || isModelLoading}
              className="w-full mt-4 bg-[#1c8567] hover:bg-[#063528] text-white"
            >
              {isModelLoading ? "Loading AI Model..." : isPredicting ? "Analyzing..." : "Start Analysis"}
            </Button>
          )}
        </Card>

        {/* Analysis Progress */}
        {(isPredicting || isModelLoading) && (
          <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#1c8567]/20 border-t-[#1c8567] rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="font-medium text-[#063528] mb-2">
                {isModelLoading ? "Loading AI Model..." : "Analyzing your plant..."}
              </h3>
              <p className="text-sm text-[#063528]/70">
                {isModelLoading ? "Preparing the analysis engine" : "AI is examining the image for disease patterns"}
              </p>
            </div>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Result Card */}
            <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg">
                  Analysis Results
                </h3>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                  analysisResult.isHealthy 
                    ? "bg-green-100 text-green-800"
                    : analysisResult.confidence > 0.85 
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {Math.round(analysisResult.confidence * 100)}% Confidence
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-[#063528] mb-2">Detected Condition:</h4>
                <div className="flex items-center space-x-2">
                  {analysisResult.isHealthy ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                  <p className={`text-lg font-medium ${
                    analysisResult.isHealthy ? "text-green-600" : "text-red-600"
                  }`}>
                    {analysisResult.disease}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-[#063528] mb-2">Description:</h4>
                <p className="text-sm text-[#063528]/70">
                  {analysisResult.description}
                </p>
              </div>

              {/* Severity Indicator */}
              {analysisResult.severity && !analysisResult.isHealthy && (
                <div className="mb-4">
                  <h4 className="font-medium text-[#063528] mb-2">Severity Level:</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {getSeverityDots(analysisResult.severity)}
                    </div>
                    <span className="text-sm text-[#063528]/70 capitalize">
                      {analysisResult.severity}
                    </span>
                  </div>
                </div>
              )}
            </Card>

            {/* Treatment Recommendations */}
            {!analysisResult.isHealthy && (
              <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-6">
                <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
                  Recommended Treatment
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#0a8c2d]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#0a8c2d]">1</span>
                    </div>
                    <p className="text-sm text-[#063528]/80">Remove affected leaves to prevent spread</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#0a8c2d]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#0a8c2d]">2</span>
                    </div>
                    <p className="text-sm text-[#063528]/80">Apply appropriate treatment every 7 days</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#0a8c2d]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#0a8c2d]">3</span>
                    </div>
                    <p className="text-sm text-[#063528]/80">Improve air circulation around plant</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => {
                  toast({
                    title: "Results Saved",
                    description: "Analysis has been saved to your history.",
                  });
                }}
                className="bg-[#1c8567] text-white"
              >
                Save Results
              </Button>
              <Link href="/">
                <Button 
                  variant="outline"
                  className="w-full bg-[#1c8567]/10 text-[#1c8567] border-[#1c8567]/30"
                >
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Camera Capture Modal */}
      <CameraCapture
        isOpen={showCamera}
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />
    </div>
  );
}
