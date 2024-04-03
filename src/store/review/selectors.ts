import { NameSpace } from '../../const/const';
import { State } from '../../types/state';

export const getReviews = (state: State) => state[NameSpace.Review].reviews;
export const getStatusLoadingReview = (state: State) => state[NameSpace.Review].isLoadingReview;
export const getAddReviewSuccessStatus = (state: State) => state[NameSpace.Review].isAddReviewSuccess;
