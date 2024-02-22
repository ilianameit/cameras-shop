import { render, screen } from '@testing-library/react';
import DescriptionTabContent from './description-tab-content';
import { mockCamera } from '../../../utils/mocks';


describe('Component Description tab component', () => {
  it('should render component', () => {
    render(<DescriptionTabContent description={mockCamera.description} />);

    expect(screen.getByTestId('text-description')).toBeInTheDocument();
  });

});

