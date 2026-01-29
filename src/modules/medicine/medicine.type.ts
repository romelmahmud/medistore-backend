export type MedicineUpdateType = {
  name?: string;
  description?: string;
  stock?: number;
  price?: number;
  manufacturer?: string;
  dosage?: string;
  imageUrl?: string;
  manufactureDate?: Date;
  expireDate?: Date;
  isActive?: boolean;
};
