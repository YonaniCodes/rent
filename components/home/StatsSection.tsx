const StatsSection = () => {
  const stats = [
    {
      number: "2,500+",
      label: "Properties Listed",
      icon: "🏠",
    },
    {
      number: "15,000+",
      label: "Happy Customers",
      icon: "😊",
    },
    {
      number: "50+",
      label: "Cities Covered",
      icon: "🌍",
    },
    {
      number: "99%",
      label: "Satisfaction Rate",
      icon: "⭐",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold  mb-4">
            Trusted by Thousands of Ethiopians
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Join the largest real estate community in Ethiopia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold  mb-2">{stat.number}</div>
              <div className="font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
