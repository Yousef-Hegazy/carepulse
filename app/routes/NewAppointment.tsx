import { useAuthStore } from "../../stores/authStore";

export default function NewAppointment() {
  const profile = useAuthStore((state) => state.profile);
  return <div>Welcome {profile?.name}</div>;
}
