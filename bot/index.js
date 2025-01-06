require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const config = require('./config');

// Создаем экземпляр бота
const bot = new Telegraf(config.BOT_TOKEN);

// Обработка команды /start
bot.command('start', (ctx) => {
  ctx.reply(
    'Добро пожаловать в InsightFlow! 👋\nВыберите действие:',
    Markup.keyboard([
      [Markup.button.webApp(config.BUTTON_TEXT, config.WEBAPP_URL)]
    ]).resize()
  );
});

// Обработка текстовых сообщений
bot.on('text', (ctx) => {
  ctx.reply(
    'Используйте кнопку ниже, чтобы открыть приложение:',
    Markup.keyboard([
      [Markup.button.webApp(config.BUTTON_TEXT, config.WEBAPP_URL)]
    ]).resize()
  );
});

// Запускаем бота
bot.launch()
  .then(() => {
    console.log('Бот успешно запущен!');
    console.log('WebApp URL:', config.WEBAPP_URL);
  })
  .catch((err) => {
    console.error('Ошибка при запуске бота:', err);
  });

// Включаем graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 