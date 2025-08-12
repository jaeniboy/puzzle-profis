import { renderHook, act } from '@testing-library/react';
import { test, expect } from 'vitest';
import { useTouchDrag } from './useTouchDrag';

test('useTouchDrag initializes with correct default values', () => {
  const { result } = renderHook(() => useTouchDrag());
  
  expect(result.current.dragData).toBe(null);
  expect(result.current.isDragging).toBe(false);
  expect(result.current.dragPosition).toEqual({ x: 0, y: 0 });
});

test('useTouchDrag sets dragging state on touch start', () => {
  const { result } = renderHook(() => useTouchDrag());
  
  const mockTouchEvent = {
    preventDefault: () => {},
    touches: [{ clientX: 100, clientY: 200 }]
  } as any;
  
  act(() => {
    result.current.handleTouchStart(mockTouchEvent, 'availablePart', 0, 'test-piece');
  });
  
  expect(result.current.isDragging).toBe(true);
  expect(result.current.dragData).toEqual({
    type: 'availablePart',
    index: 0,
    piece: 'test-piece'
  });
  expect(result.current.dragPosition).toEqual({ x: 100, y: 200 });
});

test('useTouchDrag updates position on touch move', () => {
  const { result } = renderHook(() => useTouchDrag());
  
  // Start dragging first
  const mockStartEvent = {
    preventDefault: () => {},
    touches: [{ clientX: 100, clientY: 200 }]
  } as any;
  
  act(() => {
    result.current.handleTouchStart(mockStartEvent, 'availablePart', 0, 'test-piece');
  });
  
  // Move
  const mockMoveEvent = {
    preventDefault: () => {},
    touches: [{ clientX: 150, clientY: 250 }]
  } as any;
  
  act(() => {
    result.current.handleTouchMove(mockMoveEvent);
  });
  
  expect(result.current.dragPosition).toEqual({ x: 150, y: 250 });
});

test('useTouchDrag resets state on touch end', () => {
  const { result } = renderHook(() => useTouchDrag());
  
  // Start dragging first
  const mockStartEvent = {
    preventDefault: () => {},
    touches: [{ clientX: 100, clientY: 200 }]
  } as any;
  
  act(() => {
    result.current.handleTouchStart(mockStartEvent, 'availablePart', 0, 'test-piece');
  });
  
  // End without finding a drop target
  const mockEndEvent = {
    preventDefault: () => {},
    changedTouches: [{ clientX: 150, clientY: 250 }]
  } as any;
  
  // Mock document.elementFromPoint to return null
  const originalElementFromPoint = document.elementFromPoint;
  document.elementFromPoint = () => null;
  
  act(() => {
    result.current.handleTouchEnd(mockEndEvent);
  });
  
  expect(result.current.isDragging).toBe(false);
  expect(result.current.dragData).toBe(null);
  expect(result.current.dragPosition).toEqual({ x: 0, y: 0 });
  
  // Restore original function
  document.elementFromPoint = originalElementFromPoint;
});
