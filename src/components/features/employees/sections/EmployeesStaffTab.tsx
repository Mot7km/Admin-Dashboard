type EmployeeMember = {
  id: string;
  name: string;
  role: string;
  branch: string;
  status: 'Clocked In' | 'Clocked Out';
  shift: string;
};

type EmployeesStaffTabProps = {
  employees: EmployeeMember[];
  nameLabel: string;
  roleLabel: string;
  branchLabel: string;
  statusLabel: string;
  shiftLabel: string;
  clockedInLabel: string;
  clockedOutLabel: string;
};

const EmployeesStaffTab = ({ employees, nameLabel, roleLabel, branchLabel, statusLabel, shiftLabel, clockedInLabel, clockedOutLabel }: EmployeesStaffTabProps) => {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[var(--color-border)] bg-[var(--surface)] font-semibold text-[var(--text-muted)]">
            <tr>
              <th className="p-3">{nameLabel}</th>
              <th className="p-3">{roleLabel}</th>
              <th className="p-3">{branchLabel}</th>
              <th className="p-3">{statusLabel}</th>
              <th className="p-3">{shiftLabel}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-[var(--elevated)]/40 transition">
                <td className="p-3 font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold flex items-center justify-center text-xs">
                    {employee.name.charAt(0)}
                  </div>
                  <span>{employee.name}</span>
                </td>
                <td className="p-3 text-[var(--text-secondary)] font-medium">{employee.role}</td>
                <td className="p-3 text-[var(--text-muted)]">{employee.branch}</td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      employee.status === 'Clocked In'
                        ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20'
                        : 'bg-slate-500/10 text-slate-400'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${employee.status === 'Clocked In' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    {employee.status === 'Clocked In' ? clockedInLabel : clockedOutLabel}
                  </span>
                </td>
                <td className="p-3 font-mono text-[var(--text-muted)]">{employee.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesStaffTab;
