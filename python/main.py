import telebot
import requests
import json
import random
import string


bot = telebot.TeleBot('6092271983:AAGxi1aqDoqPkgNRLu5SugSF4WeeN42ZGas')
user_state = {}


@bot.message_handler(commands=['start'])
def start(message):
    # Добавить проверку на авторизацию, чтобы не просило авторизоваться всегда?
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
    tg_name = message.from_user.username
    payload = {'tg_id': tg_id, 'tg_name': tg_name}
    headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
    r = requests.post('http://backend:5000/user/auth', data=payload, headers=headers)
    url = f'http://backend:5000/user/tg-auth/{tg_id}'
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


@bot.message_handler(func=lambda message: message.text == 'Назад')
def backb(message):
    if user_state.get(message.chat.id) == 'Каталог':
        user_state[message.chat.id] = None
        start(message)
    elif user_state.get(message.chat.id) == 'Селектор':
        user_state[message.chat.id] = 'Каталог'
        products(message)
    elif user_state.get[message.chat.id] = 'Корзина':
        user_state[message.chat.id] = None
        start(message)


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
            user_state[message.chat.id] = 'Каталог'
            back_button = telebot.types.KeyboardButton('Назад')
            markup.add(back_button)
            bot.send_message(message.chat.id, 'Выберите категорию:', reply_markup=markup)
        else:
            bot.send_message(message.chat.id, 'Произошла ошибка при получении списка продуктов')

    except requests.RequestException:
        bot.send_message(message.chat.id, 'Произошла ошибка при подключении к серверу')


@bot.message_handler(func=lambda message: message.text == 'Корзина')
def cart(message):
    # Инициализировать корзину только после выбора товара
    # bot.send_message(message.chat.id, 'Вы выбрали опцию "Корзина"')
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    # check_cart = telebot.types.KeyboardButton('Содержимое корзины')
    # back_button = telebot.types.KeyboardButton('Назад')
    # markup.add(check_cart, back_button)
    # user_state[message.chat.id] = 'Корзина'
    tg_id = message.from_user.id
    payload = {"tg_uid": tg_id}
    headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
    response = requests.post(f'http://backend:5000/carts', data=payload, headers=headers)
    if response.status_code == 201:
        bot.send_message(message.chat.id, 'Корзина успешно создана.')
    else:
        bot.send_message(message.chat.id, 'Произошла ошибка при добавлении корзины в базу данных')
    # Добавить функцию заказа и фукнцию приема парс строки с товаром


@bot.message_handler(func=lambda message: True, content_types=['text'])
def selector(message):
    if user_state.get(message.chat.id) == 'Каталог':
        if message.text == 'pizza':
            select_category(message)
        elif message.text == 'snacks':
            select_category(message)
        elif message.text == 'desserts':
            select_category(message)
        elif message.text == 'drinks':
            select_category(message)
        else:
            bot.send_message(message.chat.id, f'Раздел {message.text} в разработке.')
            user_state[message.chat.id] = None
            start(message)
    elif user_state.get(message.chat.id) == 'Селектор':
        msg = message.text
        bot.send_message(message.chat.id, f'MSG: {msg}')
        # Распарсить три строки и связять с корзиной
        # cart(message)
        bot.send_message(message.chat.id, f'Товар добавлен в корзину') # еще нет
        user_state.get(message.chat.id) == None
    else:
        user_state[message.chat.id] = None
        start(message)
        pass

def select_category(message):
    category = message.text
    url = f'http://backend:5000/categories/items/{category}'

    try:
        response = requests.get(url)
        if response.status_code == 200:
            size_map = {'small': 'маленький', 'medium': 'средний', 'big': 'большой', '0.5': '0.5 л', '2': '2 л'}
            data = response.json()
            markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
            for product in data['items']:
                name = product.get('name')
                if product.get('different_sizes') == True:
                    for sizes in product["sizes"]:
                        size = sizes.get('type')
                        price = sizes.get('price')
                        button_text = f'{name}\nРазмер: {size_map.get(size)}\nЦена: {price}'
                        button = telebot.types.KeyboardButton(button_text)
                        markup.add(button)
                else:
                    button = telebot.types.KeyboardButton(name)
                    markup.add(button)
            user_state[message.chat.id] = 'Селектор'
            back_button = telebot.types.KeyboardButton('Назад')
            markup.add(back_button)
            bot.send_message(message.chat.id, 'Выберите товар:', reply_markup=markup)
        else:
            bot.send_message(message.chat.id, 'Произошла ошибка при получении продуктов')

    except requests.RequestException:
        bot.send_message(message.chat.id, 'Произошла ошибка при подключении к серверу')


@bot.message_handler(func=lambda message: message.text == 'Заказы')
def orders(message):
    bot.send_message(message.chat.id, 'Вы выбрали опцию "Заказы"')


bot.polling()