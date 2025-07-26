import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userHasRegistered } from "@/lib/actions/has-user-registered";

export default async function Page() {
await userHasRegistered();

  return (
    <div className="flex gap-4 justify-center">
      <Card className="w-250">
        <CardHeader>
          <CardTitle>Learn</CardTitle>
          <CardDescription>Select this one and start learning!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Search Teachers</Button>
        </CardContent>
      </Card>

      <Card className="w-250">
        <CardHeader>
          <CardTitle>Teach</CardTitle>
          <CardDescription>Select this one and start teaching!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Search Students</Button>
        </CardContent>
      </Card>
    </div>
  );
}
