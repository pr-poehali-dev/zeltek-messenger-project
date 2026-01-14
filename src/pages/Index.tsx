import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'email' | 'phone'>('email');
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const mockChats = [
    { id: 1, name: 'Анна Иванова', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 3, avatar: 'AI', online: true },
    { id: 2, name: 'Рабочая группа', lastMessage: 'Совещание в 15:00', time: '13:45', unread: 0, avatar: 'РГ', online: false },
    { id: 3, name: 'Максим', lastMessage: 'Отправил файлы', time: '12:10', unread: 1, avatar: 'М', online: true },
  ];

  const mockChannels = [
    { id: 1, name: 'Tech News', username: '@technews', subscribers: '12.5K', avatar: 'TN' },
    { id: 2, name: 'Дизайн и UX', username: '@designux', subscribers: '8.2K', avatar: 'DU' },
  ];

  const mockGroups = [
    { id: 1, name: 'Проект ZELTEK', members: 24, avatar: 'PZ' },
    { id: 2, name: 'Друзья', members: 15, avatar: 'Д' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <Card className="w-full max-w-md p-8 neon-border-red backdrop-blur-sm bg-card/90 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ZELTEK
            </h1>
            <p className="text-muted-foreground">Современный мессенджер будущего</p>
          </div>

          <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'email' | 'phone')} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 neon-border-blue">
              <TabsTrigger value="email" className="data-[state=active]:neon-glow-blue">
                <Icon name="Mail" size={16} className="mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="data-[state=active]:neon-glow-orange">
                <Icon name="Phone" size={16} className="mr-2" />
                Телефон
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  className="neon-border-blue focus:neon-glow-blue transition-all"
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="neon-border-blue focus:neon-glow-blue transition-all"
                />
              </div>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4">
              <div>
                <Label htmlFor="phone">Номер телефона</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+7 (999) 123-45-67" 
                  className="neon-border-orange focus:neon-glow-orange transition-all"
                />
              </div>
              <div>
                <Label htmlFor="code">Код подтверждения</Label>
                <Input 
                  id="code" 
                  type="text" 
                  placeholder="000000" 
                  className="neon-border-orange focus:neon-glow-orange transition-all"
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            onClick={() => setIsAuthenticated(true)} 
            className="w-full neon-glow-red bg-primary hover:bg-primary/90 transition-all transform hover:scale-105"
          >
            Войти в ZELTEK
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Нет аккаунта? <span className="text-primary cursor-pointer hover:underline">Зарегистрироваться</span>
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background">
      <aside className="w-20 bg-card border-r border-border flex flex-col items-center py-6 space-y-6">
        <div className="text-3xl font-bold bg-gradient-to-b from-primary via-secondary to-accent bg-clip-text text-transparent">
          Z
        </div>

        {[
          { icon: 'MessageSquare', tab: 'chats', color: 'red' },
          { icon: 'Users', tab: 'contacts', color: 'blue' },
          { icon: 'Radio', tab: 'channels', color: 'orange' },
          { icon: 'UsersRound', tab: 'groups', color: 'red' },
          { icon: 'User', tab: 'profile', color: 'blue' },
          { icon: 'Settings', tab: 'settings', color: 'orange' },
        ].map(({ icon, tab, color }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-3 rounded-xl transition-all ${
              activeTab === tab 
                ? `neon-glow-${color} bg-${color === 'red' ? 'primary' : color === 'blue' ? 'secondary' : 'accent'}` 
                : 'hover:bg-muted'
            }`}
          >
            <Icon name={icon} size={24} />
          </button>
        ))}

        <div className="flex-1" />

        <button className="p-3 rounded-xl hover:bg-muted transition-all">
          <Icon name="HeadphonesIcon" size={24} />
        </button>
      </aside>

      <div className="w-80 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {activeTab === 'chats' && 'Чаты'}
              {activeTab === 'contacts' && 'Контакты'}
              {activeTab === 'channels' && 'Каналы'}
              {activeTab === 'groups' && 'Группы'}
              {activeTab === 'profile' && 'Профиль'}
              {activeTab === 'settings' && 'Настройки'}
            </h2>
            
            {(activeTab === 'channels' || activeTab === 'groups') && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="neon-glow-red bg-primary">
                    <Icon name="Plus" size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="neon-border-blue">
                  <DialogHeader>
                    <DialogTitle>Создать {activeTab === 'channels' ? 'канал' : 'группу'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Название</Label>
                      <Input placeholder="Введите название" className="neon-border-blue" />
                    </div>
                    <div>
                      <Label>Username</Label>
                      <Input placeholder="@username" className="neon-border-orange" />
                    </div>
                    <div>
                      <Label>Описание</Label>
                      <Textarea placeholder="О чём этот канал?" className="neon-border-red" />
                    </div>
                    <Button className="w-full neon-glow-red bg-primary">Создать</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <Input 
            placeholder="Поиск..." 
            className="neon-border-blue focus:neon-glow-blue transition-all"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'chats' && mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b border-border cursor-pointer hover:bg-muted transition-all ${
                selectedChat === chat.id ? 'bg-muted neon-border-red' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card neon-glow-blue"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="ml-2 bg-primary neon-glow-red">{chat.unread}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'channels' && mockChannels.map((channel) => (
            <div
              key={channel.id}
              className="p-4 border-b border-border cursor-pointer hover:bg-muted transition-all"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-secondary to-accent">
                    {channel.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{channel.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{channel.username}</p>
                    <span className="text-xs text-muted-foreground">{channel.subscribers}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'groups' && mockGroups.map((group) => (
            <div
              key={group.id}
              className="p-4 border-b border-border cursor-pointer hover:bg-muted transition-all"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-accent to-primary">
                    {group.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">{group.members} участников</p>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'profile' && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4 neon-glow-blue">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary via-secondary to-accent">
                    ВЫ
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Ваше имя</h3>
                <p className="text-muted-foreground">@username</p>
                <Badge className="mt-2 neon-glow-orange bg-accent">+7 999 123-45-67</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <Label className="text-xs text-muted-foreground">Bio</Label>
                  <p className="text-sm">Пользователь ZELTEK</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p className="text-sm">user@zeltek.app</p>
                </div>
              </div>

              <Button className="w-full neon-glow-red bg-primary">
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать профиль
              </Button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-primary">Безопасность</h3>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg neon-border-blue">
                  <div>
                    <Label>Двухфакторная аутентификация</Label>
                    <p className="text-xs text-muted-foreground">Дополнительная защита</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <Label>Привязать второй номер</Label>
                    <p className="text-xs text-muted-foreground">Для восстановления</p>
                  </div>
                  <Button size="sm" variant="outline" className="neon-border-orange">
                    Добавить
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-secondary">Уведомления</h3>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <Label>Звук сообщений</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <Label>Уведомления групп</Label>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-accent">Боты</h3>
                <Button className="w-full neon-glow-orange bg-accent">
                  <Icon name="Bot" size={16} className="mr-2" />
                  Создать своего бота
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="p-6 space-y-4">
              <Button className="w-full neon-glow-blue bg-secondary">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Добавить контакт
              </Button>
              <div className="text-center text-muted-foreground text-sm">
                Контакты появятся здесь
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-muted/30">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                    {mockChats.find(c => c.id === selectedChat)?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{mockChats.find(c => c.id === selectedChat)?.name}</h3>
                  <p className="text-xs text-muted-foreground">онлайн</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="neon-border-blue hover:neon-glow-blue">
                  <Icon name="Phone" size={18} />
                </Button>
                <Button size="sm" variant="ghost" className="neon-border-orange hover:neon-glow-orange">
                  <Icon name="Video" size={18} />
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="MoreVertical" size={18} />
                </Button>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div className="flex justify-start">
                <div className="bg-card p-3 rounded-2xl rounded-tl-none max-w-md neon-border-blue">
                  <p>Привет! Как дела?</p>
                  <span className="text-xs text-muted-foreground">14:30</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary p-3 rounded-2xl rounded-tr-none max-w-md neon-glow-red">
                  <p>Отлично! А у тебя?</p>
                  <span className="text-xs text-primary-foreground/70">14:31</span>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-card p-3 rounded-2xl rounded-tl-none max-w-md neon-border-orange">
                  <p>Тоже всё хорошо! Попробовал новый ZELTEK?</p>
                  <span className="text-xs text-muted-foreground">14:32</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="hover:neon-glow-blue">
                  <Icon name="Paperclip" size={18} />
                </Button>
                <Button size="sm" variant="ghost" className="hover:neon-glow-orange">
                  <Icon name="Smile" size={18} />
                </Button>
                <Input 
                  placeholder="Сообщение..." 
                  className="flex-1 neon-border-blue focus:neon-glow-blue transition-all"
                />
                <Button size="sm" variant="ghost" className="hover:neon-glow-red">
                  <Icon name="Mic" size={18} />
                </Button>
                <Button size="sm" className="neon-glow-red bg-primary">
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ZELTEK
              </div>
              <p className="text-muted-foreground">Выберите чат, чтобы начать общение</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
