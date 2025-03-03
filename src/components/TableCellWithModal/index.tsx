import { ReactElement, useCallback, useState } from "react";
import { Modal } from "../Modal";

export const TableCellWithModal = ({ children, color, modalContent, modalTitle }: { children?: React.ReactNode; color?: string; errorMessage?: string, modalContent?: ReactElement | null, modalTitle?: string }) => {
    const [showModal, setShowModal] = useState(false)
    const onClose = useCallback(
        () => {
            setShowModal(false)
        }, []
    )

    const clickRow = useCallback(
        () => {
            setShowModal(true)
        }, []
    )

    return <td className={`w-12 h-full  border-r border-gray-300 cursor-pointer  ${color}`} onClick={clickRow}>
    <>
    {
        children
    }
    {modalContent && <Modal showModal={showModal} onClose={onClose} title={modalTitle}>{modalContent}</Modal>}
    </>
    </td>
}