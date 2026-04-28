import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AshokaChakra from '../AshokaChakra';

describe('AshokaChakra', () => {
  it('renders SVG element', () => {
    const { container } = render(<AshokaChakra />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders with correct default size', () => {
    const { container } = render(<AshokaChakra />);
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('60');
    expect(svg.getAttribute('height')).toBe('60');
  });

  it('renders with custom size', () => {
    const { container } = render(<AshokaChakra size={100} />);
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('100');
    expect(svg.getAttribute('height')).toBe('100');
  });

  it('has spinning class when spinning prop is true', () => {
    const { container } = render(<AshokaChakra spinning={true} />);
    const svg = container.querySelector('svg');
    expect(svg.className.baseVal).toContain('animate-spin-slow');
  });

  it('does not have spinning class when spinning is false', () => {
    const { container } = render(<AshokaChakra spinning={false} />);
    const svg = container.querySelector('svg');
    expect(svg.className.baseVal).not.toContain('animate-spin-slow');
  });

  it('renders 24 spokes', () => {
    const { container } = render(<AshokaChakra />);
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBe(24);
  });

  it('renders center dot', () => {
    const { container } = render(<AshokaChakra />);
    const circles = container.querySelectorAll('circle');
    // Outer circle + inner circle + center dot + 24 dots = 27 total
    expect(circles.length).toBe(27);
  });

  it('applies custom className', () => {
    const { container } = render(<AshokaChakra className="test-class" />);
    const svg = container.querySelector('svg');
    expect(svg.className.baseVal).toContain('test-class');
  });
});
