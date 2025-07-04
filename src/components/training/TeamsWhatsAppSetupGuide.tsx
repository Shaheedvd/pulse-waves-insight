
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ExternalLink, Shield, Lightbulb, Settings, MessageSquare, Video, Key } from 'lucide-react';

export const TeamsWhatsAppSetupGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Settings className="h-8 w-8" />
          Setting Up Teams and WhatsApp API Configuration
        </h1>
        <p className="text-muted-foreground">
          Complete guide for integrating Microsoft Teams and WhatsApp Business Cloud API
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="bg-blue-50">
            <Video className="h-3 w-3 mr-1" />
            Teams Integration
          </Badge>
          <Badge variant="outline" className="bg-green-50">
            <MessageSquare className="h-3 w-3 mr-1" />
            WhatsApp Integration
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Microsoft Graph API Section */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="h-5 w-5" />
              1. Microsoft Graph API (Teams Integration)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Used for:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Video/audio call scheduling</li>
                <li>• Meeting creation</li>
                <li>• Access to Teams chat, presence, calendars</li>
                <li>• Saving call notes and files</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-1">
                🧭 Steps to Get Started:
              </h4>

              <div className="space-y-3">
                <div className="border-l-2 border-blue-200 pl-3">
                  <h5 className="font-medium text-sm">🔹 Step 1: Register a Microsoft Azure App</h5>
                  <ul className="text-xs space-y-1 mt-1 text-muted-foreground">
                    <li>Go to: <Button variant="link" className="h-auto p-0 text-xs" asChild>
                      <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer">
                        portal.azure.com <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button></li>
                    <li>Navigate to "Azure Active Directory" → "App Registrations"</li>
                    <li>Click "New Registration"</li>
                    <li>Name: Your App Name</li>
                    <li>Redirect URI: Set to your system's URI</li>
                  </ul>
                </div>

                <div className="border-l-2 border-blue-200 pl-3">
                  <h5 className="font-medium text-sm">🔹 Step 2: Generate Client Credentials</h5>
                  <ul className="text-xs space-y-1 mt-1 text-muted-foreground">
                    <li>Go to your app → Certificates & Secrets</li>
                    <li>Click "New client secret" → Save the value</li>
                  </ul>
                </div>

                <div className="border-l-2 border-blue-200 pl-3">
                  <h5 className="font-medium text-sm">🔹 Step 3: Assign API Permissions</h5>
                  <ul className="text-xs space-y-1 mt-1 text-muted-foreground">
                    <li>Go to API Permissions</li>
                    <li>Add Microsoft Graph permissions:</li>
                    <li className="ml-2">Delegated: Calendars.ReadWrite, OnlineMeetings.ReadWrite</li>
                    <li className="ml-2">Application: Chat.Read.All, OnlineMeetings.ReadWrite.All</li>
                    <li>Click "Grant Admin Consent"</li>
                  </ul>
                </div>

                <div className="border-l-2 border-blue-200 pl-3">
                  <h5 className="font-medium text-sm">🔹 Step 4: Get Required Details</h5>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Badge variant="outline" className="justify-center">Client ID</Badge>
                    <Badge variant="outline" className="justify-center">Client Secret</Badge>
                    <Badge variant="outline" className="justify-center">Tenant ID</Badge>
                    <Badge variant="outline" className="justify-center">Redirect URI</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Business Cloud API Section */}
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              2. WhatsApp Business Cloud API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Used for:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Sending/receiving WhatsApp messages</li>
                <li>• Template messaging (reminders, receipts)</li>
                <li>• Capturing responses into CRM</li>
                <li>• File sharing (PDFs, images, etc.)</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-1">
                🧭 Steps to Get Started:
              </h4>

              <div className="space-y-3">
                <div className="border-l-2 border-green-200 pl-3">
                  <h5 className="font-medium text-sm">🔹 Step 1: Set Up Meta Business Account</h5>
                  <ul className="text-xs space-y-1 mt-1 text-muted-foreground">
                    <li>Go to: <Button variant="link" className="h-auto p-0 text-xs" asChild>
                      <a href="https://business.facebook.com" target="_blank" rel="noopener noreferrer">
                        business.facebook.com <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button></li>
                    <li>Create or access your Meta Business Manager</li>
                    <li>Verify your business (documents required)</li>
                  </ul>
                </div>

                <div className="border-l-2 border-green-200 pl-3">
                  <h5 className="font-medium text-sm">🔹 Step 2: Create WhatsApp Business App</h5>
                  <ul className="text-xs space-y-1 mt-1 text-muted-foreground">
                    <li>Go to: <Button variant="link" className="h-auto p-0 text-xs" asChild>
                      <a href="https://developers.facebook.com/apps/" target="_blank" rel="noopener noreferrer">
                        developers.facebook.com/apps <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button></li>
                    <li>Click Create App → Choose Business App</li>
                    <li>Under Add Products, choose WhatsApp</li>
                  </ul>
                </div>

                <div className="border-l-2 border-green-200 pl-3">
                  <h5 className="font-medium text-sm">🔹 Step 3: Configure WhatsApp App</h5>
                  <ul className="text-xs space-y-1 mt-1 text-muted-foreground">
                    <li>Generate test phone number (sandbox)</li>
                    <li>Add verified sender phone number</li>
                    <li>Add recipient phone numbers for testing</li>
                    <li>Test with Graph API Explorer or Postman</li>
                  </ul>
                </div>

                <div className="border-l-2 border-green-200 pl-3">
                  <h5 className="font-medium text-sm">🔹 Step 4: Generate API Keys</h5>
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    <Badge variant="outline" className="justify-center text-xs">Phone Number ID</Badge>
                    <Badge variant="outline" className="justify-center text-xs">Business Account ID</Badge>
                    <Badge variant="outline" className="justify-center text-xs">Permanent Access Token</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Section */}
      <Card className="border-orange-200">
        <CardHeader className="bg-orange-50">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Shield className="h-5 w-5" />
            🔐 Store Securely
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            Use these credentials inside your backend (e.g., Firebase Functions, Node.js server, or Lovable.dev integrations). 
            Make sure to encrypt and protect them. Never expose API keys in frontend code.
          </p>
        </CardContent>
      </Card>

      {/* Feature Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            💡 Feature Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Feature</th>
                  <th className="text-center p-2 font-medium">Microsoft Graph API</th>
                  <th className="text-center p-2 font-medium">WhatsApp Business Cloud API</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b">
                  <td className="p-2">Call/meeting scheduling</td>
                  <td className="p-2 text-center">
                    <Badge variant="default" className="bg-green-100 text-green-800">✅ Fully supported</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge variant="outline" className="bg-gray-100">❌ Not applicable</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Messaging</td>
                  <td className="p-2 text-center">
                    <Badge variant="default" className="bg-green-100 text-green-800">✅ Teams chat, channels</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge variant="default" className="bg-green-100 text-green-800">✅ 1-on-1 & group via Cloud API</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Media/file sharing</td>
                  <td className="p-2 text-center">
                    <Badge variant="default" className="bg-green-100 text-green-800">✅ Teams files</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge variant="default" className="bg-green-100 text-green-800">✅ PDFs, images, voice notes</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Chatbots</td>
                  <td className="p-2 text-center">
                    <Badge variant="default" className="bg-green-100 text-green-800">✅ Via Azure Bot Service</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge variant="default" className="bg-green-100 text-green-800">✅ Via Webhooks</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">CRM note syncing</td>
                  <td className="p-2 text-center">
                    <Badge variant="default" className="bg-green-100 text-green-800">✅ Meeting/chat summaries</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge variant="default" className="bg-green-100 text-green-800">✅ Message content capture</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="border-yellow-200">
        <CardHeader className="bg-yellow-50">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Key className="h-5 w-5" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• <strong>Business verification</strong> is required for WhatsApp to go live in production</li>
            <li>• <strong>Message templates</strong> must be approved by Meta for proactive WhatsApp messaging</li>
            <li>• <strong>OAuth 2.0 flow</strong> is required for Microsoft Graph API authentication</li>
            <li>• <strong>Webhook setup</strong> is needed to receive WhatsApp messages in real-time</li>
            <li>• <strong>Rate limits</strong> apply to both APIs - implement proper error handling</li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          For additional support, consult the official Microsoft Graph API and Meta WhatsApp Business documentation.
        </p>
      </div>
    </div>
  );
};

export default TeamsWhatsAppSetupGuide;
