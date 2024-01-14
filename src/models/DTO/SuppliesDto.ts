import { Supplies } from "./../Supplies";

export interface SuppliesDto {
  id: number;
  quantity: number;
  status: number;
  quantityAlreadyWithdrawn: number;
  latestCodeWithdrawn: number;
  suppliesId: number;
  supplies: Supplies;
}
