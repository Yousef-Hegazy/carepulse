import { useNavigate } from "react-router";
import { client } from "../../generated/client.gen";
import { useAuthStore } from "../../stores/authStore";

// interface Props { location: Location<any>, navigate: ReturnType<typeof useNavigate>; authStore: AuthState }

// export function setupInterceptors({ location, navigate, authStore }: Props) {
//     client.instance.interceptors.request.use(function (config) {
//         const token = authStore.auth?.accessToken;

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     });


//     client.instance.interceptors.response.use(
//         function (res) {
//             return Promise.resolve(res);
//         },
//         async function (error) {
//             const originalRequest = error.config as typeof error.config & { _retry?: boolean };


//             if (error.response?.status === 401 && !originalRequest?._retry && location.pathname !== '/') {
//                 originalRequest._retry = true;

//                 try {


//                     if (authStore) {
//                         await authStore.refresh({
//                             refreshToken: authStore.auth?.refreshToken || ''
//                         });

//                         return client.instance(originalRequest);
//                     }
//                 } catch (retryError) {
//                     navigate('/', { replace: true });
//                     return Promise.reject(retryError as Error);
//                 }
//             }

//             return Promise.reject(error as Error);
//         });
// }


client.instance.interceptors.request.use(function (config) {
    const authStore = useAuthStore.getState();
    const token = authStore.auth?.accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


client.instance.interceptors.response.use(
    function (res) {
        return Promise.resolve(res);
    },
    async function (error) {
        const originalRequest = error.config as typeof error.config & { _retry?: boolean };


        if (error.response?.status === 401 && !originalRequest?._retry && location.pathname !== '/') {
            originalRequest._retry = true;

            try {
                const authStore = useAuthStore.getState();


                if (authStore) {
                    await authStore.refresh({
                        refreshToken: authStore.auth?.refreshToken || ''
                    });

                    return client.instance(originalRequest);
                }
            } catch (retryError) {
                const navigate = useNavigate();
                navigate('/', { replace: true });
                return Promise.reject(retryError as Error);
            }
        }

        return Promise.reject(error as Error);
    });