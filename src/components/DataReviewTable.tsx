// components/DataReview.tsx

import { useEffect, useState } from "react";
import { Table } from "./Table";
import { flattenData, DataItem, DataKey } from "@/src/helpers/flattenData";
import { CSVExportButton } from "./CSVExportButton";
export default function DataReviewTable() {

    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => setData(flattenData(data?.records)))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const columns: { key: DataKey; label: string }[] = [
        {
            key: 'name',
            label: 'Name'
        },
        {
            key: 'email',
            label: 'Email'
        },
        {
            key: 'phone',
            label: 'Phone'
        },
        {
            key: 'street',
            label: 'Street'
        },
        {
            key: 'city',
            label: 'City'
        },
        {
            key: 'zipcode',
            label: 'Zip Code'
        },
    ]

    return (
        <div className="w-auto max-w-[840px] overflow-x-scroll border-2 border-gray-300 rounded-md">
            <div className="flex justify-between items-center border-b border-gray-300 py-4">
                <h1 className="text-2xl p-2">Data Review</h1>
                <CSVExportButton data={data} columns={columns} />
            </div>
            {data && <Table
                data={data}
                columns={columns}
            />}
        </div>
    );
}
