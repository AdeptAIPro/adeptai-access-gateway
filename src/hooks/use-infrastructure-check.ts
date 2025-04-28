
import { handleError, ErrorType } from "@/utils/error-handler";

export interface InfrastructureStatus {
  ready: boolean;
  issues: string[];
  lastChecked: string;
}

// Mock functions to simulate AWS infrastructure checks
const checkAwsCredentials = async (): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 500);
  });
};

const checkAwsInfrastructure = async (): Promise<{ready: boolean, issues: string[]}> => {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      ready: true,
      issues: []
    }), 700);
  });
};

export const useInfrastructureCheck = (hasAwsCredentials: boolean) => {
  const checkBackendStatus = async (): Promise<boolean> => {
    try {
      if (hasAwsCredentials) {
        return await checkAwsCredentials();
      }
      return false;
    } catch (error) {
      handleError({
        type: ErrorType.API,
        message: "Failed to check backend status",
        userFriendlyMessage: "Failed to connect to backend services",
        originalError: error
      }, true);
      return false;
    }
  };

  const checkInfrastructure = async (): Promise<InfrastructureStatus> => {
    try {
      if (!hasAwsCredentials) {
        return {
          ready: false,
          issues: ["AWS credentials not configured"],
          lastChecked: new Date().toISOString()
        };
      }
      
      const { ready, issues } = await checkAwsInfrastructure();
      
      return {
        ready,
        issues,
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      handleError({
        type: ErrorType.INFRASTRUCTURE,
        message: "Failed to check infrastructure status",
        userFriendlyMessage: "Unable to verify AWS infrastructure readiness",
        originalError: error
      }, true);
      
      return {
        ready: false,
        issues: ["Error checking infrastructure status"],
        lastChecked: new Date().toISOString()
      };
    }
  };

  return {
    checkBackendStatus,
    checkInfrastructure
  };
};
