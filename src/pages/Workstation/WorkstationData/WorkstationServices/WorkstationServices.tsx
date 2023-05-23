type WorkstationMaintenanceProps = {
  teste: number;
};

export default function WorkstationMaintenance({ teste } : WorkstationMaintenanceProps) {
  return (
    <div>
      <h1>WorkstationMaintenance {teste}</h1>
    </div>
  );
}
