require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

// Конфигурация из переменных окружения
const BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN';
const WEBAPP_URL = 't.me/Insight2b_bot/insight2b';
const CHANNEL_ID = process.env.CHANNEL_ID || '@your_channel';
const BUTTON_TEXT = 'Открыть InsightFlow';

// Создаем экземпляр бота
const bot = new Telegraf(BOT_TOKEN);

// Обработка команды /start
bot.command('start', (ctx) => {
  ctx.reply(
    'Добро пожаловать в InsightFlow! 👋\nВыберите действие:',
    Markup.keyboard([
      [Markup.button.webApp(BUTTON_TEXT, WEBAPP_URL)]
    ]).resize()
  );
});

// Команда для отправки сообщения в канал
bot.command('share', async (ctx) => {
  try {
    // Проверяем, является ли бот администратором канала
    const chatMember = await ctx.telegram.getChatMember(CHANNEL_ID, ctx.botInfo.id);
    
    if (!['administrator', 'creator'].includes(chatMember.status)) {
      return ctx.reply('Ошибка: бот должен быть администратором канала');
    }

    // Отправляем сообщение в канал
    await ctx.telegram.sendMessage(
      CHANNEL_ID,
      "Всем проблемам инсайт! 💡\n\nПрисоединяйтесь к решению бизнес-задач с помощью ТРИЗ.",
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Открыть приложение', url: WEBAPP_URL }]
          ]
        }
      }
    );
    
    ctx.reply('Сообщение успешно отправлено в канал! ✅');
  } catch (error) {
    console.error('Ошибка при отправке в канал:', error);
    ctx.reply('Произошла ошибка при отправке сообщения в канал');
  }
});

// Обработка текстовых сообщений
bot.on('text', (ctx) => {
  ctx.reply(
    'Используйте кнопку ниже, чтобы открыть приложение:',
    Markup.keyboard([
      [Markup.button.webApp(BUTTON_TEXT, WEBAPP_URL)]
    ]).resize()
  );
});

// Запускаем бота
bot.launch()
  .then(() => {
    console.log('Бот успешно запущен!');
    console.log('WebApp URL:', WEBAPP_URL);
  })
  .catch((err) => {
    console.error('Ошибка при запуске бота:', err);
  });

// Включаем graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 