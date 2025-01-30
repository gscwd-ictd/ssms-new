import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ssms/components/ui/card";
import { Button } from "@ssms/components/ui/button";
import { Input } from "@ssms/components/ui/input";
import { Label } from "@ssms/components/ui/label";
import { Switch } from "@ssms/components/ui/switch";
import { Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";

const CompanySettings = () => {
  return (
    <div className="container w-full p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">Profile</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Public Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Public profile</CardTitle>
            <CardDescription>This will be displayed on your profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company name</Label>
              <Input placeholder="Sisyphus Ventures" />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">untitled.com/</span>
                <Input placeholder="sisyphus" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company logo</CardTitle>
            <CardDescription>
              Update your company logo and choose where you want it to display.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/company-logo.png" />
                <AvatarFallback>CO</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="h-8">
                  <Upload className="mr-2 h-4 w-4" />
                  Click to upload
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">SVG, PNG, or JPG (max. 800x400px)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Branding</CardTitle>
            <CardDescription>Add your logo to reports and emails.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reports</Label>
                <p className="text-sm text-muted-foreground">Include my logo in summary reports</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Emails</Label>
                <p className="text-sm text-muted-foreground">Include my logo in customer emails</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Social Profiles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Social profiles</CardTitle>
            <CardDescription>Add your social media profiles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Twitter</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">twitter.com/</span>
                <Input placeholder="sisyphusnvc" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Facebook</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">facebook.com/</span>
                <Input placeholder="sisyphusnvc" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">linkedin.com/company/</span>
                <Input placeholder="sisyphusnvc" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanySettings;
