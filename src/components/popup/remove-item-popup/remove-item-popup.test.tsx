import { render, screen } from '@testing-library/react';
import RemoveItemPopup from './remove-item-popup';
import { mockCamera } from '../../../utils/mocks';

describe('Component Remove Item Modal', () => {

  describe('should render correctly', () => {
    const focusElement = { current: document.createElement('button') };
    const camera = mockCamera;
    function onDeleteButtonClick(){
      jest.fn();
    }
    function onContinueButtonClick() {
      jest.fn();
    }

    it('should render buttons', () => {
      render(<RemoveItemPopup camera={camera} focusElement={focusElement} onDeleteButtonClick={onDeleteButtonClick} onContinueButtonClick={onContinueButtonClick}/>);

      expect(screen.getByRole('link', { name: /продолжить покупки/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Удалить/i})).toBeInTheDocument();
    });

  });

});
