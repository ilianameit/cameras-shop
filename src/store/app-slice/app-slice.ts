import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';

type AppStateType = {
  isModalActive: boolean;
}

const initialState: AppStateType = {
  isModalActive: false,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setActiveModal: (state) => {
      state.isModalActive = !state.isModalActive;
      document.body.classList.toggle('scroll-lock');
    }
  },
});

export const {setActiveModal} = appSlice.actions;
