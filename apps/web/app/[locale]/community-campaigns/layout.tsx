type Props = {
  children: React.ReactNode;
};
const CommunityCampaignsLayout = ({ children }: Props) => {
  return (
    <section className="w-full">
      <div className="flex flex-col w-full mb-30">{children}</div>
    </section>
  );
};

export default CommunityCampaignsLayout;
