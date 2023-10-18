export interface Item {
  Id: number;
  Name: string;
  ProductCategoryName: string;
  ProductCategoryType: string;
  QuantityType: string;
  DefaultLabTestingState: string;
  UnitOfMeasureName: string;
  ApprovalStatus: string;
  ApprovalStatusDateTime: string;
  StrainId: number;
  StrainName: string;
  AdministrationMethod: string;
  UnitCbdPercent: number | null;
  UnitCbdContent: number | null;
  UnitCbdContentUnitOfMeasureName: string | null;
  UnitCbdContentDose: number | null;
  UnitCbdContentDoseUnitOfMeasureName: string | null;
  UnitThcPercent: number | null;
  UnitThcContent: number | null;
  UnitThcContentUnitOfMeasureName: string | null;
  UnitThcContentDose: number | null;
  UnitThcContentDoseUnitOfMeasureName: string | null;
  UnitVolume: number | null;
  UnitVolumeUnitOfMeasureName: string | null;
  UnitWeight: number | null;
  UnitWeightUnitOfMeasureName: string | null;
  ServingSize: string;
  SupplyDurationDays: number | null;
  NumberOfDoses: number | null;
  UnitQuantity: number | null;
  UnitQuantityUnitOfMeasureName: string | null;
  PublicIngredients: string;
  Description: string;
  ProductImages: {
    FileSystemId: number;
  }[];
  LabelImages: {
    FileSystemId: number;
  }[];
  PackagingImages: {
    FileSystemId: number;
  }[];
  IsUsed: boolean;
}
export interface Query {
  quantity_type?: string;
  strain_name?: string;
  product_category_name?: string;
  name?: string;
}
