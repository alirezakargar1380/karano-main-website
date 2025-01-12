'use client';

import { useEffect, useState } from 'react';
import { endpoints, server_axios } from 'src/utils/axios';
import { useRouter, useSearchParams } from 'src/routes/hooks';

export default function PriceListView() {
    const router = useRouter();

    const [isDownloading, setIsDownloading] = useState(false);
    
    useEffect(() => {
        const downloadPriceList = async () => {
            if (isDownloading) return;
            
            setIsDownloading(true);
            
            try {
                const response = await server_axios.get(endpoints.settings.price_list, {
                    responseType: 'blob'
                });

                const url = window.URL.createObjectURL(
                    new Blob([response.data], { type: 'application/pdf' })
                );
                
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'price-list.pdf');
                link.click();
                
                window.URL.revokeObjectURL(url);
                
            } catch (error) {
                console.error('Download failed:', error);
            }
        };

        downloadPriceList();
    }, [isDownloading]);

    return (
        <div>
            <h1>در حال دانلود لیست قیمت کارانو...</h1>
        </div>
    );
}