import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Home, Phone, MessageCircle, Send, Menu,
  ChevronDown, Star, MapPin, TrendingUp, Percent,
  Video, Rotate3D, ArrowRight, Sparkles, Clock,
  Shield, Award, Target, Zap, Heart, Calculator,
  User, Mail, X, Check, Filter, BarChart3,
  Bot
} from 'lucide-react';
import { properties, districts, developers, propertyTypes, propertyClasses, stats } from './data/mockData';
import { Property, FilterState } from './types';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('ru-RU').format(value);
};

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showMortgageCalc, setShowMortgageCalc] = useState(false);
  const [showInvestmentCalc, setShowInvestmentCalc] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 100000000,
    areaMin: 0,
    areaMax: 500,
    districts: [],
    developers: [],
    propertyType: [],
    class: [],
    yieldMin: 0,
    completionDate: ''
  });

  const filteredProperties = properties.filter(p => {
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
    if (p.area < filters.areaMin || p.area > filters.areaMax) return false;
    if (filters.districts.length > 0 && !filters.districts.includes(p.district)) return false;
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(p.type)) return false;
    if (filters.class.length > 0 && !filters.class.includes(p.class)) return false;
    if (filters.yieldMin > 0 && (p.yield || 0) < filters.yieldMin) return false;
    return true;
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CHELYABINSK</h1>
                <p className="text-xs text-yellow-500 tracking-widest">PREMIUM ESTATE</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('catalog')} className="text-gray-300 hover:text-yellow-500 transition-colors">Каталог</button>
              <button onClick={() => scrollToSection('invest')} className="text-gray-300 hover:text-yellow-500 transition-colors">Инвесторам</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-yellow-500 transition-colors">О компании</button>
              <button onClick={() => scrollToSection('contacts')} className="text-gray-300 hover:text-yellow-500 transition-colors">Контакты</button>
              <button onClick={() => setIsQuizOpen(true)} className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105">
                Подобрать за 60 сек
              </button>
            </div>
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black border-t border-white/10">
              <div className="px-4 py-4 space-y-4">
                <button onClick={() => scrollToSection('catalog')} className="block w-full text-left text-gray-300 py-2">Каталог</button>
                <button onClick={() => scrollToSection('invest')} className="block w-full text-left text-gray-300 py-2">Инвесторам</button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left text-gray-300 py-2">О компании</button>
                <button onClick={() => scrollToSection('contacts')} className="block w-full text-left text-gray-300 py-2">Контакты</button>
                <button onClick={() => setIsQuizOpen(true)} className="w-full bg-yellow-600 text-black px-6 py-3 rounded-full font-semibold">Подобрать за 60 сек</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <HeroSection onQuizOpen={() => setIsQuizOpen(true)} onChatOpen={() => setIsChatOpen(true)} />
      <StatsSection />
      <CatalogSection filters={filters} setFilters={setFilters} filteredProperties={filteredProperties} onSelectProperty={setSelectedProperty} />
      <InvestmentSection />
      <AboutSection />
      <ContactsSection />
      <Footer />
      <AIChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} onMortgageCalc={() => { setShowMortgageCalc(true); setShowInvestmentCalc(false); }} onInvestmentCalc={() => { setShowInvestmentCalc(true); setShowMortgageCalc(false); }} />
      <MortgageCalculatorModal isOpen={showMortgageCalc} onClose={() => setShowMortgageCalc(false)} propertyPrice={selectedProperty?.price || 10000000} />
      <InvestmentCalculatorModal isOpen={showInvestmentCalc} onClose={() => setShowInvestmentCalc(false)} propertyPrice={selectedProperty?.price || 10000000} />
      <TelegramFloatingButton />
    </div>
  );
}

