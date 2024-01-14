export interface Parcels {
  id: number;
  parcelName: string; //ชื่อพัสดุ
  classifier: string; //ชื่อหน่วยของพัสดุ
  price: number; //ราคา
  year: Date;
  quantity: number;
}
