import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type Tab = 'home' | 'workshops' | 'appointments' | 'history' | 'notifications' | 'profile';

interface Workshop {
  id: number;
  name: string;
  rating: number;
  distance: string;
  specialties: string[];
  image: string;
}

interface Appointment {
  id: number;
  workshop: string;
  service: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const workshops: Workshop[] = [
    {
      id: 1,
      name: 'АвтоМастер Про',
      rating: 4.8,
      distance: '2.3 км',
      specialties: ['Диагностика', 'ТО', 'Ремонт'],
      image: '🔧'
    },
    {
      id: 2,
      name: 'Сервис Экспресс',
      rating: 4.9,
      distance: '3.1 км',
      specialties: ['Шиномонтаж', 'Развал-схождение'],
      image: '⚡'
    },
    {
      id: 3,
      name: 'ТехЦентр 24',
      rating: 4.7,
      distance: '4.5 км',
      specialties: ['Электрика', 'Кузовной ремонт'],
      image: '🛠️'
    }
  ];

  const appointments: Appointment[] = [
    {
      id: 1,
      workshop: 'АвтоМастер Про',
      service: 'Замена масла и фильтров',
      date: '15 декабря',
      time: '10:00',
      status: 'upcoming'
    },
    {
      id: 2,
      workshop: 'Сервис Экспресс',
      service: 'Шиномонтаж',
      date: '18 декабря',
      time: '14:30',
      status: 'upcoming'
    }
  ];

  const history: Appointment[] = [
    {
      id: 3,
      workshop: 'ТехЦентр 24',
      service: 'Диагностика двигателя',
      date: '28 ноября',
      time: '11:00',
      status: 'completed'
    },
    {
      id: 4,
      workshop: 'АвтоМастер Про',
      service: 'ТО-1',
      date: '10 ноября',
      time: '09:00',
      status: 'completed'
    }
  ];

  const notifications = [
    { id: 1, text: 'Напоминание: запись завтра в 10:00', time: '2 часа назад', unread: true },
    { id: 2, text: 'Ваш автомобиль готов к выдаче', time: '5 часов назад', unread: true },
    { id: 3, text: 'Специальное предложение на ТО', time: '1 день назад', unread: false }
  ];