function HeroSection({ onQuizOpen, onChatOpen }: { onQuizOpen: () => void; onChatOpen: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block text-yellow-500 text-sm tracking-widest uppercase mb-4">Элитная недвижимость Челябинска</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Подберем лучшую новостройку<br />
            <span className="text-yellow-500">или коммерческую недвижимость</span><br />
            в Челябинске
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Более {formatNumber(stats.totalProperties)} актуальных объектов от застройщиков и собственников
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" /> Подобрать объект
            </button>
            <button onClick={onQuizOpen} className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-4 rounded-full font-semibold text-lg transition-all border border-white/20 flex items-center justify-center gap-2">
              <Calculator className="w-5 h-5" /> Получить инвестиционный расчет
            </button>
            <button onClick={onChatOpen} className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-4 rounded-full font-semibold text-lg transition-all border border-white/20 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" /> Связаться с экспертом
            </button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400'].map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
              <img src={src} alt={`Элитный ЖК ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-yellow-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const statsData = [
    { icon: Home, value: formatNumber(stats.totalProperties), label: 'Объектов в базе', color: 'text-yellow-500' },
    { icon: Percent, value: `${stats.averageYield}%`, label: 'Средняя доходность', color: 'text-green-500' },
    { icon: Check, value: formatNumber(stats.successfulDeals), label: 'Успешных сделок', color: 'text-blue-500' },
    { icon: User, value: formatNumber(stats.activeClients), label: 'Активных клиентов', color: 'text-purple-500' }
  ];
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-colors">
              <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CatalogSection({ filters, setFilters, filteredProperties, onSelectProperty }: { filters: FilterState; setFilters: React.Dispatch<React.SetStateAction<FilterState>>; filteredProperties: Property[]; onSelectProperty: (p: Property) => void }) {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <section id="catalog" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Каталог недвижимости</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Более 1000 актуальных объектов элитной жилой и коммерческой недвижимости</p>
        </div>
        <div className="flex items-center justify-between mb-8">
          <div className="text-gray-400">Найдено <span className="text-yellow-500 font-semibold">{filteredProperties.length}</span> объектов</div>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition-colors">
            <Filter className="w-5 h-5" /> Фильтры
            <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-8 overflow-hidden">
              <div className="bg-black/50 rounded-2xl p-6 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Цена, ₽</label>
                    <div className="flex items-center gap-2">
                      <input type="number" value={filters.priceMin} onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none" placeholder="От" />
                      <span className="text-gray-500">-</span>
                      <input type="number" value={filters.priceMax} onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none" placeholder="До" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Площадь, м²</label>
                    <div className="flex items-center gap-2">
                      <input type="number" value={filters.areaMin} onChange={(e) => setFilters({ ...filters, areaMin: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none" placeholder="От" />
                      <span className="text-gray-500">-</span>
                      <input type="number" value={filters.areaMax} onChange={(e) => setFilters({ ...filters, areaMax: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none" placeholder="До" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Район</label>
                    <select value={filters.districts[0] || ''} onChange={(e) => setFilters({ ...filters, districts: e.target.value ? [e.target.value] : [] })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none">
                      <option value="">Все районы</option>
                      {districts.map(d => (<option key={d.id} value={d.name}>{d.name}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Тип объекта</label>
                    <select value={filters.propertyType[0] || ''} onChange={(e) => setFilters({ ...filters, propertyType: e.target.value ? [e.target.value] : [] })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none">
                      <option value="">Все типы</option>
                      {propertyTypes.map(t => (<option key={t.value} value={t.value}>{t.label}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Класс</label>
                    <select value={filters.class[0] || ''} onChange={(e) => setFilters({ ...filters, class: e.target.value ? [e.target.value] : [] })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none">
                      <option value="">Все классы</option>
                      {propertyClasses.map(c => (<option key={c.value} value={c.value}>{c.label}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Доходность, %</label>
                    <input type="number" value={filters.yieldMin} onChange={(e) => setFilters({ ...filters, yieldMin: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none" placeholder="От" />
                  </div>
                </div>
                <button onClick={() => setFilters({ priceMin: 0, priceMax: 100000000, areaMin: 0, areaMax: 500, districts: [], developers: [], propertyType: [], class: [], yieldMin: 0, completionDate: '' })} className="mt-6 text-yellow-500 hover:text-yellow-400 transition-colors">Сбросить фильтры</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} onClick={() => onSelectProperty(property)} />
          ))}
        </div>
        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <Home className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">По вашим фильтрам ничего не найдено</p>
            <button onClick={() => setFilters({ priceMin: 0, priceMax: 100000000, areaMin: 0, areaMax: 500, districts: [], developers: [], propertyType: [], class: [], yieldMin: 0, completionDate: '' })} className="mt-4 text-yellow-500 hover:text-yellow-400 transition-colors">Сбросить фильтры</button>
          </div>
        )}
      </div>
    </section>
  );
}

function PropertyCard({ property, index, onClick }: { property: Property; index: number; onClick: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} onClick={onClick} className="group cursor-pointer bg-black/50 rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all hover:transform hover:scale-[1.02]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${property.class === 'elite' ? 'bg-yellow-600 text-black' : property.class === 'premium' ? 'bg-purple-600 text-white' : property.class === 'business' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}>
            {property.class === 'elite' ? 'ЭЛИТ' : property.class === 'premium' ? 'ПРЕМИУМ' : property.class === 'business' ? 'БИЗНЕС' : property.class}
          </span>
          {property.has3DTour && (<span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-600 text-black">3D Тур</span>)}
        </div>
        <div className="absolute bottom-3 right-3 flex gap-2">
          {property.hasVideo && (<div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center"><Video className="w-4 h-4 text-white" /></div>)}
          {property.has3DTour && (<div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center"><Rotate3D className="w-4 h-4 text-white" /></div>)}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-yellow-500 transition-colors line-clamp-1">{property.title}</h3>
          {property.yield && (<div className="flex items-center gap-1 text-green-500"><TrendingUp className="w-4 h-4" /><span className="text-sm font-semibold">{property.yield}%</span></div>)}
        </div>
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
          <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{property.district}</div>
          <div className="flex items-center gap-1"><Home className="w-4 h-4" />{property.area} м²</div>
          {property.rooms && (<div className="flex items-center gap-1"><span>{property.rooms}-комн.</span></div>)}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-yellow-500">{formatCurrency(property.price)}</div>
            <div className="text-sm text-gray-500">{formatCurrency(property.pricePerSqm)} / м²</div>
          </div>
          <button className="w-10 h-10 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-colors"><ArrowRight className="w-5 h-5 text-black" /></button>
        </div>
      </div>
    </motion.div>
  );
}

function InvestmentSection() {
  const investmentFeatures = [
    { icon: TrendingUp, title: 'Доходность до 16%', description: 'Средняя доходность инвестиций в недвижимость Челябинска' },
    { icon: Shield, title: 'Надежные застройщики', description: 'Работаем только с проверенными девелоперами' },
    { icon: Award, title: 'Юридическая чистота', description: 'Полное сопровождение сделки' },
    { icon: Zap, title: 'Быстрый старт', description: 'Первая прибыль уже через 3 месяца' }
  ];
  return (
    <section id="invest" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-yellow-500 text-sm tracking-widest uppercase mb-4 block">Инвесторам</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Инвестиции в недвижимость<br /><span className="text-yellow-500">с максимальной отдачей</span></h2>
            <p className="text-gray-400 text-lg mb-8">Помогаем инвесторам создавать пассивный доход через покупку элитной недвижимости в Челябинске. Полный цикл сопровождения: от подбора объекта до управления арендой.</p>
            <div className="space-y-6">
              {investmentFeatures.map((feature, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center flex-shrink-0"><feature.icon className="w-6 h-6 text-yellow-500" /></div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="mt-10 bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Рассчитать доходность
            </button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800" alt="Инвестиции" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-yellow-600 text-black p-6 rounded-2xl">
              <div className="text-4xl font-bold mb-1">11.2%</div>
              <div className="text-sm opacity-80">Средняя доходность</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-yellow-500 text-sm tracking-widest uppercase mb-4 block">О компании</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ваш надежный партнер на рынке<br /><span className="text-yellow-500">элитной недвижимости</span></h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">Мы специализируемся на продаже элитных новостроек и коммерческой недвижимости в Челябинске. Используем искусственный интеллект для подбора идеальных объектов и автоматизации процесса покупки.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[{ icon: Target, title: 'Индивидуальный подход', description: 'Каждому клиенту персональный менеджер и индивидуальный план подбора недвижимости' }, { icon: Sparkles, title: 'ИИ-консультант 24/7', description: 'Наш искусственный интеллект отвечает на вопросы и подбирает объекты в любое время' }, { icon: Heart, title: 'Полное сопровождение', description: 'От первого звонка до получения ключей и оформления права собственности' }].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-yellow-500/50 transition-colors">
              <item.icon className="w-12 h-12 text-yellow-500 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white text-center mb-10">Наши застройщики-партнеры</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {developers.map((dev, i) => (
              <motion.div key={dev.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white/5 rounded-xl p-6 text-center border border-white/10 hover:border-yellow-500/50 transition-colors">
                <div className="text-white font-semibold mb-2">{dev.name}</div>
                <div className="flex items-center justify-center gap-1 text-yellow-500"><Star className="w-4 h-4 fill-yellow-500" /><span className="text-sm">{dev.rating}</span></div>
                <div className="text-xs text-gray-500 mt-1">{dev.properties} объектов</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Ваша заявка отправлена. Менеджер свяжется с вами в ближайшее время.');
    setFormData({ name: '', phone: '', message: '' });
  };
  return (
    <section id="contacts" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-yellow-500 text-sm tracking-widest uppercase mb-4 block">Контакты</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Свяжитесь с нами<br /><span className="text-yellow-500">прямо сейчас</span></h2>
            <p className="text-gray-400 text-lg mb-8">Оставьте заявку и наш эксперт свяжется с вами в течение 15 минут</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center"><Phone className="w-6 h-6 text-yellow-500" /></div>
                <div><div className="text-sm text-gray-500">Телефон</div><div className="text-xl text-white font-semibold">+7 (351) 000-00-00</div></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center"><MessageCircle className="w-6 h-6 text-yellow-500" /></div>
                <div><div className="text-sm text-gray-500">Telegram</div><div className="text-xl text-white font-semibold">@chelyabinsk_estate</div></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center"><Mail className="w-6 h-6 text-yellow-500" /></div>
                <div><div className="text-sm text-gray-500">Email</div><div className="text-xl text-white font-semibold">info@chelyabinsk-estate.ru</div></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center"><Clock className="w-6 h-6 text-yellow-500" /></div>
                <div><div className="text-sm text-gray-500">Режим работы</div><div className="text-xl text-white font-semibold">Ежедневно 9:00 - 21:00</div></div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Оставить заявку</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Ваше имя</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors" placeholder="Иван Иванов" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Телефон</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors" placeholder="+7 (___) ___-__-__" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Сообщение</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors resize-none" rows={4} placeholder="Какой объект вас интересует?" />
              </div>
              <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-black py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Отправить заявку
              </button>
              <p className="text-xs text-gray-500 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg flex items-center justify-center"><Home className="w-6 h-6 text-black" /></div>
              <div><h3 className="text-lg font-bold text-white">CHELYABINSK</h3><p className="text-xs text-yellow-500 tracking-widest">PREMIUM ESTATE</p></div>
            </div>
            <p className="text-gray-400 text-sm">Элитная недвижимость Челябинска. Новостройки и коммерческая недвижимость.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">ЖК Челябинска</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Пентхаусы</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Коммерческая недвижимость</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Готовый бизнес</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Инвесторам</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Калькулятор доходности</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Ипотечный калькулятор</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Инвестиционные объекты</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Арендный бизнес</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>+7 (351) 000-00-00</li>
              <li>info@chelyabinsk-estate.ru</li>
              <li>Челябинск, пр. Ленина, 1</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2024 Chelyabinsk Premium Estate. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-yellow-500 text-sm transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-gray-500 hover:text-yellow-500 text-sm transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AIChatWidget({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; content: string }[]>([
    { id: '1', role: 'assistant', content: 'Здравствуйте! Я ИИ-консультант по недвижимости Челябинска. Помогу подобрать идеальный объект для вас. Расскажите, что вас интересует?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useState<HTMLDivElement | null>(null);

  const getAIResponse = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes('квартир') || lowerMsg.includes('купить')) {
      return 'Отлично! Для подбора квартиры мне нужно уточнить несколько вопросов:\n\n1. Какой у вас бюджет?\n2. Какой район вас интересует?\n3. Сколько комнат нужно?\n\nИли я могу показать вам топ-3 объекта прямо сейчас!';
    }
    if (lowerMsg.includes('коммерч') || lowerMsg.includes('офис') || lowerMsg.includes('торгов')) {
      return 'Коммерческая недвижимость - отличное вложение! У нас есть:\n\n🏢 Офисные помещения от 28 млн ₽\n🛍️ Торговые площади в ТРК\n📈 Готовый арендный бизнес с доходностью до 16%\n\nЧто вас больше интересует?';
    }
    if (lowerMsg.includes('инвест') || lowerMsg.includes('доходн')) {
      return 'Инвестиции в недвижимость Челябинска показывают среднюю доходность 11-16% годовых!\n\n📊 Топ объектов для инвестиций:\n• Готовый арендный бизнес - 15.8%\n• Торговое помещение в ТРК - 14.2%\n• Офис в центре - 12.5%\n\nХотите рассчитать доходность для конкретного объекта?';
    }
    if (lowerMsg.includes('ипотек')) {
      return 'Работаем со всеми банками! Ставки от 5.3% для семейной ипотеки.\n\n🏦 Банки-партнеры:\n• Сбербанк\n• ВТБ\n• Альфа-Банк\n• Дом.РФ\n\nМогу рассчитать ежемесячный платеж. Какая стоимость объекта вас интересует?';
    }
    if (lowerMsg.includes('контакт') || lowerMsg.includes('телефон') || lowerMsg.includes('связ')) {
      return 'Конечно! Наши эксперты готовы помочь:\n\n📞 +7 (351) 000-00-00\n💬 Telegram: @chelyabinsk_estate\n✉️ info@chelyabinsk-estate.ru\n\nОставьте ваш номер телефона, и менеджер перезвонит в течение 15 минут!';
    }
    return 'Понял вас! Чтобы подобрать лучшие объекты, подскажите:\n\n• Бюджет покупки?\n• Цель (для жизни/инвестиции/бизнес)?\n• Предпочитаемый район?\n\nИли воспользуйтесь нашим каталогом с фильтрами!';
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg = { id: (Date.now() + 1).toString(), role: 'assistant' as const, content: getAIResponse(input) };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-full max-w-md bg-gray-900 rounded-2xl border border-white/10 z-50 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="text-white font-semibold">ИИ-Консультант</h3>
                  <p className="text-yellow-100 text-xs">Онлайн • Отвечает за 2 сек</p>
                </div>
              </div>
              <button onClick={onClose} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-yellow-600 text-black' : 'bg-white/10 text-white'}`}>
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl px-4 py-3"><div className="flex gap-1"><div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" /><div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} /><div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} /></div></div>
                </div>
              )}
              <div ref={messagesEndRef as any} />
            </div>
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none text-sm" placeholder="Введите сообщение..." />
                <button onClick={handleSend} className="w-12 h-12 bg-yellow-600 hover:bg-yellow-700 rounded-xl flex items-center justify-center transition-colors"><Send className="w-5 h-5 text-black" /></button>
              </div>
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {['Показать квартиры', 'Коммерческая', 'Ипотека', 'Инвестиции'].map(q => (
                  <button key={q} onClick={() => setInput(q)} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-xs text-gray-300 whitespace-nowrap transition-colors">{q}</button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function QuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const questions = [
    { id: 1, question: 'Для какой цели вы приобретаете недвижимость?', options: [{ label: 'Для жизни', value: 'living' }, { label: 'Для инвестиций', value: 'investment' }, { label: 'Для бизнеса', value: 'business' }] },
    { id: 2, question: 'Какой ваш бюджет?', options: [{ label: 'До 10 млн ₽', value: 'up_to_10m' }, { label: '10-20 млн ₽', value: '10_to_20m' }, { label: '20-50 млн ₽', value: '20_to_50m' }, { label: 'Более 50 млн ₽', value: 'over_50m' }] },
    { id: 3, question: 'Какой район вас интересует?', options: [{ label: 'Центральный', value: 'central' }, { label: 'Советский', value: 'soviet' }, { label: 'Курчатовский', value: 'kurchatov' }, { label: 'Любой', value: 'any' }] },
    { id: 4, question: 'Когда планируете покупку?', options: [{ label: 'В течение месяца', value: 'month' }, { label: '1-3 месяца', value: '1_to_3_months' }, { label: '3-6 месяцев', value: '3_to_6_months' }, { label: 'Пока изучаю рынок', value: 'researching' }] },
    { id: 5, question: 'Способ оплаты?', options: [{ label: 'Собственные средства', value: 'cash' }, { label: 'Ипотека', value: 'mortgage' }, { label: 'Рассрочка', value: 'installment' }, { label: 'Комбинированный', value: 'combined' }] }
  ];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [step + 1]: value });
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    alert('Спасибо! Мы подобрали для вас объекты. Менеджер свяжется с вами в ближайшее время!');
    onClose();
    setStep(0);
    setAnswers({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-gray-900 rounded-3xl max-w-lg w-full overflow-hidden border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Подберем объект за 60 секунд</h3>
                  <p className="text-gray-400 text-sm">Вопрос {step + 1} из {questions.length}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${((step + 1) / questions.length) * 100}%` }} className="h-full bg-yellow-600" />
                  </div>
                </div>
                <h4 className="text-xl text-white mb-6">{questions[step].question}</h4>
                <div className="space-y-3">
                  {questions[step].options.map(opt => (
                    <button key={opt.value} onClick={() => handleAnswer(opt.value)} className="w-full p-4 text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 rounded-xl text-white transition-all">
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              {step === questions.length - 1 && (
                <div className="p-6 border-t border-white/10">
                  <button onClick={handleSubmit} className="w-full bg-yellow-600 hover:bg-yellow-700 text-black py-4 rounded-xl font-semibold text-lg transition-all">Получить подборку</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PropertyDetailModal({ property, onClose, onMortgageCalc, onInvestmentCalc }: { property: Property | null; onClose: () => void; onMortgageCalc: () => void; onInvestmentCalc: () => void }) {
  if (!property) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10" onClick={e => e.stopPropagation()}>
          <div className="relative">
            <img src={property.images[0]} alt={property.title} className="w-full h-64 md:h-96 object-cover" />
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{property.title}</h2>
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{property.district}</span>
                  <span className="flex items-center gap-1"><Home className="w-4 h-4" />{property.area} м²</span>
                  {property.rooms && <span>{property.rooms}-комн.</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-bold text-yellow-500">{formatCurrency(property.price)}</div>
                <div className="text-sm text-gray-500">{formatCurrency(property.pricePerSqm)} / м²</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6">{property.description}</p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Характеристики</h4>
                <div className="space-y-2 text-gray-400 text-sm">
                  <div className="flex justify-between"><span>Класс:</span><span className="text-white">{property.class}</span></div>
                  {property.floor && <div className="flex justify-between"><span>Этаж:</span><span className="text-white">{property.floor} из {property.totalFloors}</span></div>}
                  {property.developer && <div className="flex justify-between"><span>Застройщик:</span><span className="text-white">{property.developer}</span></div>}
                  {property.completionDate && <div className="flex justify-between"><span>Срок сдачи:</span><span className="text-white">{property.completionDate}</span></div>}
                  {property.yield && <div className="flex justify-between"><span>Доходность:</span><span className="text-green-500">{property.yield}%</span></div>}
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Особенности</h4>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((f, i) => (<span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">{f}</span>))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mb-6">
              {property.hasVideo && (<div className="flex items-center gap-2 text-gray-400"><Video className="w-5 h-5" /><span>Видео</span></div>)}
              {property.has3DTour && (<div className="flex items-center gap-2 text-gray-400"><Rotate3D className="w-5 h-5" /><span>3D Тур</span></div>)}
              {property.mortgageAvailable && (<div className="flex items-center gap-2 text-gray-400"><Check className="w-5 h-5 text-green-500" /><span>Ипотека</span></div>)}
            </div>
            <div className="flex flex-wrap gap-4">
              <button onClick={onMortgageCalc} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"><Calculator className="w-5 h-5" />Ипотечный калькулятор</button>
              <button onClick={onInvestmentCalc} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"><BarChart3 className="w-5 h-5" />Расчет доходности</button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"><Phone className="w-5 h-5" />Связаться</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MortgageCalculatorModal({ isOpen, onClose, propertyPrice }: { isOpen: boolean; onClose: () => void; propertyPrice: number }) {
  const [price, setPrice] = useState(propertyPrice);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(16);
  const [term, setTerm] = useState(20);

  const loanAmount = price * (100 - downPayment) / 100;
  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - loanAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-gray-900 rounded-3xl max-w-lg w-full border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Ипотечный калькулятор</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Стоимость недвижимости, ₽</label>
                  <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Первоначальный взнос, %</label>
                  <input type="range" min="0" max="50" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full" />
                  <div className="text-yellow-500 font-semibold">{downPayment}% ({formatCurrency(price * downPayment / 100)})</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Процентная ставка, %</label>
                  <input type="range" min="5" max="25" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
                  <div className="text-yellow-500 font-semibold">{rate}%</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Срок, лет</label>
                  <input type="range" min="5" max="30" value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full" />
                  <div className="text-yellow-500 font-semibold">{term} лет</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between"><span className="text-gray-400">Сумма кредита:</span><span className="text-white font-semibold">{formatCurrency(loanAmount)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Ежемесячный платеж:</span><span className="text-yellow-500 font-bold text-xl">{formatCurrency(monthlyPayment)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Общая сумма:</span><span className="text-white">{formatCurrency(totalPayment)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Проценты:</span><span className="text-red-400">{formatCurrency(totalInterest)}</span></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InvestmentCalculatorModal({ isOpen, onClose, propertyPrice }: { isOpen: boolean; onClose: () => void; propertyPrice: number }) {
  const [price, setPrice] = useState(propertyPrice);
  const [rentalIncome, setRentalIncome] = useState(80000);
  const [expenses, setExpenses] = useState(20000);

  const netIncome = (rentalIncome - expenses) * 12;
  const yieldPercent = (netIncome / price) * 100;
  const paybackPeriod = price / netIncome;
  const roi5Years = ((netIncome * 5) / price) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-gray-900 rounded-3xl max-w-lg w-full border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Калькулятор доходности</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Стоимость объекта, ₽</label>
                  <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Ежемесячный доход от аренды, ₽</label>
                  <input type="number" value={rentalIncome} onChange={(e) => setRentalIncome(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Ежемесячные расходы, ₽</label>
                  <input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none" />
                  <p className="text-xs text-gray-500 mt-1">Налоги, коммуналка, управление</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between"><span className="text-gray-400">Чистый годовой доход:</span><span className="text-green-500 font-semibold">{formatCurrency(netIncome)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Доходность:</span><span className="text-yellow-500 font-bold text-xl">{yieldPercent.toFixed(1)}%</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Окупаемость:</span><span className="text-white">{paybackPeriod.toFixed(1)} лет</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">ROI за 5 лет:</span><span className="text-green-500">{roi5Years.toFixed(0)}%</span></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TelegramFloatingButton() {
  return (
    <a href="https://t.me/chelyabinsk_estate" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-40 group">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-14 h-14 bg-[#0088cc] hover:bg-[#0099ee] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 transition-colors">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.03-.76 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.89 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.27z"/></svg>
      </motion.div>
      <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        Наш Telegram
      </div>
    </a>
  );
}

export default App;
