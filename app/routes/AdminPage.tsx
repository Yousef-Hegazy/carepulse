import { Link } from "react-router";
import StatCard from "~/components/StatCard";

export default function AdminPage() {
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
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Start the day with managing new appointments</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="scheduled"
            count={5}
            label="Scheduled Appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={5}
            label="Pending Appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={5}
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
      </main>
    </div>
  );
}
