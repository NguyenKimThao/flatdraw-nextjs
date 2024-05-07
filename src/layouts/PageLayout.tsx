import React, { useEffect, useState } from 'react';

import Overlay from '~/components/Overlay';
import useCollectionApi from '~/hooks/useCollectionApi';
import useColorApi from '~/hooks/useColorApi';
import useUserStore, { StatusAuthen } from '~/hooks/useUserStore';

import CanvasLayout from './CanvasLayout';


export default function PageLayout() {
  const loading = useCollectionApi((state) => state.loading);
  const fetchCollection = useCollectionApi((state) => state.fetchCollection);
  const colorLoading = useColorApi((state) => state.loading);



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cid = urlParams.get('cid');
    let collectionId = 0;
    try {
      collectionId = parseInt(cid + '');
    } catch (error) { /* empty */ }

    if (!collectionId) {
      loading();
    } else {
      fetchCollection(collectionId);
    }
    colorLoading();

  }, []);

  return (
    <>
      <Overlay />
      <CanvasLayout />
    </>
  );
}
