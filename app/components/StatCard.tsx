import { cn } from "~/lib/utils";

type Props = {
  type: "scheduled" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export default function StatCard({ type, count, label, icon }: Props) {
  return (
    <div
      className={cn("stat-card", {
        "bg-appointments": type === "scheduled",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <img src={icon} height={32} width={32} alt={label} className="h-8 w-fit" />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
}
