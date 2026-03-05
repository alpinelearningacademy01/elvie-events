const clients = [
  "Palazzo Versace Dubai",
  "Jumeirah Al Qasr",
  "Proxperts",
  "Dubai Airport Freezone",
  "Dubai Holding",
  "Riverland Dubai",
];

const ElvieClients = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-wider uppercase">
          Featured Clients
        </h2>
        <p className="mt-3 text-muted-foreground">
          Big names, bigger results. See who's onboard.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client) => (
            <div
              key={client}
              className="flex items-center justify-center h-20 px-4 border border-border rounded-lg"
            >
              <span className="text-sm font-semibold text-muted-foreground tracking-wider text-center">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElvieClients;
