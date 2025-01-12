'use client';

import { useEffect, useState } from 'react';
import { endpoints, server_axios } from 'src/utils/axios';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { BACKEND_API, HOST_API } from 'src/config-global';
import { Button } from '@mui/material';

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
        <div style={{ textAlign: 'center' }}>
            <h1>در حال دانلود لیست قیمت کارانو...</h1>
            <Button component={RouterLink} href={BACKEND_API + endpoints.settings.price_list} variant="soft" color='error'>
                در صورت دانلود نشدن اینجا کلیک کنید
            </Button>
        </div>
    );
}