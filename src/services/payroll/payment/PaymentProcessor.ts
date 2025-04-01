
import { Employee } from "@/types/employee";
import { PayStub } from "../paystub/PayStubGenerator";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export interface PaymentRecord {
  id: string;
  employeeId: string;
  payStubId: string;
  amount: number;
  currency: string;
  status: "Pending" | "Processing" | "Completed" | "Failed";
  paymentMethod: "Direct Deposit" | "Check" | "Other";
  bankInfo?: {
    bankName: string;
    routingNumber: string;
    accountNumber: string;
    accountType: string;
  };
  transactionId?: string;
  processedAt?: string;
  createdAt: string;
  errorMessage?: string;
}

export const PAYMENTS_TABLE = "payments";

/**
 * Processes payment for an employee based on pay stub
 */
export const processPayment = async (
  employee: Employee,
  payStub: PayStub
): Promise<PaymentRecord | null> => {
  try {
    // Validate employee bank information
    if (!employee.bankInfo) {
      toast({
        title: "Payment Error",
        description: "Employee bank information is missing. Payment cannot be processed.",
        variant: "destructive",
      });
      return null;
    }

    // Create the payment record
    const paymentRecord: Omit<PaymentRecord, "id"> = {
      employeeId: employee.id,
      payStubId: payStub.id,
      amount: payStub.netPay,
      currency: "USD", // Default currency
      status: "Pending",
      paymentMethod: "Direct Deposit",
      bankInfo: employee.bankInfo,
      createdAt: new Date().toISOString(),
    };

    // In a real system, we would integrate with a payment processor API
    // For this demo, we'll simulate a successful payment
    const simulatedSuccess = true;

    if (simulatedSuccess) {
      paymentRecord.status = "Completed";
      paymentRecord.processedAt = new Date().toISOString();
      paymentRecord.transactionId = `txn_${Date.now()}`;

      // Store the payment record in the database
      const { data, error } = await supabase
        .from(PAYMENTS_TABLE)
        .insert([paymentRecord])
        .select()
        .single();

      if (error) {
        console.error("Error storing payment record:", error);
        throw error;
      }

      toast({
        title: "Payment Processed",
        description: `Payment of ${payStub.netPay.toFixed(2)} successfully processed for ${employee.name}`,
      });

      return data as PaymentRecord;
    } else {
      // Simulate payment failure
      paymentRecord.status = "Failed";
      paymentRecord.errorMessage = "Simulated payment failure";

      // Store the failed payment record
      const { data, error } = await supabase
        .from(PAYMENTS_TABLE)
        .insert([paymentRecord])
        .select()
        .single();

      toast({
        title: "Payment Failed",
        description: "There was an error processing the payment. Please try again.",
        variant: "destructive",
      });

      return data as PaymentRecord;
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    toast({
      title: "Payment Error",
      description: "There was an error processing the payment. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Processes payments in bulk for multiple employees
 */
export const processBulkPayments = async (
  paymentData: Array<{employee: Employee, payStub: PayStub}>
): Promise<{
  successful: number,
  failed: number,
  payments: PaymentRecord[]
}> => {
  const results = {
    successful: 0,
    failed: 0,
    payments: [] as PaymentRecord[]
  };

  for (const { employee, payStub } of paymentData) {
    const paymentResult = await processPayment(employee, payStub);
    if (paymentResult) {
      if (paymentResult.status === "Completed") {
        results.successful++;
      } else {
        results.failed++;
      }
      results.payments.push(paymentResult);
    } else {
      results.failed++;
    }
  }

  return results;
};

/**
 * Gets payment history for an employee
 */
export const getEmployeePaymentHistory = async (employeeId: string): Promise<PaymentRecord[]> => {
  try {
    const { data, error } = await supabase
      .from(PAYMENTS_TABLE)
      .select("*")
      .eq("employeeId", employeeId)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching payment history:", error);
      return [];
    }

    return data as PaymentRecord[];
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return [];
  }
};
