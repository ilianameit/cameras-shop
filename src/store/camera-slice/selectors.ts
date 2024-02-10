import { NameSpace } from '../../const/const';
import { State } from '../../types/state';

export const getCameras = (state: State) => state[NameSpace.Camera].cameras;
export const getPromo = (state: State) => state[NameSpace.Camera].promo;
export const getStatusLoadingCameras = (state: State) => state[NameSpace.Camera].loadingCameras;
