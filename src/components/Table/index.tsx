import { TableCellWithModal } from "../TableCellWithModal";
import { DataItem, DataKey } from "@/src/helpers/flattenData";


export const Table = ({ columns, data }: { 
    columns: Array<{ key: DataKey; label: string }>;
    data: DataItem[];
}) => {
    return (
        <div className="relative h-[500px] overflow-auto">
            <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-white z-10 after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-gray-300">
                    <tr className="text-left ">
                        {columns.map((column) => (
                            <th key={column.key} className="p-2 bg-white border-r border-gray-300">{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => {
                        const errors = row.errors;
                        const modalErrorMessages: { severity: string; message: string; column: string }[] = [];

                        Object.keys(errors).forEach((key) => {
                            modalErrorMessages.push({
                                severity: errors[key].severity,
                                message: errors[key].message,
                                column: key
                            })
                        })

                        

                        return<tr key={row.id} className={`border-b border-gray-300`}>
                            {columns.map((column) => {
                                const error = errors[column.key as keyof DataItem];
                                let color = 'bg-green-200';
                                let errorMessage
                                if (error) {
                                    error.severity === "warning" ? color = 'bg-yellow-200' : color;
                                    error.severity === "critical" ? color = 'bg-red-200' : color;
                                    errorMessage = error.message;
                                }
                                return <TableCellWithModal 
                                key={column.key} 
                                color={color} 
                                modalTitle={`Error Summary`}
                                modalContent={
                                    modalErrorMessages.length > 0 ? 
                                    <div className="flex flex-col gap-1"> 
                                        {modalErrorMessages.map((error) => {
                                            let color = 'bg-green-200';
                                            error.severity === "warning" ? color = 'bg-yellow-200' : color;
                                            error.severity === "critical" ? color = 'bg-red-200' : color;
                                            return <div key={error.message}>
                                                <div className="flex flex-cols gap-2">
                                                    <div className={`size-2 rounded-full ${color} my-2 `} />
                                                    <span className="font-bold">{error.column}:{' '}</span>
                                                    <div>{error.message}</div>
                                                </div>
                                            </div>
                                        })}
                                    </div> : 
                                    null
                                }
                                errorMessage={errorMessage}
                                >
                                    <div className="w-full min-h-[32px] relative px-2 py-1">
                                        <div className="w-[150px] border-gray-300 rounded-md overflow-hidden text-ellipsis whitespace-nowrap group w-full min-h-[28px]">
                                            {String(row[column.key as keyof DataItem])}
                                            {errorMessage && (
                                                <div className="absolute hidden group-hover:block rounded-md z-20 top-[100%] left-0  text-black-100 pt-3">
                                                    <div className=" bg-white shadow-md border border-gray-300 rounded-md px-2 py-1 text-sm ">
                                                        <div className="font-bold">{error.severity}</div>
                                                        {errorMessage}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TableCellWithModal>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}