import { create } from 'zustand';
import { CollectionItem, StatusFetch } from '~/config/types';
import ApiService from '~/service';

const useCollectionApi = create<{
    status: StatusFetch,
    error: string,
    collectionId: number | null,
    collections: CollectionItem[],
    setCollectionId: (collectionId: number | null) => void;
    setStatus: (status: StatusFetch) => void;
    loading: () => void;
    createCollection: (name: string, desc: string) => void;
    deleteCollection: (id: number) => void;
    fetchCollection: (id: number) => void;
}>((set, get) => ({
    status: StatusFetch.LOADING,
    error: '',
    collectionId: null,
    collections: [],
    setCollectionId: (collectionId: number | null) => set((state) => ({ ...state, collectionId: collectionId })),
    setStatus: (status: StatusFetch) => set((state) => ({ ...state, status })),
    loading: async () => {
        let data = await ApiService.getCollections();
        if (data == null || data.error != 0 || !data.data) {
            set({
                status: StatusFetch.FAIL,
            });
        } else {
            let res = data.data;
            set({
                status: StatusFetch.SUCCESS,
                collections: res.collections || []
            });
        }
    },
    fetchCollection: async (id: number) => {
        let data = await ApiService.getCollection(id);
        if (data == null || data.error != 0 || !data.data) {
            set({
                status: StatusFetch.FAIL,
            });
        } else {
            let res = data.data;
            set({
                status: StatusFetch.SUCCESS,
                collectionId: res.id,
                collections: [res]
            });
        }
    },
    createCollection: async (name: string, desc: string) => {
        set((state) => ({
            ...state,
            status: StatusFetch.LOADING,
        }));
        let data = await ApiService.createCollection(name, '{}', desc);
        if (data == null || data.error != 0 || !data.data) {
            set((state) => ({
                ...state,
                status: StatusFetch.FAIL,
            }));
        } else {
            let item = data.data;
            set((state) => ({
                ...state,
                status: StatusFetch.SUCCESS,
                collectionId: item?.id,
                collections: [item]
            }));
        }
    },
    deleteCollection: async (id: number) => {
        set((state) => ({
            ...state,
            status: StatusFetch.LOADING,
        }));
        let data = await ApiService.deleteCollection(id);
        if (data == null || data.error != 0 || !data.data) {
            set((state) => ({
                ...state,
                status: StatusFetch.FAIL,
            }));
        } else {
            let collections = get().collections.filter(e => e.id != id);
            set((state) => ({
                ...state,
                status: StatusFetch.SUCCESS,
                collections: [...collections]
            }));
        }
    }
}));

export default useCollectionApi;
