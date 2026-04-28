import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import StatCard from "~/components/StatCard";
import { Skeleton } from "~/components/ui/skeleton";
import { DEFAULT_CACHE_TIME, QUERY_KEYS } from "~/lib/constants";
import { getApiAppointmentsStatistics } from "../../generated";

export default function AdminPage() {
  const {
    data: appointmentStats,
    isPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_STATS],
    queryFn: async () => {
      const res = await getApiAppointmentsStatistics({
        throwOnError: true,
      });
      return res.data;
    },
    staleTime: DEFAULT_CACHE_TIME,
  });

  return (
    <div className="mx-auto flex flex-col max-w-7xl gap-y-14">
      <header className="admin-header">
        <Link to="/" className="cursor-pointer">
          <img src="/assets/icons/logo-full.svg" height={32} width={162} alt="Logo" className="h-8 w-fit" />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Start the day with managing new appointments</p>
        </section>

        <section className="admin-stat">
          {isPending ? (
            <>
              <Skeleton className="w-full h-31.5 rounded-2xl" />
              <Skeleton className="w-full h-31.5 rounded-2xl" />
              <Skeleton className="w-full h-31.5 rounded-2xl" />
            </>
          ) : appointmentStats ? (
            <>
              <StatCard
                type="scheduled"
                count={Number(appointmentStats.scheduledCount)}
                label="Scheduled Appointments"
                icon="/assets/icons/appointments.svg"
              />
              <StatCard
                type="pending"
                count={Number(appointmentStats.pendingCount)}
                label="Pending Appointments"
                icon="/assets/icons/pending.svg"
              />
              <StatCard
                type="cancelled"
                count={Number(appointmentStats.cancelledCount)}
                label="Cancelled Appointments"
                icon="/assets/icons/cancelled.svg"
              />
            </>
          ) : null}
        </section>
      </main>
    </div>
  );
}
