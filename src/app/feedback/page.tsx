
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

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
        toast({
            variant: "destructive",
            title: "Rating required",
            description: "Please select a rating before submitting.",
        });
        return;
    }
    console.log("Feedback Submitted:", { rating, comments });
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for helping us improve NutriSnap.",
    });
    setRating(0);
    setComments("");
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">Share Your Feedback</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              We'd love to hear your thoughts. Your feedback helps us improve
              NutriSnap for everyone. Your review might even be featured on our
              home page!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-center font-semibold">How would you rate your experience?</h3>
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
              <label htmlFor="comments" className="font-semibold">Any comments or suggestions?</label>
              <Textarea
                id="comments"
                placeholder="Tell us what you think..."
                rows={5}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmit} size="lg">Submit Feedback</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