  const renderHome = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="gradient-primary rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Добро пожаловать! 👋</h1>
        <p className="text-white/90 mb-6">Планируйте ремонт автомобиля легко и удобно</p>
        <div className="flex gap-3">
          <Button onClick={() => setActiveTab('workshops')} className="bg-white text-primary hover:bg-white/90">
            <Icon name="Search" size={18} className="mr-2" />
            Найти мастерскую
          </Button>
          <Button onClick={() => setActiveTab('appointments')} variant="outline" className="border-white text-white hover:bg-white/10">
            <Icon name="Calendar" size={18} className="mr-2" />
            Мои записи
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50" onClick={() => setActiveTab('appointments')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon name="CalendarCheck" size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Предстоящих записей</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50" onClick={() => setActiveTab('history')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Icon name="History" size={24} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Завершено</p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Рекомендуемые мастерские</h2>
        <div className="space-y-3">
          {workshops.slice(0, 2).map(workshop => (
            <Card key={workshop.id} className="p-4 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{workshop.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{workshop.name}</h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      <Icon name="Star" size={12} className="mr-1 fill-current" />
                      {workshop.rating}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{workshop.distance}</p>
                  <div className="flex gap-2">
                    {workshop.specialties.map(spec => (
                      <Badge key={spec} variant="outline" className="text-xs">{spec}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkshops = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Мастерские</h1>
        <Button variant="outline" size="sm">
          <Icon name="SlidersHorizontal" size={18} className="mr-2" />
          Фильтры
        </Button>
      </div>

      <div className="relative">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Поиск мастерской..."
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-4">
        {workshops.map(workshop => (
          <Card key={workshop.id} className="p-5 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50 transition-all hover:border-primary/50">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{workshop.image}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{workshop.name}</h3>
                  <Badge className="bg-primary/10 text-primary border-0">
                    <Icon name="Star" size={14} className="mr-1 fill-current" />
                    {workshop.rating}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="MapPin" size={14} />
                    {workshop.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    Открыто до 20:00
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {workshop.specialties.map(spec => (
                    <Badge key={spec} variant="outline" className="text-xs">{spec}</Badge>
                  ))}
                </div>
                <Button className="w-full gradient-primary">
                  <Icon name="Calendar" size={18} className="mr-2" />
                  Записаться
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Мои записи</h1>

      <div className="space-y-4">
        {appointments.map(apt => (
          <Card key={apt.id} className="p-5 bg-card/50 backdrop-blur border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name="Wrench" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{apt.workshop}</h3>
                  <p className="text-sm text-muted-foreground">{apt.service}</p>
                </div>
              </div>
              <Badge className="gradient-primary border-0">{apt.status === 'upcoming' ? 'Предстоящая' : 'Завершена'}</Badge>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-2">
                <Icon name="Calendar" size={16} />
                {apt.date}
              </span>
              <span className="flex items-center gap-2">
                <Icon name="Clock" size={16} />
                {apt.time}
              </span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Icon name="MapPin" size={16} className="mr-2" />
                Маршрут
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="Phone" size={16} className="mr-2" />
                Позвонить
              </Button>
              <Button variant="outline" className="text-destructive hover:bg-destructive hover:text-white">
                <Icon name="X" size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button className="w-full gradient-primary" onClick={() => setActiveTab('workshops')}>
        <Icon name="Plus" size={18} className="mr-2" />
        Новая запись
      </Button>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">История</h1>

      <div className="space-y-4">
        {history.map(apt => (
          <Card key={apt.id} className="p-5 bg-card/50 backdrop-blur border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Icon name="CheckCircle" size={20} className="text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{apt.workshop}</h3>
                  <p className="text-sm text-muted-foreground">{apt.service}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{apt.date}</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Повторить запись
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="FileText" size={16} className="mr-2" />
                Детали
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Уведомления</h1>

      <div className="space-y-3">
        {notifications.map(notif => (
          <Card key={notif.id} className={`p-4 cursor-pointer hover-scale bg-card/50 backdrop-blur border-border/50 ${notif.unread ? 'border-l-4 border-l-primary' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${notif.unread ? 'bg-primary/10' : 'bg-muted'}`}>
                <Icon name="Bell" size={20} className={notif.unread ? 'text-primary' : 'text-muted-foreground'} />
              </div>
              <div className="flex-1">
                <p className={`${notif.unread ? 'font-semibold' : ''} mb-1`}>{notif.text}</p>
                <p className="text-sm text-muted-foreground">{notif.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        <Icon name="Check" size={18} className="mr-2" />
        Отметить все как прочитанные
      </Button>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 gradient-primary text-white">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-20 h-20 border-4 border-white/20">
            <AvatarImage src="" />
            <AvatarFallback className="text-2xl bg-white/20">ИП</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Иван Петров</h2>
            <p className="text-white/80">ivan@example.com</p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Card className="p-4 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Car" size={20} className="text-primary" />
              <span className="font-medium">Мои автомобили</span>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-4 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="CreditCard" size={20} className="text-primary" />
              <span className="font-medium">Способы оплаты</span>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-4 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Heart" size={20} className="text-primary" />
              <span className="font-medium">Избранные мастерские</span>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-4 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Settings" size={20} className="text-primary" />
              <span className="font-medium">Настройки</span>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-4 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="HelpCircle" size={20} className="text-primary" />
              <span className="font-medium">Помощь и поддержка</span>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </div>
        </Card>
      </div>

      <Button variant="outline" className="w-full text-destructive hover:bg-destructive hover:text-white">
        <Icon name="LogOut" size={18} className="mr-2" />
        Выйти из аккаунта
      </Button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'workshops': return renderWorkshops();
      case 'appointments': return renderAppointments();
      case 'history': return renderHistory();
      case 'notifications': return renderNotifications();
      case 'profile': return renderProfile();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-2xl mx-auto p-6">
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs">Главная</span>
            </button>

            <button
              onClick={() => setActiveTab('workshops')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'workshops' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="Wrench" size={24} />
              <span className="text-xs">Мастерские</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'appointments' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="Calendar" size={24} />
              <span className="text-xs">Записи</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="History" size={24} />
              <span className="text-xs">История</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex flex-col items-center gap-1 transition-colors relative ${activeTab === 'notifications' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="Bell" size={24} />
              <span className="text-xs">Уведомления</span>
              <span className="absolute top-0 right-2 w-2 h-2 bg-secondary rounded-full"></span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="User" size={24} />
              <span className="text-xs">Профиль</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;