import { useQuery } from "@tanstack/react-query";
import { toastManager } from "~/components/ui/toast";
import { getApiPatientsProfile } from "../../../generated";
import { QUERY_KEYS } from "../constants";

function getProfile(type: "patient" | "doctor" | "admin") {
    switch (type) {
        case "patient":
            return getApiPatientsProfile();
        case "doctor":
        // return getDoctorProfile();
        case "admin":
        // return getAdminProfile();
        default:
            throw new Error("Invalid profile type");
    }
}

export const getProfileQuery = ({ type, enabled = true }: { type: "patient" | "doctor" | "admin", enabled?: boolean }) => useQuery({
    queryKey: [QUERY_KEYS.PROFILE, type],
    queryFn: async () => {
        let res = await getProfile(type);

        if (res.error) {
            toastManager.add({
                title: (res.error as any).title || "Error",
                description: String((res.error as any)?.detail),
            });

            return null;
        }

        return res.data;
    },
    enabled
});
