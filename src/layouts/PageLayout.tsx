import React, { useEffect, useState } from 'react';

import Overlay from '~/components/Overlay';
import useUserStore, { StatusAuthen } from '~/hooks/useUserStore';
import CanvasLayout from './CanvasLayout';
import useCollectionApi from '~/hooks/useCollectionApi';

export default function PageLayout() {
    const [first, setFirst] = useState<boolean>(false);
    const loading = useCollectionApi((state) => state.loading);
    const fetchCollection = useCollectionApi((state) => state.fetchCollection);

    useEffect(() => {
        if (first) {
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const cid = urlParams.get('cid');
        let collectionId = 0;
        try {
            collectionId = parseInt(cid + "");
        } catch (error) {

        }

        if (!collectionId) {
            loading();
        } else {
            fetchCollection(collectionId);
        }
        setFirst(true);
    }, [first])

    return (
        <>
            <Overlay />
            <CanvasLayout />
        </>
    );
}
