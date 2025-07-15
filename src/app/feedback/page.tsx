
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const { toast } = useToast();
  const { translations } = useLanguage();

  const handleSubmit = () => {
    if (rating === 0) {
        toast({
            variant: "destructive",
            title: translations.feedback.toast.ratingRequired.title,
            description: translations.feedback.toast.ratingRequired.description,
        });
        return;
    }
    console.log("Feedback Submitted:", { rating, comments });
    toast({
      title: translations.feedback.toast.success.title,
      description: translations.feedback.toast.success.description,
    });
    setRating(0);
    setComments("");
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">{translations.feedback.title}</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {translations.feedback.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-center font-semibold">{translations.feedback.ratingQuestion}</h3>
                <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                    key={star}
                    className={cn(
                        "h-10 w-10 cursor-pointer transition-colors",
                        (hoverRating >= star || rating >= star)
                        ? "text-primary fill-primary"
                        : "text-muted-foreground/50"
                    )}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    />
                ))}
                </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="comments" className="font-semibold">{translations.feedback.commentsLabel}</label>
              <Textarea
                id="comments"
                placeholder={translations.feedback.commentsPlaceholder}
                rows={5}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmit} size="lg">{translations.feedback.submitButton}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

    