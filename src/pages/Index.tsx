import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type Tab = 'dashboard' | 'calendar' | 'orders' | 'clients' | 'inventory' | 'analytics';

interface Order {
  id: number;
  clientName: string;
  carModel: string;
  service: string;
  date: string;
  time: string;
  mechanic: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
  cost: number;
}

interface Client {
  id: number;
  name: string;
  phone: string;
  carModel: string;
  lastVisit: string;
  totalOrders: number;
}

interface Mechanic {
  id: number;
  name: string;
  specialization: string;
  currentOrders: number;
  avatar: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const todayOrders: Order[] = [
    {
      id: 1,
      clientName: 'Иван Петров',
      carModel: 'Toyota Camry',
      service: 'Замена масла',
      date: '14 декабря',
      time: '10:00',
      mechanic: 'Алексей К.',
      status: 'in_progress',
      cost: 3500
    },
    {
      id: 2,
      clientName: 'Мария Смирнова',
      carModel: 'BMW X5',
      service: 'Диагностика двигателя',
      date: '14 декабря',
      time: '11:30',
      mechanic: 'Дмитрий В.',
      status: 'waiting',
      cost: 2500
    },
    {
      id: 3,
      clientName: 'Сергей Козлов',
      carModel: 'Mercedes E-Class',
      service: 'Шиномонтаж',
      date: '14 декабря',
      time: '14:00',
      mechanic: 'Алексей К.',
      status: 'waiting',
      cost: 2000
    }
  ];

  const upcomingOrders: Order[] = [
    {
      id: 4,
      clientName: 'Анна Волкова',
      carModel: 'Audi A4',
      service: 'ТО-1',
      date: '15 декабря',
      time: '09:00',
      mechanic: 'Дмитрий В.',
      status: 'waiting',
      cost: 8500
    },
    {
      id: 5,
      clientName: 'Павел Новиков',
      carModel: 'Volkswagen Polo',
      service: 'Замена тормозных колодок',
      date: '15 декабря',
      time: '12:00',
      mechanic: 'Игорь С.',
      status: 'waiting',
      cost: 4200
    }
  ];

  const completedOrders: Order[] = [
    {
      id: 6,
      clientName: 'Ольга Морозова',
      carModel: 'Hyundai Solaris',
      service: 'Замена свечей',
      date: '13 декабря',
      time: '15:00',
      mechanic: 'Алексей К.',
      status: 'completed',
      cost: 2800
    },
    {
      id: 7,
      clientName: 'Николай Федоров',
      carModel: 'Kia Rio',
      service: 'Развал-схождение',
      date: '13 декабря',
      time: '10:00',
      mechanic: 'Игорь С.',
      status: 'completed',
      cost: 1800
    }
  ];

  const clients: Client[] = [
    {
      id: 1,
      name: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      carModel: 'Toyota Camry, 2020',
      lastVisit: '14 декабря',
      totalOrders: 8
    },
    {
      id: 2,
      name: 'Мария Смирнова',
      phone: '+7 (999) 234-56-78',
      carModel: 'BMW X5, 2019',
      lastVisit: '14 декабря',
      totalOrders: 5
    },
    {
      id: 3,
      name: 'Сергей Козлов',
      phone: '+7 (999) 345-67-89',
      carModel: 'Mercedes E-Class, 2021',
      lastVisit: '14 декабря',
      totalOrders: 12
    }
  ];

  const mechanics: Mechanic[] = [
    {
      id: 1,
      name: 'Алексей Кузнецов',
      specialization: 'Двигатель, ТО',
      currentOrders: 2,
      avatar: 'АК'
    },
    {
      id: 2,
      name: 'Дмитрий Волков',
      specialization: 'Диагностика',
      currentOrders: 1,
      avatar: 'ДВ'
    },
    {
      id: 3,
      name: 'Игорь Соколов',
      specialization: 'Подвеска, шиномонтаж',
      currentOrders: 1,
      avatar: 'ИС'
    }
  ];

