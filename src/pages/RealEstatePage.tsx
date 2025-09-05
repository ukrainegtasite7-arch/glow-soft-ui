import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RealEstatePage = () => {
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
              <span className="bg-gradient-primary bg-clip-text text-transparent">Нерухомість</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Купівля та оренда комерційної та житлової нерухомості
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж бізнесу</h3>
              <p className="text-muted-foreground mb-4">
                Готовий бізнес та комерційні об'єкти нерухомості
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж квартир</h3>
              <p className="text-muted-foreground mb-4">
                Нові та вторинні квартири в різних районах міста
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж приватних будинків</h3>
              <p className="text-muted-foreground mb-4">
                Приватні будинки з ділянками в передмісті та за містом
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Оренда теплиць</h3>
              <p className="text-muted-foreground mb-4">
                Промислові теплиці для сільськогосподарської діяльності
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealEstatePage;
