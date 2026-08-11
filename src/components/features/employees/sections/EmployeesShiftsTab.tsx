type ShiftMember = {
  id: string;
  name: string;
  role: string;
  shift: string;
};

type EmployeesShiftsTabProps = {
  members: ShiftMember[];
  title: string;
};

const EmployeesShiftsTab = ({ members, title }: EmployeesShiftsTabProps) => {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
      <h2 className="text-base font-bold text-[var(--text-primary)]">{title}</h2>
      <div className="space-y-3 text-xs">
        {members.map((member) => (
          <div key={member.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[var(--text-primary)]">{member.name} ({member.role})</span>
              <span className="font-mono text-[var(--primary)] font-bold">{member.shift}</span>
            </div>
            <div className="h-3 w-full bg-[var(--elevated)] rounded-full overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-[20%] right-[30%] bg-[var(--primary)] rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesShiftsTab;