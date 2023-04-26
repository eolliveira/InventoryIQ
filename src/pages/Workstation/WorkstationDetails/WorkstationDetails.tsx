type WorkstationDetailsProps = {
  teste: number;
};

export default function WorkstationDetails({ teste } : WorkstationDetailsProps) {
  return (
    <div>
      <h1>WorkstationDetails{teste}</h1>
    </div>

  );
}
