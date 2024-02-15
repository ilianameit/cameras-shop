import { NameSpace } from '../../const/const';
import { State } from '../../types/state';

export const getReviews = (state: State) => state[NameSpace.Review].reviews;
