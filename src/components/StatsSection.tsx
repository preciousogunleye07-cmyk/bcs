import React from 'react';
import { motion } from 'motion/react';
import { Users, Heart, Award } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      id: 'stat-community',
      value: '1000+',
      label: 'Community Growth',
      desc: 'Active individuals supported across the region',
      icon: Users,
    },
    {
      id: 'stat-impact',
      value: '95%',
      label: 'Positive Impact',
      desc: 'Reported improvement in clinical outcomes',
      icon: Heart,
    },
  ];

  return (
    <section className="py-16 bg-brand-bg relative z-20 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto border-b border-neutral-200/80 pb-16">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white/40 rounded-2xl border border-white/50"
            >
              <div className="w-10 h-10 rounded-full bg-brand-sage/30 flex items-center justify-center text-brand-dark mb-4">
                <IconComponent className="w-5 h-5 text-brand-coral" />
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-2 tracking-tight flex items-baseline gap-1">
                {stat.value}
              </h3>
              <p className="text-brand-dark font-bold text-xs uppercase tracking-wider mb-1.5">
                {stat.label}
              </p>
              <p className="text-brand-muted text-xs leading-relaxed max-w-xs font-medium">
                {stat.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
