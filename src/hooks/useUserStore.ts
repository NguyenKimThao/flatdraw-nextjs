import { create } from 'zustand';
import ApiService from '~/service';

export enum StatusAuthen {
    LOADING = "LOADING",
    LOGIN = "LOGIN",
    AUTHENTING = "AUTHENTING",
    AUTHENTICATED = "AUTHENTICATED",
    LOGOUT = "LOGOUT",
}


const useUserStore = create<{
    statusAuthen: StatusAuthen;
    errorAuthen: string,
    name: string,
    username: string,
    userId: number,
    email: string,
    setStatus: (statusAuthen: StatusAuthen) => void;
    loading: () => void;
    login: (username: string, password: string) => void;
    logout: () => void;
}>((set) => ({
    statusAuthen: StatusAuthen.LOADING,
    errorAuthen: '',
    name: '',
    username: '',
    userId: 0,
    email: '',
    loading: async () => {
        let data = await ApiService.getUserInfo();
        if (data == null || data.error != 0 || !data.data) {
            set({
                statusAuthen: StatusAuthen.LOGIN,
            });
        } else {
            let user = data.data;
            set({
                statusAuthen: StatusAuthen.AUTHENTICATED,
                ...user
            });
        }
    },
    setStatus: (statusAuthen: StatusAuthen) => set((state) => ({ ...state, statusAuthen })),
    login: async (username: string, password: string) => {
        set({
            statusAuthen: StatusAuthen.AUTHENTING,
        })
        let data = await ApiService.login(username, password)
        if (data == null || data.error != 0 || !data.data) {
            set({
                statusAuthen: StatusAuthen.LOGIN,
                errorAuthen: data?.message || 'Unkown Authen'
            });
        } else {
            let user = data.data;
            set({
                statusAuthen: StatusAuthen.AUTHENTICATED,
                ...user
            });
        }
    },
    logout: (): void => {
        set({
            statusAuthen: StatusAuthen.LOGOUT,
            name: '',
            email: '',
        });
        ApiService.logout()
    }
}));

export default useUserStore;


// const useUserStore = create((set) => ({
//     isAuthenticated: false,
//     name: null,
//     email: null,

//     // You can have async methods in the store
//     login: async () => {
//         const user = await getUser();

//         set({
//             isAuthenticated: true,
//             ...user,
//         });

//         // You can even pass a promise to the set, for example:
//         // const response = await getUser();
//         // set(await response.json());
//     },
//     logout: () => {
//         set({
//             isAuthenticated: false,
//             name: null,
//             email: null,
//         });
//     }
// }));
// export default useUserStore;