  const inventory = [
    { id: 1, name: 'Масло моторное 5W-40', quantity: 24, unit: 'л', minStock: 10 },
    { id: 2, name: 'Фильтр масляный', quantity: 15, unit: 'шт', minStock: 10 },
    { id: 3, name: 'Тормозные колодки', quantity: 8, unit: 'комп', minStock: 5 },
    { id: 4, name: 'Свечи зажигания', quantity: 3, unit: 'комп', minStock: 8 }
  ];

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="gradient-primary rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Панель управления 🔧</h1>
        <p className="text-white/90 mb-6">Автосервис — сегодня {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</p>
        <div className="flex gap-3">
          <Button onClick={() => setActiveTab('calendar')} className="bg-white text-primary hover:bg-white/90">
            <Icon name="Calendar" size={18} className="mr-2" />
            Расписание
          </Button>
          <Button onClick={() => setActiveTab('orders')} variant="outline" className="border-white text-white hover:bg-white/10">
            <Icon name="ClipboardList" size={18} className="mr-2" />
            Заказы
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl gradient-primary">
              <Icon name="Clock" size={24} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{todayOrders.length}</p>
              <p className="text-sm text-muted-foreground">Сегодня</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/20">
              <Icon name="Wrench" size={24} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{todayOrders.filter(o => o.status === 'in_progress').length}</p>
              <p className="text-sm text-muted-foreground">В работе</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500/20">
              <Icon name="CheckCircle" size={24} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedOrders.length}</p>
              <p className="text-sm text-muted-foreground">Завершено</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/20">
              <Icon name="DollarSign" size={24} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{(todayOrders.reduce((sum, o) => sum + o.cost, 0) / 1000).toFixed(0)}k</p>
              <p className="text-sm text-muted-foreground">Выручка</p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Заказы на сегодня</h2>
          <Button onClick={() => setActiveTab('orders')} variant="ghost" size="sm">
            Все заказы <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
        <div className="space-y-3">
          {todayOrders.slice(0, 3).map(order => (
            <Card key={order.id} className="p-4 hover-scale cursor-pointer bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{order.clientName}</h3>
                    <Badge className={`border-0 ${
                      order.status === 'in_progress' ? 'bg-accent/20 text-accent' :
                      order.status === 'waiting' ? 'bg-primary/20 text-primary' :
                      order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                      'bg-muted'
                    }`}>
                      {order.status === 'in_progress' ? 'В работе' :
                       order.status === 'waiting' ? 'Ожидает' :
                       order.status === 'completed' ? 'Готов' : 'Отменён'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{order.carModel} • {order.service}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {order.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="User" size={12} />
                      {order.mechanic}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{order.cost.toLocaleString()} ₽</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Мастера</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mechanics.map(mech => (
            <Card key={mech.id} className="p-4 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">{mech.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{mech.name}</h3>
                  <p className="text-xs text-muted-foreground">{mech.specialization}</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-0">{mech.currentOrders}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Календарь записей</h1>
        <Button className="gradient-primary">
          <Icon name="Plus" size={18} className="mr-2" />
          Новая запись
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-3">Сегодня, 14 декабря</h3>
        <div className="space-y-2">
          {todayOrders.map(order => (
            <Card key={order.id} className="p-3 bg-card/50 backdrop-blur border-border/50 hover-scale cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Icon name="Clock" size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{order.time}</span>
                    <Badge className={`text-xs border-0 ${order.status === 'in_progress' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}>
                      {order.status === 'in_progress' ? 'В работе' : 'Ожидает'}
                    </Badge>
                  </div>
                  <p className="text-sm truncate">{order.clientName} • {order.carModel}</p>
                  <p className="text-xs text-muted-foreground">{order.service}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Завтра, 15 декабря</h3>
        <div className="space-y-2">
          {upcomingOrders.map(order => (
            <Card key={order.id} className="p-3 bg-card/50 backdrop-blur border-border/50 hover-scale cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10 shrink-0">
                  <Icon name="Calendar" size={16} className="text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm block mb-1">{order.time}</span>
                  <p className="text-sm truncate">{order.clientName} • {order.carModel}</p>
                  <p className="text-xs text-muted-foreground">{order.service}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Заказы</h1>
        <Button className="gradient-primary">
          <Icon name="Plus" size={18} className="mr-2" />
          Новый заказ
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button variant="default" size="sm">Все</Button>
        <Button variant="outline" size="sm">Ожидают</Button>
        <Button variant="outline" size="sm">В работе</Button>
        <Button variant="outline" size="sm">Готовы</Button>
      </div>

      <div className="space-y-4">
        {[...todayOrders, ...upcomingOrders].map(order => (
          <Card key={order.id} className="p-5 bg-card/50 backdrop-blur border-border/50 hover-scale cursor-pointer">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{order.clientName}</h3>
                  <Badge className={`border-0 ${order.status === 'in_progress' ? 'bg-accent/20 text-accent' : order.status === 'waiting' ? 'bg-primary/20 text-primary' : 'bg-green-500/20 text-green-500'}`}>
                    {order.status === 'in_progress' ? 'В работе' : order.status === 'waiting' ? 'Ожидает' : 'Готов'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{order.carModel}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {order.date}, {order.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="User" size={12} />
                    {order.mechanic}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{order.cost.toLocaleString()} ₽</p>
                <p className="text-xs text-muted-foreground">{order.service}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Edit" size={14} className="mr-1" />
                Изменить
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Phone" size={14} className="mr-1" />
                Позвонить
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Клиенты</h1>
        <Button className="gradient-primary">
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить
        </Button>
      </div>

      <div className="relative">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Поиск клиента..."
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-3">
        {clients.map(client => (
          <Card key={client.id} className="p-4 bg-card/50 backdrop-blur border-border/50 hover-scale cursor-pointer">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary/20 text-primary font-semibold">{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{client.name}</h3>
                  <Badge variant="outline" className="text-xs">{client.totalOrders} заказов</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{client.phone}</p>
                <p className="text-xs text-muted-foreground">{client.carModel}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>Последний визит</p>
                <p className="font-medium">{client.lastVisit}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Склад запчастей</h1>
        <Button className="gradient-primary">
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить
        </Button>
      </div>

      <div className="space-y-3">
        {inventory.map(item => (
          <Card key={item.id} className={`p-4 bg-card/50 backdrop-blur border-border/50 ${item.quantity < item.minStock ? 'border-l-4 border-l-destructive' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant={item.quantity < item.minStock ? 'destructive' : 'outline'} className="text-xs">
                    {item.quantity} {item.unit}
                  </Badge>
                  {item.quantity < item.minStock && (
                    <span className="text-xs text-destructive flex items-center gap-1">
                      <Icon name="AlertTriangle" size={12} />
                      Мало на складе
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Minus" size={14} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Аналитика</h1>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl gradient-primary">
              <Icon name="TrendingUp" size={24} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">342k</p>
              <p className="text-sm text-muted-foreground">За месяц</p>
            </div>
          </div>
          <p className="text-xs text-green-500 flex items-center gap-1">
            <Icon name="ArrowUp" size={12} />
            +12% к прошлому месяцу
          </p>
        </Card>

        <Card className="p-5 bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-accent/20">
              <Icon name="Users" size={24} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">127</p>
              <p className="text-sm text-muted-foreground">Клиентов</p>
            </div>
          </div>
          <p className="text-xs text-green-500 flex items-center gap-1">
            <Icon name="ArrowUp" size={12} />
            +8 новых
          </p>
        </Card>
      </div>

      <Card className="p-5 bg-card/50 backdrop-blur border-border/50">
        <h3 className="font-semibold mb-4">Популярные услуги</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Замена масла</span>
              <span className="text-sm font-semibold">45%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary" style={{width: '45%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Шиномонтаж</span>
              <span className="text-sm font-semibold">30%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-accent" style={{width: '30%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Диагностика</span>
              <span className="text-sm font-semibold">25%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-secondary" style={{width: '25%'}}></div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-card/50 backdrop-blur border-border/50">
        <h3 className="font-semibold mb-4">Топ мастера</h3>
        <div className="space-y-3">
          {mechanics.map((mech, idx) => (
            <div key={mech.id} className="flex items-center gap-3">
              <span className="text-xl font-bold text-muted-foreground w-6">{idx + 1}</span>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">{mech.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">{mech.name}</p>
                <p className="text-xs text-muted-foreground">{mech.specialization}</p>
              </div>
              <Badge className="bg-green-500/20 text-green-500 border-0">{12 - idx * 3} заказов</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'calendar': return renderCalendar();
      case 'orders': return renderOrders();
      case 'clients': return renderClients();
      case 'inventory': return renderInventory();
      case 'analytics': return renderAnalytics();
      default: return renderDashboard();
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
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="LayoutDashboard" size={24} />
              <span className="text-xs">Главная</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'calendar' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="Calendar" size={24} />
              <span className="text-xs">Календарь</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'orders' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="ClipboardList" size={24} />
              <span className="text-xs">Заказы</span>
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'clients' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="Users" size={24} />
              <span className="text-xs">Клиенты</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex flex-col items-center gap-1 transition-colors relative ${activeTab === 'inventory' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="Package" size={24} />
              <span className="text-xs">Склад</span>
              <span className="absolute top-0 right-2 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'analytics' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="BarChart3" size={24} />
              <span className="text-xs">Аналитика</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;