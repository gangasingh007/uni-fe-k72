import MarqueeText from './MarqueeText';

const UniversityPartners = () => {
  return (
    <section className="py-20 border-y border-brutal bg-background">
      <div className="mb-12 px-6">
        <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
          Trusted By Leading Institutions
        </p>
      </div>
      <MarqueeText
        text="MIT • Stanford • Harvard • Oxford • IIT • Cambridge • Berkeley • Yale •"
        speed={60}
        className="py-8"
      />
    </section>
  );
};

export default UniversityPartners;
