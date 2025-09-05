import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AutomobilesPage = () => {
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
              <span className="bg-gradient-primary bg-clip-text text-transparent">Автомобілі</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Широкий вибір автомобілів, вантажівок та автомобільних аксесуарів
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж Автомобілі</h3>
              <p className="text-muted-foreground mb-4">
                Нові та вживані автомобілі різних марок та моделей
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж вантажівок</h3>
              <p className="text-muted-foreground mb-4">
                Комерційний транспорт для бізнесу та вантажоперевезень
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж Вініли</h3>
              <p className="text-muted-foreground mb-4">
                Декоративні покриття та тюнінг для автомобілів
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж Деталі</h3>
              <p className="text-muted-foreground mb-4">
                Запчастини та комплектуючі для всіх типів автомобілів
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Продаж Номера</h3>
              <p className="text-muted-foreground mb-4">
                Номерні знаки та реєстраційні документи
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Оренда автомобіля</h3>
              <p className="text-muted-foreground mb-4">
                Короткострокова та довгострокова оренда легкових авто
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutomobilesPage;
