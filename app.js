import { TOKEN } from './config.js';
import { Telegraf, Markup } from 'telegraf';
import { dishes, specialDishes } from './lists.js';

const bot = new Telegraf(TOKEN);

bot.command('start', (context) => {
  const buttons = Markup.inlineKeyboard([
    Markup.button.callback('Что за бот', 'aboutBot'),
    Markup.button.callback('🍲', 'food'),
    Markup.button.callback('🍕', 'special food')
  ]);

  context.replyWithPhoto({ source: './img/main-pic.png' })
    .then(() => {
      context.reply('Привет! Выбери, что хочешь:', buttons);
    })
    .catch((error) => {
      console.log('Ошибка при отправке фото:', error);
    });
});

bot.action('aboutBot', (context) => {
  context.reply('Рандомит блюда из списка');
  context.answerCbQuery();
});

bot.action('food', (context) => {
  const randomIndex = Math.floor(Math.random() * dishes.length);
  const randomDish = dishes[randomIndex];

  context.reply(`Держи: ${randomDish}`);
  context.answerCbQuery();
});

bot.action('special food', (context) => {
  const randomIndex = Math.floor(Math.random() * specialDishes.length);
  const randomSpecialDish = specialDishes[randomIndex];

  context.reply(`Держи: ${randomSpecialDish}`);
  context.answerCbQuery();
});

bot.launch();


// bot.command('start', (context) => {
//   const buttons = Markup.inlineKeyboard([
//     Markup.button.callback('Что за бот', 'aboutBot'),
//     Markup.button.callback('🍲', 'food'),
//     Markup.button.callback('🍕', 'special food')
//   ]);

//   context.replyWithPhoto({ source: './img/main-pic.png'});
//   context.reply('Привет! Выбери, что хочешь:', buttons);
// });