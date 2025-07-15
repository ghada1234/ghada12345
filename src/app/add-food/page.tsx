
"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Type, ScanBarcode, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/context/language-context";

export default function AddFoodPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const { translations } = useLanguage();

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
            title: translations.addFood.toast.title,
            description: translations.addFood.toast.description,
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
  }, [selectedOption, toast, translations]);

  const renderContent = () => {
    switch (selectedOption) {
      case "camera":
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{translations.addFood.useCamera}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full bg-muted rounded-md overflow-hidden aspect-video flex items-center justify-center">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              </div>
               {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertTitle>{translations.addFood.cameraAccessRequired}</AlertTitle>
                  <AlertDescription>
                    {translations.addFood.cameraPermission}
                  </AlertDescription>
                </Alert>
              )}
              <Button disabled={!hasCameraPermission} className="w-full">
                <Camera className="mr-2" /> {translations.addFood.snapPhotoButton}
              </Button>
            </CardContent>
          </Card>
        );
      case "describe":
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{translations.addFood.describeMealTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder={translations.addFood.describePlaceholder} rows={4} />
              <Button className="w-full">{translations.addFood.analyzeDescription}</Button>
            </CardContent>
          </Card>
        );
      case "scan":
        return (
            <Card className="w-full">
            <CardHeader>
                <CardTitle>{translations.addFood.scanBarcodeTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="w-full bg-muted rounded-md overflow-hidden aspect-video flex items-center justify-center">
                  <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                </div>
                {hasCameraPermission === false && (
                  <Alert variant="destructive">
                    <AlertTitle>{translations.addFood.cameraAccessRequired}</AlertTitle>
                    <AlertDescription>
                      {translations.addFood.cameraPermissionBarcode}
                    </AlertDescription>
                  </Alert>
                )}
                <Button className="w-full" disabled={!hasCameraPermission}>
                    <ScanBarcode className="mr-2" /> {translations.addFood.startScanning}
                </Button>
            </CardContent>
            </Card>
        );
      case "upload":
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{translations.addFood.uploadDeviceTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="file" accept="image/*" />
              <Button className="w-full">
                <Upload className="mr-2" /> {translations.addFood.uploadAndAnalyze}
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
          <h1 className="text-3xl font-bold tracking-tight">{translations.addFood.title}</h1>
          <p className="text-muted-foreground mt-2">
            {translations.addFood.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant={selectedOption === 'camera' ? 'default' : 'outline'} size="lg" className="h-20" onClick={() => setSelectedOption("camera")}>
            <Camera className="mr-2" /> {translations.addFood.snapPhoto}
          </Button>
          <Button variant={selectedOption === 'describe' ? 'default' : 'outline'} size="lg" className="h-20" onClick={() => setSelectedOption("describe")}>
            <Type className="mr-2" /> {translations.addFood.describeMeal}
          </Button>
          <Button variant={selectedOption === 'scan' ? 'default' : 'outline'} size="lg" className="h-20" onClick={() => setSelectedOption("scan")}>
            <ScanBarcode className="mr-2" /> {translations.addFood.scanBarcode}
          </Button>
          <Button variant={selectedOption === 'upload' ? 'default' : 'outline'} size="lg" className="h-20" onClick={() => setSelectedOption("upload")}>
            <Upload className="mr-2" /> {translations.addFood.uploadDevice}
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
