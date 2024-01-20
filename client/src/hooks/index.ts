// hooks.ts
import { useDispatch as reduxUseDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/index';
import { AgoraContext } from '../AgoraManager/agoraManager';
import { useContext } from 'react';

export const useAppDispatch = () => reduxUseDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook to access the Agora context
export const useAgoraContext = () => {
    const context = useContext(AgoraContext);
    if (!context) throw new Error('useAgoraContext must be used within an AgoraProvider');
    return context;
};

