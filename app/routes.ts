import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("layouts/ProtectedRoute.tsx", [
        route("auth-success", "routes/AuthSuccess.tsx"),
        route("new-patient", "routes/NewPatientPage.tsx"),
        route("admin", "routes/AdminPage.tsx"),
        layout("layouts/ProfileRequiredRoute.tsx", [
            ...prefix("appointments", [
                route("new", "routes/NewAppointment.tsx"),
                route("success", "routes/AppointmentSuccess.tsx"),
            ])
        ]),
    ]),
] satisfies RouteConfig;
