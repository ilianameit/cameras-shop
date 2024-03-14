import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { State } from '../../types/state';
import { Camera, CameraCategory, CameraLevel, CameraType, SortTypeBy, SortTypeName } from '../../types/types';

export const getCameras = (state: State) => state[NameSpace.Camera].cameras;
export const getPromo = (state: State) => state[NameSpace.Camera].promo;
export const getStatusLoadingCameras = (state: State) => state[NameSpace.Camera].loadingCameras;

export const getOneCamera = (state: State) => state[NameSpace.Camera].oneCamera;
export const getStatusLoadingOneCamera = (state: State) => state[NameSpace.Camera].loadingOneCamera;

export const getSimilarCameras = (state: State) => state[NameSpace.Camera].similarCameras;

export const getPriceFilteredCameras = (state: State) => state[NameSpace.Camera].camerasFilteredByPrice;

export const getSortedCameras = createSelector(
  [
    (cameras: Camera[], sortingType: SortTypeName | '' | 'null', sortingBy: SortTypeBy | '' | 'null') => ({sortingType, sortingBy, cameras})
  ],
  ({sortingType, sortingBy, cameras}) => {
    switch (sortingType) {
      case 'sortPrice':
        if(sortingBy === 'up') {
          return cameras.slice().sort((a, b) => a.price - b.price);
        }
        return cameras.slice().sort((a, b) => b.price - a.price);
      case 'sortPopular':
        if(sortingBy === 'up') {
          return cameras.slice().sort((a, b) => a.reviewCount - b.reviewCount);
        }
        return cameras.slice().sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return cameras;
    }
  }
);

export const getFilteredCameras = createSelector(
  [
    (
      cameras: Camera[],
      filterCategory: CameraCategory | '' | 'null' | undefined | string,
      filterType: CameraType | '' | 'null' | undefined | string, filterLevel: CameraLevel | '' | 'null' | undefined | string
    ) => ({filterCategory, filterType, filterLevel, cameras})
  ],
  ({filterCategory, filterType, filterLevel, cameras}) => cameras
    .filter((camera) => {
      if(!filterCategory || filterCategory === 'null') {
        return true;
      }
      return camera.category === filterCategory;
    })
    .filter((camera) => {
      if(!filterType || filterType === 'null') {
        return true;
      }
      return camera.type === filterType;
    })
    .filter((camera) => {
      if(!filterLevel || filterLevel === 'null') {
        return true;
      }
      return camera.level === filterLevel;
    })
);
