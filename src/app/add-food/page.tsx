
"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Type, ScanBarcode, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function AddFoodPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedOption === "camera" || selectedOption === "scan") {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings to use this feature.",
          });
        }
      };
      getCameraPermission();
    } else {
        // Stop camera stream when not in use
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }
  }, [selectedOption, toast]);

  const renderContent = () => {
    switch (selectedOption) {
      case "camera":
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Use Camera</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full bg-muted rounded-md overflow-hidden aspect-video flex items-center justify-center">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              </div>
               {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser settings to use this feature.
                  </AlertDescription>
                </Alert>
              )}
              <Button disabled={!hasCameraPermission} className="w-full">
                <Camera className="mr-2" /> Snap Photo
              </Button>
            </CardContent>
          </Card>
        );
      case "describe":
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Describe Meal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="e.g., 'A bowl of oatmeal with blueberries, almonds, and a drizzle of honey'" rows={4} />
              <Button className="w-full">Analyze Meal Description</Button>
            </CardContent>
          </Card>
        );
      case "scan":
        return (
            <Card className="w-full">
            <CardHeader>
                <CardTitle>Scan Barcode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="w-full bg-muted rounded-md overflow-hidden aspect-video flex items-center justify-center">
                  <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                </div>
                {hasCameraPermission === false && (
                  <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                      Please allow camera access to scan barcodes.
                    </AlertDescription>
                  </Alert>
                )}
                <Button className="w-full" disabled={!hasCameraPermission}>
                    <ScanBarcode className="mr-2" /> Start Scanning
                </Button>
            </CardContent>
            </Card>
        );
      case "upload":
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Upload from Device</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="file" accept="image/*" />
              <Button className="w-full">
                <Upload className="mr-2" /> Upload and Analyze
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Log Your Meal</h1>
          <p className="text-muted-foreground mt-2">
            Add a meal by snapping a photo, describing it, or scanning a barcode. Our AI will handle the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant={selectedOption === 'camera' ? 'default' : 'outline'} size="lg" className="h-20" onClick={() => setSelectedOption("camera")}>
            <Camera className="mr-2" /> Snap a Photo
          </Button>
          <Button variant={selectedOption === 'describe' ? 'default' : 'outline'} size="lg" className="h-20" onClick={() => setSelectedOption("describe")}>
            <Type className="mr-2" /> Describe Meal
          </Button>
          <Button variant={selectedOption === 'scan' ? 'default' : 'outline'} size="lg" className="h-20" onClick={() => setSelectedOption("scan")}>
            <ScanBarcode className="mr-2" /> Scan Barcode
          </Button>
          <Button variant={selectedOption === 'upload' ? 'default' : 'outline'} size="lg" className="h-20" onClick={() => setSelectedOption("upload")}>
            <Upload className="mr-2" /> Upload from Device
          </Button>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-md">
            {renderContent()}
          </div>
        </div>
      </div>
    </main>
  );
}
