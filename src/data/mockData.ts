import { Property, District, Developer } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'ЖК "Александровский"',
    type: 'apartment',
    category: 'residential',
    price: 15900000,
    pricePerSqm: 185000,
    area: 86,
    rooms: 3,
    floor: 12,
    totalFloors: 25,
    district: 'Центральный',
    developer: 'Александровский',
    completionDate: '2025-Q4',
    yield: 8.5,
    class: 'premium',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    description: 'Элитный жилой комплекс в сердце Челябинска. Панорамные виды, премиальная отделка, закрытая территория.',
    features: ['Панорамные окна', 'Закрытая территория', 'Подземный паркинг', 'Консьерж', 'Фитнес-центр'],
    hasVideo: true,
    has3DTour: true,
    mortgageAvailable: true,
    investmentScore: 92,
    coordinates: { lat: 55.1644, lng: 61.4368 }
  },
  {
    id: '2',
    title: 'Пентхаус в ЖК "Ньютон"',
    type: 'penthouse',
    category: 'residential',
    price: 45000000,
    pricePerSqm: 350000,
    area: 128,
    rooms: 4,
    floor: 24,
    totalFloors: 24,
    district: 'Центральный',
    developer: 'ЧелябСтрой',
    completionDate: '2024-Q3',
    yield: 7.2,
    class: 'elite',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    description: 'Эксклюзивный пентхаус с террасой и видом на весь город. Дизайнерская отделка, умный дом.',
    features: ['Терраса 50 м²', 'Умный дом', 'Вид на город', 'Дизайнерская отделка', '2 машиноместа'],
    hasVideo: true,
    has3DTour: true,
    mortgageAvailable: true,
    investmentScore: 88,
    coordinates: { lat: 55.1594, lng: 61.4028 }
  },
  {
    id: '3',
    title: 'Офисное помещение, ул. Ленина',
    type: 'office',
    category: 'commercial',
    price: 28000000,
    pricePerSqm: 140000,
    area: 200,
    district: 'Центральный',
    developer: 'Бизнес Центр',
    completionDate: '2024-Q1',
    yield: 12.5,
    class: 'business',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800'
    ],
    description: 'Премиальный офис в деловом центре города. Готовый арендный бизнес с якорным арендатором.',
    features: ['Готовый арендный бизнес', 'Центральный вход', 'Парковка', 'Ремонт', 'Кондиционирование'],
    hasVideo: false,
    has3DTour: true,
    mortgageAvailable: true,
    investmentScore: 95,
    coordinates: { lat: 55.1540, lng: 61.4291 }
  },
  {
    id: '4',
    title: 'Торговое помещение, ТРК "Родник"',
    type: 'retail',
    category: 'commercial',
    price: 35000000,
    pricePerSqm: 175000,
    area: 200,
    district: 'Курчатовский',
    developer: 'ТРК Родник',
    completionDate: '2023-Q4',
    yield: 14.2,
    class: 'premium',
    images: [
      'https://images.unsplash.com/photo-1556742393-d75f462bf72f?w=800',
      'https://images.unsplash.com/photo-1567449307469-4f1b8c1e0c6d?w=800'
    ],
    description: 'Торговое помещение в популярном ТРК. Высокий трафик, готовый бизнес.',
    features: ['Высокий трафик', 'Готовый ремонт', 'Витринные окна', 'Складское помещение'],
    hasVideo: true,
    has3DTour: false,
    mortgageAvailable: true,
    investmentScore: 91,
    coordinates: { lat: 55.1894, lng: 61.3628 }
  },
  {
    id: '5',
    title: 'ЖК "Манхэттен", 2-комнатная',
    type: 'apartment',
    category: 'residential',
    price: 12500000,
    pricePerSqm: 156000,
    area: 80,
    rooms: 2,
    floor: 8,
    totalFloors: 32,
    district: 'Центральный',
    developer: 'Манхэттен',
    completionDate: '2025-Q2',
    yield: 9.1,
    class: 'business',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800'
    ],
    description: 'Современный ЖК бизнес-класса. Закрытая территория, развитая инфраструктура.',
    features: ['Закрытая территория', 'Детская площадка', 'Спортзал', 'Паркинг'],
    hasVideo: true,
    has3DTour: true,
    mortgageAvailable: true,
    investmentScore: 87,
    coordinates: { lat: 55.1520, lng: 61.4180 }
  },
  {
    id: '6',
    title: 'Готовый арендный бизнес - Апартаменты',
    type: 'business',
    category: 'commercial',
    price: 52000000,
    pricePerSqm: 260000,
    area: 200,
    district: 'Центральный',
    developer: 'Инвест Групп',
    completionDate: '2024-Q2',
    yield: 15.8,
    class: 'premium',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502005229766-939cb4a5c8a7?w=800'
    ],
    description: 'Блок из 4 апартаментов под посуточную аренду. Полностью меблированы, высокий спрос.',
    features: ['Готовый бизнес', 'Полная меблировка', 'Управляющая компания', 'Доход от 680к/год'],
    hasVideo: true,
    has3DTour: true,
    mortgageAvailable: true,
    investmentScore: 96,
    coordinates: { lat: 55.1580, lng: 61.4100 }
  },
  {
    id: '7',
    title: 'ЖК "Челябинск-Сити"',
    type: 'apartment',
    category: 'residential',
    price: 18700000,
    pricePerSqm: 195000,
    area: 96,
    rooms: 3,
    floor: 15,
    totalFloors: 28,
    district: 'Советский',
    developer: 'Сити Девелопмент',
    completionDate: '2025-Q3',
    yield: 8.8,
    class: 'premium',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a1c00207099b?w=800',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800'
    ],
    description: 'Жилой комплекс премиум-класса с панорамным остеклением и видом на город.',
    features: ['Панорамные окна', 'Спа-комплекс', 'Ресторан', 'Консьерж-сервис'],
    hasVideo: true,
    has3DTour: true,
    mortgageAvailable: true,
    investmentScore: 90,
    coordinates: { lat: 55.1450, lng: 61.4500 }
  },
  {
    id: '8',
    title: 'Коммерческое помещение, пр. Ленина',
    type: 'commercial',
    category: 'commercial',
    price: 42000000,
    pricePerSqm: 210000,
    area: 200,
    district: 'Центральный',
    developer: 'Челябинск Недвижимость',
    completionDate: '2024-Q1',
    yield: 11.5,
    class: 'business',
    images: [
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800',
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800'
    ],
    description: 'Первая линия, высокий пешеходный трафик. Идеально для ресторана или шоу-рума.',
    features: ['Первая линия', 'Витринные окна', 'Высокие потолки', 'Отдельный вход'],
    hasVideo: false,
    has3DTour: true,
    mortgageAvailable: true,
    investmentScore: 89,
    coordinates: { lat: 55.1560, lng: 61.4250 }
  }
];

