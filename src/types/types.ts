export type Id = number;
export type Rating = number;
export type Item = {
  id: Id;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type Camera = Item & {
vendorCode: string;
type: CameraType;
category: CameraCategory;
description: string;
level: CameraLevel;
price: number;
rating: Rating;
reviewCount: number;
}

type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная'

type CameraCategory = 'Видеокамера' | 'Фотоаппарат'

type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный'
