import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    {
      title: 'Автомобілі',
      items: [
        { title: 'Продаж Автомобілі', href: '/automobiles/sale' },
        { title: 'Продаж вантажівок', href: '/automobiles/trucks' },
        { title: 'Продаж Вініли', href: '/automobiles/vinyls' },
        { title: 'Продаж Деталі', href: '/automobiles/parts' },
        { title: 'Продаж Номера', href: '/automobiles/numbers' },
        { title: 'Оренда автомобіля', href: '/automobiles/car-rental' },
        { title: 'Оренда вантажівок', href: '/automobiles/truck-rental' },
      ]
    },
    {
      title: 'Одяг',
      items: [
        { title: 'Продаж одягу', href: '/clothing/sale' },
        { title: 'Продаж аксесуарів', href: '/clothing/accessories' },
        { title: 'Продаж рюкзаків', href: '/clothing/backpacks' },
      ]
    },
    {
      title: 'Нерухомість',
      items: [
        { title: 'Продаж бізнесу', href: '/real-estate/business' },
        { title: 'Продаж квартир', href: '/real-estate/apartments' },
        { title: 'Продаж приватних будинків', href: '/real-estate/houses' },
        { title: 'Оренда теплиць', href: '/real-estate/greenhouses' },
      ]
    },
    {
      title: 'Інше',
      items: [
        { title: 'Різне', href: '/other/misc' },
      ]
    }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-soft' : 'bg-background'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              TechStore
            </motion.div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Пошук товарів..."
                className="pl-10 border-0 bg-background-secondary rounded-2xl focus:glow-accent"
              />
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
              Категорії
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((menu) => (
                  <NavigationMenuItem key={menu.title}>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground bg-transparent">
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4">
                        {menu.items.map((item) => (
                          <NavigationMenuLink key={item.href} asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}
          animate={{
            maxHeight: isMenuOpen ? 1000 : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 pb-2 space-y-3">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Пошук товарів..."
                className="pl-10 border-0 bg-background-secondary rounded-2xl"
              />
            </div>

            <Link
              to="/categories"
              className="block rounded-2xl px-4 py-3 bg-background-secondary text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Категорії
            </Link>
            
            {/* Mobile Categories */}
            <div className="space-y-2">
              {menuItems.map((menu) => (
                <div key={menu.title} className="space-y-1">
                  <div className="font-medium text-foreground px-4 py-2">
                    {menu.title}
                  </div>
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block py-2 px-6 text-muted-foreground hover:text-foreground hover:bg-background-secondary rounded-xl transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;