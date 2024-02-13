export type Id = number;
export type Rating = number;
export type Description = string;

export type FeatureItem = {
  vendorCode: string;
  category: CameraCategory;
  type: CameraType;
  level: CameraLevel;
}

export type Item = {
  id: Id;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type Camera = Item & FeatureItem &{
description: Description;
price: number;
rating: Rating;
reviewCount: number;
}

type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная'

type CameraCategory = 'Видеокамера' | 'Фотоаппарат'

type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный'

export type TabType = 'feature' | 'description';
