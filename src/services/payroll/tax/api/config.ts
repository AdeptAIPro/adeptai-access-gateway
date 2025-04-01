
/**
 * Configuration for tax agency APIs
 */

// Configuration for different tax agencies
export const TAX_AGENCIES = {
  USA: {
    FEDERAL: {
      name: "IRS",
      apiEndpoint: "https://api.irs.gov/tax-rates",
      testEndpoint: "https://api.irs.gov/test/tax-rates"
    },
    STATES: {
      "California": {
        name: "California Franchise Tax Board",
        apiEndpoint: "https://api.ftb.ca.gov/tax-rates",
        testEndpoint: "https://api.ftb.ca.gov/test/tax-rates"
      },
      "New York": {
        name: "New York Department of Taxation and Finance",
        apiEndpoint: "https://api.tax.ny.gov/tax-rates",
        testEndpoint: "https://api.tax.ny.gov/test/tax-rates"
      }
    }
  },
  INDIA: {
    FEDERAL: {
      name: "Income Tax Department of India",
      apiEndpoint: "https://api.incometaxindiaefiling.gov.in/tax-rates",
      testEndpoint: "https://api.incometaxindiaefiling.gov.in/test/tax-rates"
    }
  }
};
