// hooks.ts
import { useDispatch as reduxUseDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/index';

export const useAppDispatch = () => reduxUseDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



