import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
// @ts-ignore
import heroImage from '../assets/images/regenerated_image_1782965830196.jpg';

const heroCandidates = [
  heroImage,
  // 1. Original (capital I's)
  "https://plain-weur-prod-public.komododecks.com/202606/30/bEzS91xFWtFqIIqxYvEx/image.png",
  // 2. Original (lowercase l's)
  "https://plain-weur-prod-public.komododecks.com/202606/30/bEzS91xFWtFqllqxYvEx/image.png",
  // 3. Original (one, one)
  "https://plain-weur-prod-public.komododecks.com/202606/30/bEzS91xFWtFq11qxYvEx/image.png",
  // 4. Original (capital I and lowercase l)
  "https://plain-weur-prod-public.komododecks.com/202606/30/bEzS91xFWtFqIlqxYvEx/image.png",
  // 5. Original (lowercase l and capital I)
  "https://plain-weur-prod-public.komododecks.com/202606/30/bEzS91xFWtFqlIqxYvEx/image.png",
  // 6. July 1st (capital I's) - in case of timezone shift
  "https://plain-weur-prod-public.komododecks.com/202607/01/bEzS91xFWtFqIIqxYvEx/image.png",
  // 7. July 1st (lowercase l's)
  "https://plain-weur-prod-public.komododecks.com/202607/01/bEzS91xFWtFqllqxYvEx/image.png",
  // 8. June 29th (capital I's)
  "https://plain-weur-prod-public.komododecks.com/202606/29/bEzS91xFWtFqIIqxYvEx/image.png",
  // 9. June 29th (lowercase l's)
  "https://plain-weur-prod-public.komododecks.com/202606/29/bEzS91xFWtFqllqxYvEx/image.png",
  // 10. JPEG variations
  "https://plain-weur-prod-public.komododecks.com/202606/30/bEzS91xFWtFqIIqxYvEx/image.jpg",
  "https://plain-weur-prod-public.komododecks.com/202606/30/bEzS91xFWtFqIIqxYvEx/image.jpeg",
  "https://plain-weur-prod-public.komododecks.com/202606/30/bEzS91xFWtFqllqxYvEx/image.jpg",
  "https://plain-weur-prod-public.komododecks.com/202606/30/bEzS91xFWtFqllqxYvEx/image.jpeg",
  // 11. Premium Unsplash wellness fallback image if everything else fails
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
];

export default function HeroSection({ onFindCareClick }: { onFindCareClick: () => void }) {
  const [imgSrcIndex, setImgSrcIndex] = useState(0);
  return (
    <section className="relative pt-2 pb-0 px-2 sm:px-4 max-w-[1600px] mx-auto mt-2">
      <div className="relative rounded-[2.5rem] overflow-hidden min-h-[600px] lg:h-[85vh] lg:min-h-[680px] py-12 lg:py-0 flex items-center shadow-soft bg-gradient-to-br from-[#E0F2FE] via-[#F0FDFA] to-[#DCFCE7] border border-[#DCE8E2]/50">
        
        {/* Subtle Decorative Background Blobs for an elegant look */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-12 -right-12 w-96 h-96 rounded-full bg-brand-green/10 blur-3xl pointer-events-none"></div>
        

        <div className="relative z-10 w-full px-6 md:px-10 lg:px-12 grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-10 lg:gap-12">
          <div className="md:col-span-7 lg:col-span-7 max-w-2xl">
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-extrabold text-brand-dark leading-[1.05] tracking-tight mb-6 mt-4 md:mt-0 lg:mt-12"
            >
              Where Emotional<br />
              <span className="text-brand-blue">
                Balance
              </span> Meets <br />
              <span className="text-brand-green">
                Expert Care
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-brand-dark/80 mb-8 sm:mb-10 max-w-lg font-medium leading-relaxed"
            >
              At BalanceCare Health Services, we go beyond traditional mental health treatment. Our multidisciplinary approach supports your mind, body, and emotional well-being safely.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button 
                type="button"
                onClick={onFindCareClick}
                className="bg-gradient-to-r from-brand-green to-brand-blue hover:from-brand-greenHover hover:to-brand-blueHover text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-brand-blue/20 text-base cursor-pointer text-center inline-block"
              >
                FIND CARE
              </button>
              
              <a 
                href="#about" 
                className="inline-flex items-center justify-center gap-2 border border-brand-dark/20 hover:border-brand-dark/40 bg-white/25 hover:bg-white/40 backdrop-blur-sm text-brand-dark font-bold py-4 px-8 rounded-full transition-all text-sm"
              >
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Image Card */}
          <div className="md:col-span-5 lg:col-span-5 relative h-[260px] sm:h-[360px] md:h-[380px] lg:h-[480px] w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/60 shadow-xl"
            >
              <img 
                src={heroCandidates[imgSrcIndex]} 
                alt="BalanceCare Health Mental Wellness Professional Consultant" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (imgSrcIndex < heroCandidates.length - 1) {
                    setImgSrcIndex(imgSrcIndex + 1);
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 to-transparent"></div>
            </motion.div>
            
            {/* Elegant Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-4 left-4 lg:-left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-neutral-100 flex items-center gap-3"
            >
              <div>
                <p className="text-xs font-bold text-brand-dark">Clinical Excellence</p>
                <p className="text-[10px] text-brand-muted">Top Rated Wellness Advisors</p>
              </div>
            </motion.div>
          </div>
        </div>



      </div>
    </section>
  );
}
