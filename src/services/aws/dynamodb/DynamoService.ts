
import { lambdaApi } from '../../backend-api/LambdaApiClient';
import { USER_MANAGEMENT_LAMBDA } from '../config';

/**
 * Service for database operations through Lambda
 * No direct database access from frontend - everything goes through Lambda APIs
 */
export class DynamoService {
  /**
   * Query items with tenant isolation
   */
  async query<T>(tableName: string, queryParams: any): Promise<T[]> {
    const result = await lambdaApi.invoke<
      { tableName: string; queryParams: any },
      { items: T[] }
    >(
      USER_MANAGEMENT_LAMBDA,
      'queryTable',
      { tableName, queryParams }
    );
    
    return result.items;
  }
  
  /**
   * Get a single item by ID with tenant isolation
   */
  async getItem<T>(tableName: string, id: string): Promise<T | null> {
    const result = await lambdaApi.invoke<
      { tableName: string; id: string },
      { item: T | null }
    >(
      USER_MANAGEMENT_LAMBDA,
      'getItem',
      { tableName, id }
    );
    
    return result.item;
  }
  
  /**
   * Create an item with tenant isolation
   */
  async createItem<T>(tableName: string, item: any): Promise<T> {
    const result = await lambdaApi.invoke<
      { tableName: string; item: any },
      { item: T }
    >(
      USER_MANAGEMENT_LAMBDA,
      'createItem',
      { tableName, item }
    );
    
    return result.item;
  }
  
  /**
   * Update an item with tenant isolation
   */
  async updateItem<T>(tableName: string, id: string, updates: any): Promise<T> {
    const result = await lambdaApi.invoke<
      { tableName: string; id: string; updates: any },
      { item: T }
    >(
      USER_MANAGEMENT_LAMBDA,
      'updateItem',
      { tableName, id, updates }
    );
    
    return result.item;
  }
  
  /**
   * Delete an item with tenant isolation
   */
  async deleteItem(tableName: string, id: string): Promise<boolean> {
    const result = await lambdaApi.invoke<
      { tableName: string; id: string },
      { success: boolean }
    >(
      USER_MANAGEMENT_LAMBDA,
      'deleteItem',
      { tableName, id }
    );
    
    return result.success;
  }
}

// Export a singleton instance
export const dynamoService = new DynamoService();
