import { NameSpace } from '../../const/const';
import { State } from '../../types/state';

export const getIsModalActiveStatus = (state: State) => state[NameSpace.App].isModalActive;
