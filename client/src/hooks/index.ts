// hooks.ts
import { useDispatch as reduxUseDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/index';
import { useContext } from "react";
import { SocketContext } from "../context/Socket";

export const useAppDispatch = () => reduxUseDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook for using socket context
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
      throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