export const districts: District[] = [
  { id: '1', name: 'Центральный', averagePrice: 185000, properties: 342 },
  { id: '2', name: 'Советский', averagePrice: 165000, properties: 218 },
  { id: '3', name: 'Курчатовский', averagePrice: 145000, properties: 186 },
  { id: '4', name: 'Ленинский', averagePrice: 135000, properties: 154 },
  { id: '5', name: 'Калининский', averagePrice: 125000, properties: 132 },
  { id: '6', name: 'Металлургический', averagePrice: 115000, properties: 98 }
];

export const developers: Developer[] = [
  { id: '1', name: 'Александровский', logo: '', properties: 45, rating: 4.8 },
  { id: '2', name: 'ЧелябСтрой', logo: '', properties: 38, rating: 4.6 },
  { id: '3', name: 'Манхэттен', logo: '', properties: 52, rating: 4.7 },
  { id: '4', name: 'Сити Девелопмент', logo: '', properties: 28, rating: 4.9 },
  { id: '5', name: 'Инвест Групп', logo: '', properties: 34, rating: 4.5 },
  { id: '6', name: 'Бизнес Центр', logo: '', properties: 22, rating: 4.4 }
];

export const propertyTypes = [
  { value: 'apartment', label: 'Квартиры' },
  { value: 'penthouse', label: 'Пентхаусы' },
  { value: 'commercial', label: 'Коммерческие помещения' },
  { value: 'office', label: 'Офисы' },
  { value: 'retail', label: 'Торговые площади' },
  { value: 'business', label: 'Готовый бизнес' }
];

export const propertyClasses = [
  { value: 'economy', label: 'Эконом' },
  { value: 'comfort', label: 'Комфорт' },
  { value: 'business', label: 'Бизнес' },
  { value: 'premium', label: 'Премиум' },
  { value: 'elite', label: 'Элит' }
];

export const quizQuestions = [
  {
    id: 1,
    question: 'Для какой цели вы приобретаете недвижимость?',
    options: [
      { label: 'Для жизни', value: 'living' },
      { label: 'Для инвестиций', value: 'investment' },
      { label: 'Для бизнеса', value: 'business' }
    ]
  },
  {
    id: 2,
    question: 'Какой ваш бюджет?',
    options: [
      { label: 'До 10 млн ₽', value: 'up_to_10m' },
      { label: '10-20 млн ₽', value: '10_to_20m' },
      { label: '20-50 млн ₽', value: '20_to_50m' },
      { label: 'Более 50 млн ₽', value: 'over_50m' }
    ]
  },
  {
    id: 3,
    question: 'Какой район вас интересует?',
    options: [
      { label: 'Центральный', value: 'central' },
      { label: 'Советский', value: 'soviet' },
      { label: 'Курчатовский', value: 'kurchatov' },
      { label: 'Любой', value: 'any' }
    ]
  },
  {
    id: 4,
    question: 'Когда планируете покупку?',
    options: [
      { label: 'В течение месяца', value: 'month' },
      { label: '1-3 месяца', value: '1_to_3_months' },
      { label: '3-6 месяцев', value: '3_to_6_months' },
      { label: 'Пока изучаю рынок', value: 'researching' }
    ]
  },
  {
    id: 5,
    question: 'Способ оплаты?',
    options: [
      { label: 'Собственные средства', value: 'cash' },
      { label: 'Ипотека', value: 'mortgage' },
      { label: 'Рассрочка', value: 'installment' },
      { label: 'Комбинированный', value: 'combined' }
    ]
  }
];

export const stats = {
  totalProperties: 1247,
  averageYield: 11.2,
  successfulDeals: 856,
  activeClients: 342
};
