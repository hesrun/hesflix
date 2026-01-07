'use client';

import { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    size: 'xxlarge' | 'default' | 'small' | 'large';
    onClose: () => void;
    children: ReactNode;
    title?: string;
    className?: string;
}

export default function Modal({
    isOpen,
    size = 'default',
    onClose,
    children,
    title,
    className = '',
}: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getSizeClass = () => {
        switch (size) {
            case 'small':
                return 'max-w-sm';
            case 'large':
                return 'max-w-4xl';
            case 'xxlarge':
                return 'max-w-4xl md:max-w-7xl';
            default:
                return 'max-w-2xl';
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-slate-800/20 z-40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className={`fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto`}
            >
                <div
                    className={`bg-gray-900 ${getSizeClass()} w-full rounded-lg shadow-2xl ${className}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {title && (
                        <div className="flex items-center justify-between px-4 py-2 bg-amber-500 border-b text-black">
                            <h2 className="text-xl font-semibold ">{title}</h2>
                            <button
                                onClick={onClose}
                                className=" hover:opacity-50 transition-colors text-2xl leading-none cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                    <div className={title ? '' : 'relative'}>
                        {!title && (
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl leading-none z-10"
                            >
                                ✕
                            </button>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
