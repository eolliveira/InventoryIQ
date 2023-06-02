type WorkstationSoftwareProps = {
  teste: number;
};

export default function WorkstationSoftware({ teste } : WorkstationSoftwareProps) {
  return (
    <div>
      <h1>WorkstationSoftware {teste}</h1>
    </div>
  );
}
