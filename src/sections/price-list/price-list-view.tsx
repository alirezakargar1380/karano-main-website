'use client';

import { useEffect } from 'react';
import { endpoints, server_axios } from 'src/utils/axios';

export default function PriceListView() {
    useEffect(() => {
        const downloadPriceList = async () => {
            try {
                const response = await server_axios.get(endpoints.settings.price_list, {
                    responseType: 'blob'
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'price-list.pdf';
                link.click();

                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Download failed:', error);
            }
        };

        downloadPriceList();
    }, []);

    return (
        <div>
            <h1>در حال دانلود لیست قیمت کارانو...</h1>
        </div>
    );
}