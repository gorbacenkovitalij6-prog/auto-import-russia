import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, budget, message } = body;

    // Проверка обязательных полей
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны для заполнения' },
        { status: 400 }
      );
    }

    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    // Проверка наличия конфигурации
    if (!botToken || !chatId) {
      console.error('Telegram bot не настроен. Проверьте .env.local');
      return NextResponse.json(
        { error: 'Сервис временно недоступен' },
        { status: 500 }
      );
    }

    // Проверка, что токен и chat ID не являются placeholder значениями
    if (botToken === 'YOUR_BOT_TOKEN_HERE' || chatId === 'YOUR_CHAT_ID_HERE') {
      console.error('Telegram bot не настроен. Замените YOUR_BOT_TOKEN_HERE и YOUR_CHAT_ID_HERE в .env.local');
      // В режиме разработки вернем успех, чтобы протестировать UI
      if (process.env.NODE_ENV === 'development') {
        console.log('Режим разработки: форма работает, но сообщения не отправляются');
        console.log('Данные формы:', { name, phone, budget, message });
        return NextResponse.json({ success: true, dev_mode: true });
      }
      return NextResponse.json(
        { error: 'Сервис временно недоступен' },
        { status: 500 }
      );
    }

    // Формирование сообщения для Telegram
    const telegramMessage = `
🚗 <b>Новая заявка с сайта пригона авто!</b>

👤 <b>Имя:</b> ${name}
📱 <b>Телефон:</b> ${phone}
${budget ? `💰 <b>Бюджет:</b> ${budget}` : ''}
${message ? `💬 <b>Комментарий:</b>\n${message}` : ''}

⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
    `.trim();

    // Отправка сообщения в Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Ошибка Telegram API:', data);
      return NextResponse.json(
        { error: 'Ошибка при отправке сообщения' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
