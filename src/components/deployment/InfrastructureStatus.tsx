
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Download, Server, Cloud, GitBranch, AlertCircle, Check } from 'lucide-react';
import { checkAwsInfrastructure } from '@/services/aws/AwsConfigService';
import { getInfrastructureReport, InfrastructureRequirement } from '@/services/aws/InfrastructureService';
import { getAvailableCICDPipelines, generateCICDPipeline } from '@/services/deployment/CICDService';
import { useCredentials } from '@/context/CredentialsContext';
import { toast } from 'sonner';

const InfrastructureStatus = () => {
  const { credentials, isBackendReady } = useCredentials();
  const [activeTab, setActiveTab] = useState('infrastructure');
  const [infrastructureReport, setInfrastructureReport] = useState<{
    ready: boolean;
    missingComponents: InfrastructureRequirement[];
    cloudFormationTemplate?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (credentials?.aws) {
      checkInfrastructure();
    }
  }, [credentials?.aws]);

  const checkInfrastructure = async () => {
    setIsLoading(true);
    try {
      const report = await getInfrastructureReport();
      setInfrastructureReport(report);
    } catch (error) {
      console.error('Error checking infrastructure:', error);
      toast.error('Failed to check infrastructure status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = (template: string, filename: string) => {
    const blob = new Blob([template], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${filename} downloaded successfully`);
  };

  const handleDownloadCICDTemplate = async (provider: 'github' | 'aws-codepipeline') => {
    try {
      const { success, template, filename } = await generateCICDPipeline(provider);
      
      if (success && template) {
        handleDownloadTemplate(template, filename);
      } else {
        toast.error('Failed to generate CI/CD template');
      }
    } catch (error) {
      console.error('Error generating CI/CD template:', error);
      toast.error('Failed to generate CI/CD template');
    }
  };

  if (!credentials?.aws) {
    return (
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>AWS credentials required</AlertTitle>
        <AlertDescription>
          Please configure your AWS credentials to check infrastructure status.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Deployment & Infrastructure
        </CardTitle>
        <CardDescription>
          Manage your AWS infrastructure and CI/CD pipelines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="infrastructure">
              <Cloud className="h-4 w-4 mr-2" />
              Infrastructure
            </TabsTrigger>
            <TabsTrigger value="cicd">
              <GitBranch className="h-4 w-4 mr-2" />
              CI/CD Pipeline
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="infrastructure">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">AWS Infrastructure Status</h3>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={checkInfrastructure}
                  disabled={isLoading}
                >
                  {isLoading ? 'Checking...' : 'Refresh'}
                </Button>
              </div>
              
              {infrastructureReport ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <span>Status:</span>
                    {infrastructureReport.ready ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Missing Resources
                      </Badge>
                    )}
                  </div>
                  
                  {infrastructureReport.missingComponents.length > 0 && (
                    <Alert variant="warning" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Missing AWS Resources</AlertTitle>
                      <AlertDescription>
                        <p className="mb-2">The following resources are required but not found:</p>
                        <ul className="list-disc list-inside">
                          {infrastructureReport.missingComponents.map((component) => (
                            <li key={component.name} className="ml-2">
                              {component.type === 'bucket' ? 'S3 Bucket:' : 'DynamoDB Table:'} {component.name}
                            </li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Download CloudFormation template to create required resources:
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => 
                        handleDownloadTemplate(
                          infrastructureReport.cloudFormationTemplate || '',
                          'adeptai-infrastructure.yml'
                        )
                      }
                      disabled={!infrastructureReport.cloudFormationTemplate}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CloudFormation Template
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  {isLoading ? (
                    <p>Checking infrastructure status...</p>
                  ) : (
                    <p>Click 'Refresh' to check AWS infrastructure status</p>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="cicd">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">CI/CD Pipeline Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Download CI/CD pipeline configuration templates for your project:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GitHub Actions</CardTitle>
                    <CardDescription>
                      CI/CD workflow using GitHub Actions with AWS deployment
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownloadCICDTemplate('github')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Config
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>AWS CodePipeline</CardTitle>
                    <CardDescription>
                      Full AWS-native CI/CD pipeline using CodeBuild and CodePipeline
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownloadCICDTemplate('aws-codepipeline')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Config
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Manual Setup Required</AlertTitle>
                <AlertDescription>
                  After downloading the configuration, you'll need to:
                  <ol className="list-decimal list-inside mt-2">
                    <li className="ml-2">Commit these files to your repository</li>
                    <li className="ml-2">Configure secrets in your CI/CD provider</li>
                    <li className="ml-2">Update deployment bucket names with your own</li>
                  </ol>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InfrastructureStatus;
