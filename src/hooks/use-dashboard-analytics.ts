
import { useState, useEffect } from "react";
import { getJobMetrics } from "@/services/dashboard/AnalyticsService";

const useDashboardAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [timeframe, setTimeframe] = useState("month");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const data = await getJobMetrics(timeframe);
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeframe]);

  return {
    analyticsData,
    timeframe,
    setTimeframe,
    isLoading
  };
};

export default useDashboardAnalytics;
