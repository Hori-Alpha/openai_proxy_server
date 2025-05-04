// 必要なモジュールをインポート
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

// Express アプリを作成
const app = express();
app.use(express.json());

// CORS 設定
app.use(cors({
    origin: 'https://chat.openai.com', // 許可するオリジン
}));

// 環境変数のロード
require('dotenv').config();
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

// POST /suggest エンドポイント
app.post('/suggest', async (req, res) => {
    try {
        const { history } = req.body;

        const response = await openai.createChatCompletion({
            model: 'gpt-4.1-nano-2025-04-14',
            messages: history,
            max_tokens: 200,
            temperature: 0.7,
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// サーバーを起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});