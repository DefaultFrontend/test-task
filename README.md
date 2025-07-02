# Asigna Test - Multi-Chain Wallet Connector

```bash
# Запуск dev сервера
bun run dev

# Сборка для продакшена
bun run build

# Превью production сборки
bun run preview

# Линтинг кода
bun run lint
```

## 🏗️ Архитектура модулей

Проект построен на основе **Feature-Sliced Design (FSD)**

### 📁 Структура проекта

```
src/
├── app/                    # Конфигурация приложения
│   ├── providers/          # Глобальные провайдеры (кошельки, тосты)
│   └── styles/            # Глобальные стили
├── features/              # фичи по блокчейнам
│   ├── btc/               # Bitcoin модуль
│   │   ├── api/           # API слой (sats-connect)
│   │   ├── hooks/         # React хуки
│   │   ├── model/         # Типы
│   │   └── ui/            # UI компоненты
│   └── sol/               # Solana модуль
│       ├── hooks/         # React хуки
│       └── ui/            # UI компоненты
├── shared/                # Переиспользуемый код
│   ├── api/               # Общие API утилиты
│   ├── lib/               # Утилиты и хелперы
│   └── ui/                # UI компоненты (кнопки, диалоги)
└── pages/                 # Страницы приложения
    └── home/              # Главная страница
```

### 🔧 Основные паттерны

1. **Provider Pattern** - каждый блокчейн имеет свой провайдер состояния
2. **Context API** - для глобального состояния кошельков
3. **Custom Hooks** - инкапсуляция логики работы с кошельками
4. **Compound Components** - переиспользуемые UI компоненты

## 💳 Как добавить новые кошельки

### 🔶 Добавление Solana кошелька

Solana использует стандартные адаптеры. Для добавления нового кошелька:

1. **Установить адаптер кошелька**

```bash
bun add @solana/wallet-adapter-[wallet-name]
```

2. **Добавить в SolanaProvider**

```typescript
// app/providers/SolanaProvider.tsx
import { TrustWalletAdapter } from "@solana/wallet-adapter-trust";

const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new LedgerWalletAdapter(),
    new TrustWalletAdapter(), // Новый кошелек
  ],
  []
);
```

### ⚡ Добавление Bitcoin кошелька

Bitcoin кошельки требуют расширения API:

1. **Расширить BtcWalletApi**

```typescript
// features/btc/api/walletApi.ts
export class BtcWalletApi {
  static async connectWallet(walletType: "unisat" | "xverse" | "okx"): Promise<BtcWalletConnection> {
    switch (walletType) {
      case "unisat":
        return this.connectUnisat();
      case "xverse":
        return this.connectXverse();
      case "okx":
        return this.connectOkx();
      default:
        throw new Error(`Unsupported wallet: ${walletType}`);
    }
  }

  private static async connectUnisat(): Promise<BtcWalletConnection> {
    if (!window.unisat) {
      throw new Error("Unisat wallet not found");
    }

    const accounts = await window.unisat.requestAccounts();
    const publicKey = await window.unisat.getPublicKey();

    return {
      address: accounts[0],
      publicKey: publicKey,
    };
  }
}
```

2. **Обновить типы окна**

```typescript
declare global {
  interface Window {
    unisat?: {
      requestAccounts(): Promise<string[]>;
      getPublicKey(): Promise<string>;
      signMessage(message: string): Promise<string>;
    };
    okxwallet?: {
      bitcoin: any;
    };
  }
}
```

3. **Создать компонент выбора кошелька**

```typescript
export const BtcWalletSelector = () => {
  const { connectWallet } = useBtcWalletContext();

  const wallets = [
    { id: "unisat", name: "Unisat", icon: "🦄" },
    { id: "xverse", name: "Xverse", icon: "⚡" },
    { id: "okx", name: "OKX", icon: "🔷" },
  ];

  return (
    <div className="grid gap-2">
      {wallets.map((wallet) => (
        <Button key={wallet.id} onClick={() => connectWallet(wallet.id)}>
          {wallet.icon} {wallet.name}
        </Button>
      ))}
    </div>
  );
};
```

### 🔧 Детекция доступных кошельков

```typescript
// shared/lib/walletDetection.ts
export const detectBtcWallets = () => {
  return {
    unisat: !!window.unisat,
    xverse: !!window.XverseProviders?.BitcoinProvider,
    okx: !!window.okxwallet?.bitcoin,
  };
};
```

## ⚠️ Обработка ошибок

### Уровни обработки ошибок

1. **API уровень** - try/catch в API методах
2. **Хуки** - обработка ошибок в состоянии
3. **UI уровень** - отображение состояний ошибок
4. **Глобальные уведомления** - toast сообщения

## 🔧 Что можно улучшить

### 🚀 Архитектурные улучшения

1. **Унификация подходов к кошелькам**

   ```typescript
   // Создать общий интерфейс для всех кошельков
   interface UniversalWallet {
     connect(): Promise<WalletConnection>;
     disconnect(): Promise<void>;
     signMessage(message: string): Promise<string>;
     getBalance(): Promise<number>;
   }
   ```

2. **Централизованное управление состоянием**

   - Переход на Redux Toolkit или Zustand
   - Единое хранилище для всех кошельков
   - Middleware для логирования и персистенции

3. **Улучшенная типизация ошибок**

   ```typescript
   enum WalletErrorType {
     CONNECTION_FAILED = "CONNECTION_FAILED",
     USER_REJECTED = "USER_REJECTED",
     NETWORK_ERROR = "NETWORK_ERROR",
     WALLET_NOT_FOUND = "WALLET_NOT_FOUND",
   }

   interface WalletError {
     type: WalletErrorType;
     message: string;
     code?: string;
   }
   ```

### 🎨 UX/UI улучшения

1. **Компонент выбора кошелька**

   - Единый модал для выбора кошелька
   - Автоопределение доступных кошельков
   - Настройка темы и дефолтных стилей проекта

2. **Состояния загрузки**

   - Скелетоны вместо спиннеров
   - Прогресс подключения
   - Анимированные переходы

3. **Улучшенная обработка ошибок**
   - Retry механизм
   - Предложения по решению проблем
   - Ссылки на установку кошельков

### 🔧 Технические улучшения

1. **Кэширование и оптимизация**

   ```typescript
   // React Query для кэширования запросов
   const { data: balance } = useQuery({
     queryKey: ["balance", address],
     queryFn: () => walletApi.getBalance(address),
     staleTime: 30000,
   });
   ```

2. **Тестирование**

   - Unit тесты для хуков
   - Integration тесты для API
   - E2E тесты для пользовательских сценариев

3. **Мониторинг и аналитика**

   - Отслеживание ошибок (Sentry)
   - Метрики подключений
   - Пользовательская аналитика

## Баги

- toast.dismiss не отрабатывает при ошибке подключения кошелька в btc, причины не ясны

## Стек

- **React 19** - UI фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Vite** - сборщик
- **sats-connect** - Bitcoin кошельки
- **@solana/wallet-adapter** - Solana кошельки
- **sonner** - уведомления
- **Radix UI** - UI примитивы
