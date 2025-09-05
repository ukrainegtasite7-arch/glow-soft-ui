import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Про <span className="bg-gradient-primary bg-clip-text text-transparent">Skoropad</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ваш надійний партнер у світі онлайн оголошень та торгівлі
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg hover:border-accent/20 transition-all duration-300 transform-gpu cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-4">Різноманітні категорії</h3>
              <p className="text-muted-foreground">
                Від автомобілів до нерухомості - розмістіть або знайдіть все необхідне
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg hover:border-accent/20 transition-all duration-300 transform-gpu cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-4">Безпека та надійність</h3>
              <p className="text-muted-foreground">
                Модерація оголошень та система рейтингів для вашої безпеки
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg hover:border-accent/20 transition-all duration-300 transform-gpu cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-4">Підтримка 24/7</h3>
              <p className="text-muted-foreground">
                Наша команда завжди готова допомогти вам з розміщенням оголошень
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
