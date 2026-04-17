import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
    getApiPatientsProfile,
    postApiAuthLogin,
    postApiAuthRefresh,
    postApiAuthRegister,
    type AccessTokenResponse,
    type LoginRequest,
    type PatientResponse,
    type RefreshRequest,
    type RegisterRequest
} from '../generated';

export interface AuthState {
    profile: PatientResponse | null;
    auth: AccessTokenResponse | null;
    isAuthenticated: () => boolean;
    setProfile: (profile: PatientResponse | null) => void;
    setAuth: (auth: AccessTokenResponse | null) => void;
    login: (request: LoginRequest) => Promise<AccessTokenResponse | null>;
    register: (request: RegisterRequest) => Promise<AccessTokenResponse | null>;
    logout: () => void;
    refresh: (request: RefreshRequest) => Promise<AccessTokenResponse | null>;
    getUserProfile: () => Promise<PatientResponse | null>;
}

const createAuthStore: StateCreator<AuthState> = function (set, get) {
    return {
        profile: null,
        auth: null,
        isAuthenticated() {
            return !!get().auth?.accessToken;
        },
        setProfile(profile) {
            set({ profile });
        },
        setAuth(auth) {
            set({ auth });
        },
        async login(request) {
            try {
                const res = await postApiAuthLogin({ body: request });
                if (res.error) {
                    throw res.error;
                }
                const auth = res.data || null;
                set({ auth });
                return auth;
            } catch (error) {
                set({ auth: null });
                throw error;
            }
        },
        async register(request) {
            try {
                const res = await postApiAuthRegister({ body: request });

                if (res.error?.errors) {
                    throw new Error(Object.values(res.error.errors).flat().join(' '));
                }

                if (res.error) {
                    throw res.error;
                }

                if (res.status === 200) {
                    return get().login({
                        email: request.email,
                        password: request.password
                    });
                }
            } catch (error) {
                set({ auth: null });
                throw error;
            }

            return get().auth;
        },
        logout() {
            set({ auth: null, profile: null });
        },
        async refresh(request) {
            try {
                const res = await postApiAuthRefresh({ body: request });
                if (res.error) {
                    throw res.error;
                }
                const auth = res.data || null;
                set({ auth });
                return auth;
            } catch (error) {
                set({ auth: null });
                throw error;
            }
        },
        async getUserProfile() {
            if (!get().auth?.accessToken) {
                set({ profile: null });
                return null;
            }

            try {
                const res = await getApiPatientsProfile();
                if (res.error) {
                    throw res.error;
                }
                const profile = res.data || null;
                set({ profile });
                return profile;
            } catch (error) {
                set({ profile: null });
                throw error;
            }
        }
    };
};

export const useAuthStore = create<AuthState>()(persist(createAuthStore, {
    name: "authStore",
    storage: createJSONStorage(() => localStorage)
}));
