import { useCallback } from "react";
import { DataItem, DataKey } from "@/src/helpers/flattenData";

export const CSVExportButton = ({ data, columns }: { 
    data: DataItem[],
    columns: Array<{ key: DataKey; label: string }>;
}) => {
    const handleExport = useCallback(() => {
        const headers = columns.map(column => column.label).filter(Boolean);
        const csvContent = headers.join(',') + '\n' + data.map((row) => {
            return columns.map(column => row[column.key]).join(',');
        }).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();
    }, [data, columns]);

    return (
        <button 
            className="border hover:bg-black hover:border-gray-300 hover:text-white transition-all duration-200 border-black text-black px-4 py-2 rounded-full mr-4" onClick={handleExport}>Export CSV</button>
    )
}