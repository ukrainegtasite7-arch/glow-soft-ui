import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-soft overflow-hidden">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">Найкращі ціни в Україні</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Найкраща{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                платформа
              </span>
              <br />для оголошень
            </h1>

            <p className="text-lg text-muted-foreground max-w-md">
              Розмістіть своє оголошення швидко та зручно. Від автомобілів до нерухомості - 
              знайдіть або продайте все що потрібно.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="btn-accent rounded-2xl group"
                onClick={() => window.location.href = '/categories'}
              >
                Переглянути категорії
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-2xl border-border hover:bg-background-secondary"
              >
                Створити оголошення
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-2xl font-bold text-primary">5К+</div>
                <div className="text-sm text-muted-foreground">Активних користувачів</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1К+</div>
                <div className="text-sm text-muted-foreground">Оголошень щодня</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Підтримка клієнтів</div>
              </div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Floating Cards */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-8 -left-8 bg-card rounded-3xl p-6 shadow-soft-lg border border-border/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-accent rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Висока якість</div>
                    <div className="text-sm text-muted-foreground">Перевірені оголошення</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -1, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-8 -right-8 bg-card rounded-3xl p-6 shadow-soft-lg border border-border/50"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">Швидко</div>
                  <div className="text-sm text-muted-foreground">Розміщення оголошень</div>
                </div>
              </motion.div>

              {/* Main Visual */}
              <div className="bg-gradient-primary rounded-3xl p-12 glow-accent-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-background/20 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="w-full h-16 bg-background/30 rounded-xl"></div>
                  </div>
                  <div className="bg-background/20 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="w-full h-16 bg-background/30 rounded-xl"></div>
                  </div>
                  <div className="col-span-2 bg-background/20 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="w-full h-20 bg-background/30 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;