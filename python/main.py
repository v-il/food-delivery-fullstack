import telebot
import requests

bot = telebot.TeleBot('6092271983:AAGxi1aqDoqPkgNRLu5SugSF4WeeN42ZGas')


@bot.message_handler(commands=['start'])
def start(message):
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    auth_button = telebot.types.KeyboardButton('Авторизоваться')
    # catalog_button = telebot.types.KeyboardButton('/products') Шаблоны кнопок
    # orders_button = telebot.types.KeyboardButton('/orders')
    # cart_button = telebot.types.KeyboardButton('/cart')
    # markup.add(auth_button, catalog_button, orders_button, cart_button)
    markup.add(auth_buttonn)
    bot.send_message(message.chat.id, 'Привет! Нажми на кнопку ниже, чтобы авторизоваться.', reply_markup=markup)


@bot.message_handler(func=lambda message: message.text == 'Авторизоваться')
def auth(message):
    tg_id = message.from_user.id

    # Формируем URL для запроса на сервер
    url = f'backend:5000/tg-auth/{tg_id}'  # поставь свой

    try:
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            link = data.get('link')

            bot.send_message(message.chat.id, f'Для авторизации перейдите по ссылке: {link}')
        else:
            bot.send_message(message.chat.id, 'Произошла ошибка при получении ссылки на авторизацию')

    except requests.RequestException:
        bot.send_message(message.chat.id, 'Произошла ошибка при подключении к серверу')


# @bot.message_handler(func=lambda message: message.text == 'products') если так, то в клавиатуре заменить /products на products
# @bot.message_handler(commands=['products'])  если так, то ничего менять не нужно
# def show_catalog(message):
#     bot.reply_to(message, "Here is the catalog.")

# @bot.message_handler(commands=['orders'])
# def show_orders(message):
#     bot.reply_to(message, "Here are your orders.")

# @bot.message_handler(commands=['cart'])
# def show_cart(message):
#     bot.reply_to(message, "Here is your cart.")


bot.polling()