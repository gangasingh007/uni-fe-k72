const StatItem = ({ icon, label, value, color = "text-white" }: { icon: React.ReactNode, label: string, value: string, color?: string }) => (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white/5 rounded-lg text-white/30">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-white/30 font-bold leading-tight mb-0.5">{label}</p>
        <p className={`text-sm font-mono font-medium ${color}`}>{value}</p>
      </div>
    </div>
  );

  export default StatItem;