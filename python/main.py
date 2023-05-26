import telebot
import requests
from telebot import types
import json
import string


bot = telebot.TeleBot('6092271983:AAGxi1aqDoqPkgNRLu5SugSF4WeeN42ZGas')
user_state = {}
product_map = {}
auth_state = {}
cart_state = {}
cart_id = ''
item_id_storage = 0

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
        tg_id = message.from_user.id
        tg_name = message.from_user.username
        payload = {'tg_id': tg_id, 'tg_name': tg_name}
        headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
        r = requests.post('http://45.12.73.234:5000/user/auth', data=payload, headers=headers)
        url = f'http://45.12.73.234:5000/user/tg-auth/{tg_id}'
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
    elif user_state.get(message.chat.id) == 'Корзина':
        user_state[message.chat.id] = None
        start(message)
    elif user_state.get(message.chat.id) == 'Заказы':
        user_state[message.chat.id] = None
        start(message)


@bot.message_handler(func=lambda message: message.text == 'Каталог')
def products(message):
    url = 'http://45.12.73.234:5000/categories'
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
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    response = requests.get(f'http://45.12.73.234:5000/carts/tg/{tg_id}', headers=headers)
    cart_message = 'В вашей корзине:\n'
    if response.status_code == 200:
        items = response.json().get('items')
        for item in items:
            name = item['name']
            size = item['CartItem']['tg_front_size']
            price = item['CartItem']['total_price']
            count = item['CartItem']['number']
            cart_message += f'{name}, размер: {size}, {count} шт. цена: {price}р.\n'
        user_state[message.chat.id] = 'Корзина'
        back_button = telebot.types.KeyboardButton('Назад')
        markup.add(back_button)
        remove = telebot.types.KeyboardButton('Удалить товар из корзины')
        markup.add(remove)
        bot.send_message(message.chat.id, cart_message, reply_markup=markup)
    else:
        bot.send_message(message.chat.id, 'Произошла ошибка при получении содержимого корзины')

def create_inline_keyboard(items):
    keyboard = types.InlineKeyboardMarkup()
    for item in items:
        name = item['name']
        size = item['CartItem']['tg_front_size']
        price = item['CartItem']['total_price']
        count = item['CartItem']['number']
        item_id = item['CartItem']['id']
        callback_data = f"remove_item_{item_id}"
        button = types.InlineKeyboardButton(f"{name}, размер: {size}, у вас {count} шт. цена: {price}р.", callback_data=callback_data)
        keyboard.add(button)
    return keyboard


@bot.callback_query_handler(func=lambda call: call.data.startswith('remove_item_'))
def handle_remove_item_callback(call):
    item_id = call.data.split('_')[2]
    remove_item(call.message, item_id)


def remove_item(message, item_id):
    tg_id = message.from_user.id
    headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    payload = {"cart_item_id": item_id}
    response = requests.post(f'http://45.12.73.234:5000/cart-items/decrement', data=payload, headers=headers)
    user_state[message.chat.id] = 'Корзина'
    back_button = telebot.types.KeyboardButton('Назад')
    markup.add(back_button)
    if response.status_code == 201:
        bot.send_message(message.chat.id, 'Товар удален\n', reply_markup=markup)
    else:
        bot.send_message(message.chat.id, 'error', item_id)


@bot.message_handler(func=lambda message: message.text == 'Удалить товар из корзины')
def cart_remove(message):
    tg_id = message.from_user.id
    headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    response = requests.get(f'http://45.12.73.234:5000/carts/tg/{tg_id}', headers=headers)
    cart_message = 'Выберете какой товар удалить:\n'
    if response.status_code == 200:
        items = response.json().get('items')
        keyboard = create_inline_keyboard(items)
        bot.send_message(message.chat.id, cart_message, reply_markup=keyboard)



def cart_init(message):
    if cart_state.get(message.chat.id) != '1':
        tg_id = message.from_user.id
        payload = {"tg_uid": tg_id}
        headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
        response = requests.post(f'http://45.12.73.234:5000/carts', data=payload, headers=headers)
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

@bot.message_handler(func=lambda message: message.text == 'Заказы')
def orders(message):
    tg_id = message.from_user.id
    headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    response = requests.get(f'http://45.12.73.234:5000/carts/tg/{tg_id}', headers=headers)
    cart_message = 'В вашей корзине:\n'
    total_count = 0
    if response.status_code == 200:
        items = response.json().get('items')
        for item in items:
            name = item['name']
            size = item['CartItem']['tg_front_size']
            price = item['CartItem']['total_price']
            count = item['CartItem']['number']
            total_count += int(price)
            cart_message += f'{name}, размер: {size}, {count} шт. цена: {price}р.\n'
    cart_message += f'Общая стоимость заказа - {total_count}\n'
    bot.send_message(message.chat.id, cart_message)
    bot.send_message(message.chat.id, 'Введите имя:', reply_markup=markup)
    bot.register_next_step_handler(message, process_name, tg_id)


def process_name(message, tg_id):
    name = message.text
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    bot.send_message(message.chat.id, 'Введите адрес:', reply_markup=markup)
    bot.register_next_step_handler(message, process_address, tg_id, name)


def process_address(message, tg_id, name):
    address = message.text
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    bot.send_message(message.chat.id, 'Введите время доставки:', reply_markup=markup)
    bot.register_next_step_handler(message, process_delivery_time, tg_id, name, address)


def process_delivery_time(message, tg_id, name, address):
    delivery_time = message.text
    markup = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    bot.send_message(message.chat.id, 'Введите комментарий:', reply_markup=markup)
    bot.register_next_step_handler(message, process_comment, tg_id, name, address, delivery_time)


def process_comment(message, tg_id, name, address, delivery_time):
    comment = message.text
    headers = {'API-KEY': 'CUeKOImqICnGsLgy0T0x'}
    payload = {
        'tg_id': tg_id,
        'name': str(name),
        'address': str(address),
        'delivery_time': str(delivery_time),
        'comment': str(comment),
        'cart_id': str(cart_id)
    }
    response = requests.post('http://45.12.73.234:5000/orders', json=payload, headers=headers)
    if response.status_code == 201:
        link = response.json().get('link')
        payment_link = f"http://45.12.73.234:5000/pay?code={link}"
        bot.send_message(message.chat.id, f"Ваш заказ оформлен. Оплатить: {payment_link}")
        cart_state[message.from_user.id] = '0'
    else:
        bot.send_message(message.chat.id, 'Ошибка при оформлении заказа')


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
        response = requests.post(f'http://45.12.73.234:5000/cart-items/add', data=payload, headers=headers)
        bot.send_message(message.chat.id, f'Товар добавлен в корзину.')
        user_state.get(message.chat.id) == None
        # start(message)
    elif user_state.get(message.chat.id) == 'Заказы':
        orders(message)
    else:
        user_state[message.chat.id] = None
        start(message)
        pass

def select_category(message):
    category = message.text
    url = f'http://45.12.73.234:5000/categories/items/{category}'
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



bot.polling()
