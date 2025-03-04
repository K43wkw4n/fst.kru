import { personnel } from './Personnel';
import { Budgets } from './Budgets';
import { Category } from './Category';

export interface RAP {
  id: number;
  name: string;
  description: string;
  image: string;
  pdf: string;
  isUsed: boolean;
  createdAt: Date;
  year: Date;
  budgetAmount: number;
  expertise: string;
  participant: string; 
  hidden: boolean;
  personnelId: number;
  personnel:personnel; 
  budgetId: number;
  budget: Budgets;
  categoryId:number;
  category: Category;
}
