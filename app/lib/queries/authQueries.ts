import { useQuery } from "@tanstack/react-query";
import { getApiPatientsProfile } from "../../../generated";
import { QUERY_KEYS } from "../constants";

function getProfile(type: "patient" | "doctor" | "admin") {
    switch (type) {
        case "patient":
            return getApiPatientsProfile({
                throwOnError: true
            });
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


        return res.data;
    },
    enabled
});
