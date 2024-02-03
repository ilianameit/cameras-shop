import { NameSpace } from '../../const/const';
import { State } from '../../types/state';

export const getCameras = (state: State) => state[NameSpace.Camera].cameras;
