import { render, screen } from '@testing-library/react';

import { mockCamera } from '../../../utils/mocks';
import FeatureTabContent from './feature-tab-content';


describe('Component Feature tab component', () => {
  it('should render component', () => {
    render(<FeatureTabContent vendorCode={mockCamera.vendorCode} category={mockCamera.category} type={mockCamera.type} level={mockCamera.level}/>);

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });

});
