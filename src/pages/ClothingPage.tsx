import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ClothingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Одяг</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Стильний одяг та аксесуари для сучасного життя
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж одягу</h3>
              <p className="text-muted-foreground mb-4">
                Якісний одяг для чоловіків, жінок та дітей
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж аксесуарів</h3>
              <p className="text-muted-foreground mb-4">
                Стильні аксесуари для доповнення вашого образу
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж рюкзаків</h3>
              <p className="text-muted-foreground mb-4">
                Функціональні рюкзаки для роботи, навчання та подорожей
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClothingPage;
