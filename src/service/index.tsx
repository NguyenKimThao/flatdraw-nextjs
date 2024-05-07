import type { MapColorBoxType } from '~/config/types';
import { CollectionItem, DataResponse, ListCollectionResponse, ListLayerResponse, UserInfoResponse, BoxLayerObject } from '~/config/types';
import { fetchData, postData } from '~/service/http';

const API_URL = "http://localhost:8010"

const ApiService = {
  getUserInfo: (): Promise<DataResponse<UserInfoResponse>> => {
    return fetchData(`${API_URL}/api/get_info`)
  },
  login: (username: string, password: string): Promise<DataResponse<UserInfoResponse>> => {
    return postData(`${API_URL}/api/login`, {}, { username, password });
  },
  logout: (): Promise<DataResponse<any>> => {
    return postData(`${API_URL}/api/logout`, {}, {});
  },
  getCollections: (): Promise<DataResponse<ListCollectionResponse>> => {
    return fetchData(`${API_URL}/api/get_collections`);
  },
  getCollection: (id: number): Promise<DataResponse<CollectionItem>> => {
    return fetchData(`${API_URL}/api/get_collection`, { id });
  },
  createCollection: (name: string, info: string, desc: string): Promise<DataResponse<CollectionItem>> => {
    return postData(`${API_URL}/api/create_collection`, {}, { name, info, desc });
  },
  deleteCollection: (id: number): Promise<DataResponse<CollectionItem>> => {
    return postData(`${API_URL}/api/delete_collection`, {}, { id });
  },
  getLayers: (collectionId: number): Promise<DataResponse<ListLayerResponse>> => {
    return fetchData(`${API_URL}/api/get_layers`, { collectionId });
  },
  updatVersionLayers: (collectionId: number, layers: BoxLayerObject[]): Promise<DataResponse<ListLayerResponse>> => {
    return postData(`${API_URL}/api/update_version_layer`, { collectionId }, { layers });
  },
  getColors: (): Promise<DataResponse<MapColorBoxType>> => {
    return fetchData(`${API_URL}/api/get_colors`, {});
  },
  updateColor: (color: MapColorBoxType): Promise<DataResponse<MapColorBoxType>> => {
    return postData(`${API_URL}/api/get_colors`, { color }, {});
  },
}
export default ApiService;
