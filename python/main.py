import telebot
import requests
import json
import string


bot = telebot.TeleBot('6092271983:AAGxi1aqDoqPkgNRLu5SugSF4WeeN42ZGas')
user_state = {}
product_map = {}
auth_state = {}
cart_state = {}
cart_id = ''


@bot.message_handler(commands=['start'])
def start(message):
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    auth_button = telebot.types.KeyboardButton('Авторизоваться')
    catalog_button = telebot.types.KeyboardButton('Каталог')
    orders_button = telebot.types.KeyboardButton('Заказы')
    cart_button = telebot.types.KeyboardButton('Корзина')
    cart_init(message)
    markup.add(auth_button, catalog_button, orders_button, cart_button)
    if auth_state.get(message.chat.id) == '1':
        bot.send_message(message.chat.id, 'Ты вернулся в начало.', reply_markup=markup)
    else:
        bot.send_message(message.chat.id, 'Привет! Нажми на кнопку "Авторизоваться", чтобы авторизоваться на сайте.', reply_markup=markup)


@bot.message_handler(func=lambda message: message.text == 'Авторизоваться')
def auth(message):
    if auth_state.get(message.chat.id) == '1':
        bot.send_message(message.chat.id, 'Вы уже авторизованы.')
    else:
        tg_id = message.from_user.id
        tg_name = message.from_user.username
        payload = {'tg_id': tg_id, 'tg_name': tg_name}
        headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
        r = requests.post('http://backend:5000/user/auth', data=payload, headers=headers)
        url = f'http://backend:5000/user/tg-auth/{tg_id}'
        try:
            response = requests.get(url)
            if response.status_code == 200:
                auth_state[message.from_user.id] = '1'
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
    elif user_state.get[message.chat.id] == 'Корзина':
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


def cart_info(message):
    tg_id = message.from_user.id
    headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
    response = requests.get(f'http://backend:5000/carts/tg/{tg_id}', headers=headers)
    cart_message = 'В вашей корзине:\n'
    if response.status_code == 200:
        items = response.json().get('items')
        for item in items:
            name = item['name']
            size = item['CartItem']['tg_front_size']
            price = item['CartItem']['total_price']
            cart_message += f'{name}, размер: {size}, цена: {price}р.\n'
        bot.send_message(message.chat.id, cart_message)
    else:
        bot.send_message(message.chat.id, 'Произошла ошибка при получении содержимого корзины')


def cart_init(message):
    if cart_state.get(message.chat.id) != '1':
        tg_id = message.from_user.id
        payload = {"tg_uid": tg_id}
        headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
        response = requests.post(f'http://backend:5000/carts', data=payload, headers=headers)
        if response.status_code == 201:
            global cart_id
            cart_id = response.json().get('string_id')
            cart_state[message.from_user.id] = '1'
        else:
            bot.send_message(message.chat.id, 'Произошла ошибка при добавлении корзины в базу данных')


@bot.message_handler(func=lambda message: message.text == 'Корзина')
def handle_cart(message):
    if cart_state.get(message.chat.id) == '1':
        cart_info(message)
    else:
        cart_init(message)
        cart_info(message)


@bot.message_handler(func=lambda message: True, content_types=['text'])
def selector(message):
    if cart_state.get(message.chat.id) != '1':
        cart_init(message)
    if user_state.get(message.chat.id) == 'Каталог':
        if message.text == 'pizza':
            select_category(message)
        elif message.text == 'snacks':
            select_category(message)
        elif message.text == 'desserts':
            select_category(message)
        elif message.text == 'drinks':
            select_category(message)
        elif message.text == 'burgers':
            select_category(message)
        elif message.text == 'combo':
            select_category(message)
        else:
            bot.send_message(message.chat.id, f'Раздел {message.text} в разработке.')
            user_state[message.chat.id] = None
            start(message)
    elif user_state.get(message.chat.id) == 'Селектор':
        msg = message.text.split('\n')
        msg_size = msg[1].split(':')
        payload = {"cart_id":cart_id, "item_id":int(product_map[f'{msg[0].strip()}:{msg_size[1].strip()}']), "size":msg_size[1].strip()}
        headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
        response = requests.post(f'http://backend:5000/cart-items/add', data=payload, headers=headers)
        bot.send_message(message.chat.id, f'Товар добавлен в корзину.')
        user_state.get(message.chat.id) == None
        # start(message)
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
            data = response.json()
            markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
            product_map.clear()
            for product in data['items']:
                name = product.get('name')
                id = product.get('id')
                if product.get('different_sizes') == True:
                    for sizes in product["sizes"]:
                        size = sizes.get('type')
                        price = sizes.get('price')
                        button_text = f'{name} \nРазмер: {size}\nЦена: {price}'
                        button = telebot.types.KeyboardButton(button_text)
                        markup.add(button)
                        product_map[f'{name}:{size}'] = id
                else:
                    button = telebot.types.KeyboardButton(name)
                    markup.add(button)
                    product_map[f'{name} {size}'] = id
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
