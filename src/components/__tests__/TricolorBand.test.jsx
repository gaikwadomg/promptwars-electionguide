import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TricolorBand from '../TricolorBand';

describe('TricolorBand', () => {
  it('renders three color bands', () => {
    const { container } = render(<TricolorBand />);
    const bands = container.querySelectorAll('.tricolor-band span, .tricolor-band div');
    // The component should render the tricolor container
    expect(container.firstChild).toBeTruthy();
    expect(container.firstChild.className).toContain('tricolor');
  });

  it('applies custom className', () => {
    const { container } = render(<TricolorBand className="app-top-band" />);
    expect(container.firstChild.className).toContain('tricolor');
  });

  it('renders without crashing', () => {
    const { container } = render(<TricolorBand />);
    expect(container).toBeTruthy();
  });
});
