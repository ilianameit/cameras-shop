import { NameSpace } from '../../const/const';
import { State } from '../../types/state';

export const getPromo = (state: State) => state[NameSpace.Promo].promo;
