export interface ErrorItem {
    severity: string;
    message: string;
}

export type DataKey = 'id' | 'errors' | 'zipcode' | 'city' | 'street' | 'phone' | 'email' | 'name';

export interface DataItem {
    id: string;
    errors: Record<string, ErrorItem>;
    zipcode: string;
    city: string;
    street: string;
    phone: string;
    email: string;
    name: string;
}

export const flattenData = (data: DataItem[]) => {
    return data.map((item: DataItem) => {
        const flattened = { ...item };
    
        (Object.keys(flattened) as DataKey[]).forEach(key => {
            if (key === 'errors') {
                flattened[key] = item.errors;
            } else if (typeof flattened[key] === 'object' && flattened[key] !== null && !Array.isArray(flattened[key])) {
                Object.entries(flattened[key] as Record<string, unknown>).forEach(([nestedKey, nestedValue]) => {
                    (flattened as Record<string, unknown>)[nestedKey] = nestedValue;
                });
                delete flattened[key];
            }
        });

        return flattened;
    });
}