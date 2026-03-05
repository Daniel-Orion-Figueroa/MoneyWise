import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../interfaces/category.interface';
import { Transaction } from '../interfaces/transaction.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly USER_KEY = 'user';
  private readonly TRANSACTIONS_KEY = 'transactions';
  private readonly CATEGORIES_KEY = 'categories';
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly BALANCED_KEY = 'balanced';

  constructor(private storage: Storage) {
    this.storage.create();
  }

  async setItem(key: string, value: any): Promise<void> { //el key es la clave a guardar y el value es el valor que guardamos convertido a JSON
    try {
      await this.storage.set(key, value);
    } catch (error) {
      console.error(`Error guardando ${key}:`, error);
      throw error;
    }
  }

  async getItem(key: string): Promise<any> { //el key es la clave a obtener y el valor devuelto es el valor almacenado convertido de JSON a su tipo original
    try {
      const value = await this.storage.get(key);
      return value;
    } catch (error) {
      console.error(`Error obteniendo ${key}:`, error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> { //el key es la clave a eliminar
    try {
      await this.storage.remove(key);
    } catch (error) {
      console.error(`Error eliminando ${key}:`, error);
      throw error;
    }
  }

  //Limpia TODO el storage
  async clear(): Promise<void> {
    try {
      await this.storage.clear();
    } catch (error) {
      console.error('Error limpiando storage:', error);
      throw error;
    }
  }

  //Metodos para usuarios

  async saveUser(user: User): Promise<void> { //user es el usuario a guardar, se devuelve una promesa si el usuario sse guardo bien
    return this.setItem(this.USER_KEY, user);
  }

  async getUser(): Promise<User | null> { // obtiene el usuario guardado
    return this.getItem(this.USER_KEY);
  }

  async removeUser(): Promise<void> { //Elimina el usuario del storage
    return this.removeItem(this.USER_KEY);
  }

  //Metodos especificos para token de autenticación

  async saveAuthToken(token: string): Promise<void> { //guarda el token (es una cadena de texto que se guarda para autenticar al usuario en futuras solicitudes)
    return this.setItem(this.AUTH_TOKEN_KEY, token);
  }

  async getAuthToken(): Promise<string | null> { //obtiene el token guardado
    return this.getItem(this.AUTH_TOKEN_KEY);
  }

  async removeAuthToken(): Promise<void> { //elimina el token
    return this.removeItem(this.AUTH_TOKEN_KEY);
  }

  //metodos para transaccioones

  async saveTransactions(transactions: Transaction[]): Promise<void> { //guarda un array de transacciones
    return this.setItem(this.TRANSACTIONS_KEY, transactions);
  }

  async getTransactions(): Promise<Transaction[]> { //obtiene el array de transacciones o vacio
    const transactions = await this.getItem(this.TRANSACTIONS_KEY);
    return transactions || [];
  }

  async addTransaction(transaction: Transaction): Promise<void> { //agrega transacciones al array guardado, primero lo obtiene
    const transactions = await this.getTransactions();
    transactions.push(transaction);
    await this.saveTransactions(transactions);
  }

  async updateTransaction(id: string, updatedTransaction: Partial<Transaction>): Promise<void> { //id de la transacción y datos actualizados: acutaliza una transacción existente, primero obtiene el array de transacciones
    const transactions = await this.getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updatedTransaction };
      await this.saveTransactions(transactions);
    }
  }

  async deleteTransaction(id: string): Promise<void> { //id de la transacción a eliminar
    const transactions = await this.getTransactions();
    const filteredTransactions = transactions.filter(t => t.id !== id);
    await this.saveTransactions(filteredTransactions);
  }

  async clearTransactions(): Promise<void> { //elimina todas las transacciones
    return this.removeItem(this.TRANSACTIONS_KEY);
  }

  async saveCategories(categories: Category[]): Promise<void> { //guarda todas las categorias
    return this.setItem(this.CATEGORIES_KEY, categories);
  }

  async getCategories(): Promise<Category[]> { //obtiene el array de categorias
    const categories = await this.getItem(this.CATEGORIES_KEY);
    return categories || [];
  }

  async addCategory(category: Category): Promise<void> { //se agrega una categoria nueva (category)
    const categories = await this.getCategories();
    categories.push(category);
    await this.saveCategories(categories);
  }

  async updateCategory(id: string, updatedCategory: Partial<Category>): Promise<void> {//id de la categoria a actualizar y los datos actualizados, primero obtiene el array de categorias
    const categories = await this.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updatedCategory };
      await this.saveCategories(categories);
    }
  }

  async deleteCategory(id: string): Promise<void> { //id de la categoria a eliminar
    const categories = await this.getCategories();
    const filteredCategories = categories.filter(c => c.id !== id);
    await this.saveCategories(filteredCategories);
  }

  //metodos para balance

  async saveBalance(balance: any): Promise<void> { //balance es un objeto con la información del balance a guardar
    return this.setItem(this.BALANCED_KEY, balance);
  }

  async getBalance(): Promise<any> { //obtiene el balance guardado
    return this.getItem(this.BALANCED_KEY);
  }

  async removeBalance(): Promise<void> { //elimina el balance
    return this.removeItem(this.BALANCED_KEY);
  }
}
