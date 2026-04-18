import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("layouts/ProtectedRoute.tsx", [
        route("auth-success", "routes/AuthSuccess.tsx"),
        layout("layouts/ProfileNeededRoute.tsx", [
            route("new-appointment", "routes/NewAppointment.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
