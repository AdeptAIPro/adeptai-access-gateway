
import { handleError, ErrorType } from "@/utils/error-handler";
import { InfrastructureStatus } from "@/types/credentials";
import { checkAwsCredentials, checkAwsInfrastructure } from "@/services/aws/AwsConfigService";

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
