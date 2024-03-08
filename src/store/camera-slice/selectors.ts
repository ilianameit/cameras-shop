import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { State } from '../../types/state';
import { SortTypeBy, SortTypeName } from '../../types/types';

export const getCameras = (state: State) => state[NameSpace.Camera].cameras;
export const getPromo = (state: State) => state[NameSpace.Camera].promo;
export const getStatusLoadingCameras = (state: State) => state[NameSpace.Camera].loadingCameras;

export const getOneCamera = (state: State) => state[NameSpace.Camera].oneCamera;
export const getStatusLoadingOneCamera = (state: State) => state[NameSpace.Camera].loadingOneCamera;

export const getSimilarCameras = (state: State) => state[NameSpace.Camera].similarCameras;

export const getSortedCameras = createSelector(
  [
    (_: State, sortingType: SortTypeName | '', sortingBy: SortTypeBy | '') => ({sortingType, sortingBy}),
    getCameras
  ],
  ({sortingType, sortingBy}, cameras) => {
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
