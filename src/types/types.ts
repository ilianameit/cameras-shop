export type Item = {
  id: number;
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
rating: number;
reviewCount: number;
}

type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная'

type CameraCategory = 'Видеокамера' | 'Фотоаппарат'

type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный'
