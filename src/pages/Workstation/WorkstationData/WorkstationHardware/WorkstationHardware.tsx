type WorkstationHardwareProps = {
  teste: number;
};

export default function WorkstationHardware({ teste } : WorkstationHardwareProps) {
  return (
    <div>
      <h1>WorkstationHardware {teste}</h1>
    </div>
  );
}
