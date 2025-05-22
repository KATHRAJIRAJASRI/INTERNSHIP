const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.summarizeAndSend = async (req, res) => {
  try {
    const { data: todos } = await supabase.from('todos').select('*').eq('completed', false);

    const prompt = `Summarize the following todos:\n${todos.map(t => '- ' + t.title).join('\n')}`;
    
    const gptRes = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    const summary = gptRes.data.choices[0].message.content;
    await axios.post(process.env.SLACK_WEBHOOK_URL, { text: summary });

    res.status(200).json({ message: 'Summary sent to Slack successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating or sending summary.' });
  }
};
