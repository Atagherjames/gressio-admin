declare module 'sonner' {
  import * as React from 'react';

  export interface ToastT {
    id: number | string;
    title?: string | React.ReactNode;
    type?: string;
    icon?: React.ReactNode;
    message?: string | React.ReactNode;
    description?: React.ReactNode;
    action?: {
      label: string | React.ReactNode;
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    };
    cancel?: {
      label: string | React.ReactNode;
      onClick?: () => void;
    };
    onDismiss?: (toast: ToastT) => void;
    onAutoClose?: (toast: ToastT) => void;
    dismissible?: boolean;
    duration?: number;
    delete?: boolean;
    important?: boolean;
    actionButtonStyle?: React.CSSProperties;
    cancelButtonStyle?: React.CSSProperties;
    className?: string;
    style?: React.CSSProperties;
    unstyled?: boolean;
  }

  export type ExternalToast = Omit<ToastT, 'id' | 'type' | 'title'> & {
    id?: number | string;
    description?: React.ReactNode;
  };

  export interface ToastFunction {
    (message: string | React.ReactNode, data?: ExternalToast): string | number;
    message: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    success: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    info: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    warning: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    error: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
    custom: (jsx: (id: number | string) => React.ReactElement, data?: ExternalToast) => string | number;
    promise: <ToastData>(
      promise: Promise<ToastData> | (() => Promise<ToastData>),
      data?: any
    ) => string | number;
    dismiss: (id?: number | string) => string | number;
    loading: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  }

  export const toast: ToastFunction;

  export interface ToasterProps {
    invert?: boolean;
    theme?: 'light' | 'dark' | 'system';
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    hotkey?: string[];
    richColors?: boolean;
    expand?: boolean;
    duration?: number;
    gap?: number;
    visibleToasts?: number;
    closeButton?: boolean;
    toastOptions?: any;
    className?: string;
    style?: React.CSSProperties;
    offset?: string | number;
    dir?: 'ltr' | 'rtl' | 'auto';
  }

  export const Toaster: React.FC<ToasterProps>;
}
