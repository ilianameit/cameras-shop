import { NameSpace } from '../../const/const';
import { State } from '../../types/state';

export const getCameras = (state: State) => state[NameSpace.Camera].cameras;
export const getPromo = (state: State) => state[NameSpace.Camera].promo;
export const getStatusLoadingCameras = (state: State) => state[NameSpace.Camera].loadingCameras;

export const getOneCamera = (state: State) => state[NameSpace.Camera].oneCamera;
export const getStatusLoadingOneCamera = (state: State) => state[NameSpace.Camera].loadingOneCamera;

export const getSimilarCameras = (state: State) => state[NameSpace.Camera].similarCameras;
