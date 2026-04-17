/**
 * Latest Version Used: Redux Toolkit 2.11.2, React 19.2.5
 * File Purpose: Typed Redux Hooks for Application-wide Usage
 */

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
