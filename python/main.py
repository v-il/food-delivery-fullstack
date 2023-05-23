import telebot
import requests

bot = telebot.TeleBot('6092271983:AAGxi1aqDoqPkgNRLu5SugSF4WeeN42ZGas')
user_state = {}

@bot.message_handler(commands=['start'])
def start(message):
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    auth_button = telebot.types.KeyboardButton('Авторизоваться')
    catalog_button = telebot.types.KeyboardButton('Каталог')
    orders_button = telebot.types.KeyboardButton('Заказы')
    cart_button = telebot.types.KeyboardButton('Корзина')
    markup.add(auth_button, catalog_button, orders_button, cart_button)
    bot.send_message(message.chat.id, 'Привет! Нажми на кнопку "Авторизоваться", чтобы авторизоваться на сайте.', reply_markup=markup)

@bot.message_handler(func=lambda message: message.text == 'Авторизоваться')
def auth(message):
    tg_id = message.from_user.id
    url = f'http://backend:5000/tg-auth/{tg_id}'
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

@bot.message_handler(func=lambda message: message.text == 'Каталог')
def products(message):
    url = 'http://backend:5000/categories'
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
            for product in data:
                name = product.get('name')
                button = telebot.types.KeyboardButton(name)
                markup.add(button)
            back_button = telebot.types.KeyboardButton('Назад')
            markup.add(back_button)
            user_state[message.chat.id] = 'Каталог'
            bot.send_message(message.chat.id, 'Выберите категорию:', reply_markup=markup)
        else:
            bot.send_message(message.chat.id, 'Произошла ошибка при получении списка продуктов')

    except requests.RequestException:
        bot.send_message(message.chat.id, 'Произошла ошибка при подключении к серверу')

@bot.message_handler(func=lambda message: True, content_types=['text'])
def handle_message(message):
    if message.text == 'Назад':
        user_state[message.chat.id] = None
        start(message)
    elif user_state.get(message.chat.id) == 'Каталог':
        select_category(message)

def select_category(message):
    category = message.text
    url = f'http://backend:5000/categories/items/{category}'

    try:
        response = requests.get(url)
        if response.status_code == 200:
            products = response.json()
            markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
            for product in products:
                name = product.get('name')
                if product.get('different_sizes') == True:
                    size = product.get('size')
                    price = product.get('price')
                    button_text = f'{name}\nРазмер: {size}\nЦена: {price}'
                    button = telebot.types.KeyboardButton(button_text)
                else:
                    button = telebot.types.KeyboardButton(name)
                markup.add(button)
            back_button = telebot.types.KeyboardButton('Назад')
            markup.add(back_button)
            user_state[message.chat.id] = 'products'
            bot.send_message(message.chat.id, 'Выберите товар:', reply_markup=markup)
        else:
            bot.send_message(message.chat.id, 'Произошла ошибка при получении продуктов')

    except requests.RequestException:
        bot.send_message(message.chat.id, 'Произошла ошибка при подключении к серверу')

@bot.message_handler(func=lambda message: message.text == 'Заказы')
def orders(message):
    bot.send_message(message.chat.id, 'Вы выбрали опцию "Заказы"')

@bot.message_handler(func=lambda message: message.text == 'Корзина')
def cart(message):
    bot.send_message(message.chat.id, 'Вы выбрали опцию "Корзина"')

bot.polling()