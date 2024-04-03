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

export type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная'

export type CameraCategory = 'Видеокамера' | 'Фотоаппарат'

export type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный'

export type TabType = 'feature' | 'description';

export type Review = ReviewAdding & {
  id: string;
  createAt: string;
}

export type ReviewAdding = {
  cameraId: Id;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type Breadcrumb = {
  title: string;
  href?: string;
}

export type SortTypeName = 'sortPrice' | 'sortPopular';
export type SortTypeState = {
  [Key in SortTypeName]: string;
};

export type SortTypeBy = 'up' | 'down';
export type SortTypeByState = {
  [Key in SortTypeBy]: string;
};

export type KeyFilters = 'cat' | 'type' | 'lvl';

export type CameraCategoryParams = 'photocamera' | 'videocamera';
export type CameraTypeParams = 'digital' | 'film' | 'snapshot' | 'collection';
export type CameraLevelParams = 'zero' | 'non-professional' | 'professional';

export type Filters = CameraCategory | CameraType | CameraLevel;
export type FiltersParams = CameraCategoryParams | CameraTypeParams | CameraLevelParams;

export type PriceFilterType = 'from' | 'to';
export type InitialPriceType = {
  from: Camera['price'];
  to: Camera['price'];
};

export type CameraBasket = Camera & {
  count: number;
};

export type CouponName = 'camera-333' | 'camera-444' | 'camera-555';
export type Promocode = {
  coupon: CouponName | null;
  discount: number;
};
export type OrderData = {
  camerasIds: Id[];
  coupon: CouponName | null;
};
