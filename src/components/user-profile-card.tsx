import { UserCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserProfileCard() {
  const user = {
    name: "Alex Doe",
    age: 28,
    weight: "70 kg",
    height: "175 cm",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">My Profile</CardTitle>
        <UserCircle className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Age</span>
            <span>{user.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight</span>
            <span>{user.weight}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height</span>
            <span>{user.height}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
