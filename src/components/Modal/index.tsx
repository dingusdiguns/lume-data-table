import { ReactNode, useCallback } from "react";

export const Modal = (
    { 
        children, 
        showModal, 
        onClose ,
        title
    }: 
    { 
        children: ReactNode, 
        showModal: boolean,
        title?: string,
        onClose?: () => void
    }) => {
      
    const _onClose = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onClose?.();
        }, [onClose]
    )
      
    if( !showModal ){
        return null
    }    


    return (
        <>
       <div 
        className="fixed top-0 w-[100vw] h-[100vh] left-0 bg-black opacity-50 z-20"
            onClick={_onClose}
        />
        <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white min-w-[280px]  z-50 text-black rounded-md">
                <div className="flex justify-between border-b border-gray-300 pb-4 px-4 pt-4">
                    {title && <div className="text-lg font-bold">{title}</div>}
                    <button className=" border border-black rounded-full p-1" onClick={_onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
        </div>
        </>
    ) 
}