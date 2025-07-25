
"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Type, ScanBarcode, Upload, SwitchCamera, Loader2, BrainCircuit, X, Share2, CalendarIcon, Scale, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/context/language-context";
import { handleAnalyzeMeal } from "@/app/actions";
import { type AnalyzeMealOutput } from "@/ai/flows/analyze-meal";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useMealLog } from "@/context/meal-log-context";
import { Label } from "@/components/ui/label";
import { useUserAccount } from "@/context/user-account-context";
import Link from "next/link";


export default function AddFoodPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeMealOutput | null>(null);
  const [logDate, setLogDate] = useState<Date>(new Date());
  const [mealType, setMealType] = useState<string>("lunch");
  const [manualPortionSize, setManualPortionSize] = useState("");


  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { translations } = useLanguage();
  const { addMeal } = useMealLog();
  const { isPro, isTrialActive, startTrial } = useUserAccount();

  const isFeatureAllowed = isPro || isTrialActive;

  useEffect(() => {
    if (!isPro) {
        startTrial();
    }
  }, [isPro, startTrial])

  const resetState = () => {
    setIsLoading(false);
    setAnalysisResult(null);
    setDescription("");
    setManualPortionSize("");
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const handleOptionChange = (option: string | null) => {
    if (!isFeatureAllowed) return;
    resetState();
    setSelectedOption(option);
  }

  useEffect(() => {
    if (!isFeatureAllowed) {
        setSelectedOption(null);
        return;
    }
    const stopStream = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    if (selectedOption === "camera" || selectedOption === "scan") {
      const getCameraPermission = async () => {
        stopStream();
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: facingMode } 
          });
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
      stopStream();
    }
    
    return () => {
        stopStream();
    }
  }, [selectedOption, facingMode, toast, translations, isFeatureAllowed]);
    
  const handleSwitchCamera = () => {
    setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const toDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const performAnalysis = async (input: {description?: string, photoDataUri?: string}) => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
        const result = await handleAnalyzeMeal(input);
        if (result.error) {
            toast({
                variant: "destructive",
                title: translations.addFood.analysisError.title,
                description: result.error,
            });
            setAnalysisResult(null);
        } else {
            setAnalysisResult(result);
            setManualPortionSize(result.portionSize || "");
        }
    } catch (error) {
      toast({
        variant: "destructive",
        title: translations.addFood.analysisError.title,
        description: (error instanceof Error ? error.message : translations.addFood.analysisError.description)
      });
      console.error("Error analyzing meal:", error);
    } finally {
        setIsLoading(false);
    }
  }

  const handleDescribeMeal = () => {
    if(!description.trim()) return;
    performAnalysis({ description });
  }

  const handleSnapPhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUri = canvas.toDataURL('image/jpeg');
      performAnalysis({ photoDataUri: dataUri });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const dataUri = await toDataURL(file);
      performAnalysis({ photoDataUri: dataUri });
    }
  };

  const handleLogMeal = () => {
     if (!analysisResult) return;
     
     addMeal({
        ...analysisResult,
        portionSize: manualPortionSize,
        date: logDate.toISOString(),
        mealType: mealType,
     })

     const mealName = analysisResult.mealName;
     const mealTypeText = translations.addFood.mealTypes[mealType as keyof typeof translations.addFood.mealTypes] || mealType;
     toast({
        title: translations.addFood.logSuccess.title,
        description: translations.addFood.logSuccess.description
            .replace('{mealName}', mealName ?? 'Meal')
            .replace('{mealType}', mealTypeText)
            .replace('{date}', format(logDate, 'PPP'))
     });
     resetState();
     handleOptionChange(null);
  }

  const handleShare = (result: AnalyzeMealOutput) => {
    const message = `🍽️ *${result.mealName}* (${manualPortionSize || 'N/A'})

*${translations.addFood.analysisResult.macrosTitle.toUpperCase()}*
🔥 ${translations.addFood.analysisResult.calories}: ${result.calories?.toFixed(0)} kcal
💪 ${translations.addFood.analysisResult.protein}: ${result.protein?.toFixed(1)}g
🍞 ${translations.addFood.analysisResult.carbs}: ${result.carbs?.toFixed(1)}g
🥑 ${translations.addFood.analysisResult.fats}: ${result.fats?.toFixed(1)}g

*${translations.addFood.analysisResult.microsTitle.toUpperCase()}*
🍯 ${translations.addFood.analysisResult.sugar}: ${result.sugar?.toFixed(1)}g
🧂 ${translations.addFood.analysisResult.sodium}: ${result.sodium?.toFixed(0)}mg
🍌 ${translations.addFood.analysisResult.potassium}: ${result.potassium?.toFixed(0)}mg
🦴 ${translations.addFood.analysisResult.calcium}: ${result.calcium?.toFixed(0)}mg
⚡ ${translations.addFood.analysisResult.iron}: ${result.iron?.toFixed(1)}mg
🍊 ${translations.addFood.analysisResult.vitaminC}: ${result.vitaminC?.toFixed(1)}mg

📱 Tracked with ${translations.appName} - Your AI nutrition companion! 🤖✨`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.location.href = whatsappUrl;
  };

  const UpgradePrompt = () => (
    <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <Lock className="mx-auto h-12 w-12 text-primary"/>
            <CardTitle>{translations.addFood.upgrade.title}</CardTitle>
            <CardDescription>{translations.addFood.upgrade.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <Link href="/pricing" className="w-full">
                <Button className="w-full">{translations.addFood.upgrade.button}</Button>
            </Link>
        </CardContent>
    </Card>
  )

  const renderContent = () => {
    const cameraView = (title: string, buttonText: string, buttonIcon: React.ReactNode, onButtonClick: () => void) => (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full bg-muted rounded-md overflow-hidden aspect-video flex items-center justify-center relative">
             <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
             {hasCameraPermission && (
                <Button variant="outline" size="icon" className="absolute top-2 right-2 z-10" onClick={handleSwitchCamera}>
                    <SwitchCamera />
                </Button>
             )}
          </div>
           {hasCameraPermission === false && (
            <Alert variant="destructive">
              <AlertTitle>{translations.addFood.cameraAccessRequired}</AlertTitle>
              <AlertDescription>
                {translations.addFood.cameraPermission}
              </AlertDescription>
            </Alert>
          )}
          <Button disabled={!hasCameraPermission || isLoading} className="w-full" onClick={onButtonClick}>
            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : buttonIcon} {isLoading ? translations.addFood.analyzing : buttonText}
          </Button>
        </CardContent>
      </Card>
    );

    switch (selectedOption) {
      case "camera":
        return cameraView(
            translations.addFood.useCamera,
            translations.addFood.snapAndAnalyze,
            <Camera className="mr-2" />,
            handleSnapPhoto
        );
      case "describe":
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{translations.addFood.describeMealTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder={translations.addFood.describePlaceholder} rows={4} value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoading}/>
              <Button className="w-full" onClick={handleDescribeMeal} disabled={isLoading || !description.trim()}>
                {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <BrainCircuit className="mr-2"/>} {isLoading ? translations.addFood.analyzing : translations.addFood.analyzeDescription}
              </Button>
            </CardContent>
          </Card>
        );
      case "scan":
        return cameraView(
            translations.addFood.scanBarcodeTitle,
            translations.addFood.startScanning,
            <ScanBarcode className="mr-2" />,
            handleSnapPhoto
        );
      case "upload":
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{translations.addFood.uploadDeviceTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} disabled={isLoading}/>
              <Button className="w-full" onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Upload className="mr-2" />} {isLoading ? translations.addFood.analyzing : translations.addFood.uploadAndAnalyze}
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  const confidenceColor = {
    High: "bg-green-500 hover:bg-green-600",
    Medium: "bg-yellow-500 hover:bg-yellow-600",
    Low: "bg-red-500 hover:bg-red-600",
  }

  const NutrientRow = ({ label, value, unit }: { label: string; value?: number; unit: string; }) => {
    if (typeof value !== 'number') return null;
    return (
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value.toFixed(value > 10 ? 0 : 1)} {unit}</span>
        </div>
    )
  }

  const AnalysisResultCard = () => (
    <Card className="w-full max-w-md">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle>{translations.addFood.analysisResult.title}</CardTitle>
                    <CardDescription>{translations.addFood.analysisResult.description}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={resetState}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
             {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : analysisResult && (
                <>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl font-bold">{analysisResult.mealName}</h3>
                        {analysisResult.confidence && (
                             <Badge className={confidenceColor[analysisResult.confidence]}>
                                {translations.addFood.analysisResult.confidence}: {translations.addFood.analysisResult.confidenceLevels[analysisResult.confidence]}
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="portion-size" className="flex items-center gap-2 text-muted-foreground">
                            <Scale className="h-4 w-4" />
                            {translations.addFood.analysisResult.portionSize}
                        </Label>
                        <Input
                            id="portion-size"
                            value={manualPortionSize}
                            onChange={(e) => setManualPortionSize(e.target.value)}
                            placeholder={translations.addFood.analysisResult.portionSizePlaceholder}
                        />
                    </div>

                    <p className="text-sm text-muted-foreground">{analysisResult.feedback}</p>
                    
                    {analysisResult.ingredients && analysisResult.ingredients.length > 0 && (
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="ingredients">
                                <AccordionTrigger>{translations.addFood.analysisResult.ingredientsTitle}</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        {analysisResult.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )}
                    
                    <div className="space-y-2">
                        <h4 className="font-semibold">{translations.addFood.analysisResult.macrosTitle}</h4>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                           <NutrientRow label={translations.addFood.analysisResult.calories} value={analysisResult.calories} unit="kcal" />
                           <NutrientRow label={translations.addFood.analysisResult.protein} value={analysisResult.protein} unit="g" />
                           <NutrientRow label={translations.addFood.analysisResult.carbs} value={analysisResult.carbs} unit="g" />
                           <NutrientRow label={translations.addFood.analysisResult.fats} value={analysisResult.fats} unit="g" />
                        </div>
                    </div>
                    
                    <Separator />

                    <div className="space-y-2">
                         <h4 className="font-semibold">{translations.addFood.analysisResult.microsTitle}</h4>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                           <NutrientRow label={translations.addFood.analysisResult.sugar} value={analysisResult.sugar} unit="g" />
                           <NutrientRow label={translations.addFood.analysisResult.sodium} value={analysisResult.sodium} unit="mg" />
                           <NutrientRow label={translations.addFood.analysisResult.potassium} value={analysisResult.potassium} unit="mg" />
                           <NutrientRow label={translations.addFood.analysisResult.calcium} value={analysisResult.calcium} unit="mg" />
                           <NutrientRow label={translations.addFood.analysisResult.iron} value={analysisResult.iron} unit="mg" />
                           <NutrientRow label={translations.addFood.analysisResult.vitaminC} value={analysisResult.vitaminC} unit="mg" />
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <Select value={mealType} onValueChange={setMealType}>
                            <SelectTrigger>
                                <SelectValue placeholder={translations.addFood.logOptions.mealTypePlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="breakfast">{translations.addFood.mealTypes.breakfast}</SelectItem>
                                <SelectItem value="lunch">{translations.addFood.mealTypes.lunch}</SelectItem>
                                <SelectItem value="dinner">{translations.addFood.mealTypes.dinner}</SelectItem>
                                <SelectItem value="snack">{translations.addFood.mealTypes.snack}</SelectItem>
                                <SelectItem value="dessert">{translations.addFood.mealTypes.dessert}</SelectItem>
                            </SelectContent>
                        </Select>
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !logDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {logDate ? format(logDate, "PPP") : <span>{translations.addFood.logOptions.datePlaceholder}</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={logDate}
                                onSelect={(date) => setLogDate(date || new Date())}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button className="w-full" onClick={handleLogMeal}>{translations.addFood.analysisResult.logButton}</Button>
                        <Button variant="outline" className="w-full" onClick={() => handleShare(analysisResult)}>
                            <Share2 className="mr-2" />
                            {translations.addFood.analysisResult.shareButton}
                        </Button>
                    </div>
                </>
             )}
        </CardContent>
    </Card>
  )

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{translations.addFood.title}</h1>
          <p className="text-muted-foreground mt-2">
            {translations.addFood.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button disabled={!isFeatureAllowed} variant={selectedOption === 'camera' ? 'default' : 'outline'} size="lg" className="h-16 text-sm sm:text-base flex-1 min-w-[150px] md:h-20" onClick={() => handleOptionChange("camera")}>
            <Camera className="mr-2" /> {translations.addFood.snapPhoto}
          </Button>
          <Button disabled={!isFeatureAllowed} variant={selectedOption === 'describe' ? 'default' : 'outline'} size="lg" className="h-16 text-sm sm:text-base flex-1 min-w-[150px] md:h-20" onClick={() => handleOptionChange("describe")}>
            <Type className="mr-2" /> {translations.addFood.describeMeal}
          </Button>
          <Button disabled={!isFeatureAllowed} variant={selectedOption === 'scan' ? 'default' : 'outline'} size="lg" className="h-16 text-sm sm:text-base flex-1 min-w-[150px] md:h-20" onClick={() => handleOptionChange("scan")}>
            <ScanBarcode className="mr-2" /> {translations.addFood.scanBarcode}
          </Button>
          <Button disabled={!isFeatureAllowed} variant={selectedOption === 'upload' ? 'default' : 'outline'} size="lg" className="h-16 text-sm sm:text-base flex-1 min-w-[150px] md:h-20" onClick={() => handleOptionChange("upload")}>
            <Upload className="mr-2" /> {translations.addFood.uploadDevice}
          </Button>
        </div>

        <div className="w-full flex justify-center">
            {isLoading || analysisResult ? (
                <AnalysisResultCard />
            ) : !isFeatureAllowed ? (
                <UpgradePrompt />
            ) : (
                 <div className="w-full max-w-md">
                    {renderContent()}
                </div>
            )}
        </div>
      </div>
    </main>
  );
}

    