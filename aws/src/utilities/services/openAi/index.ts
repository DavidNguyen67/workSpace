import openai from '@/utilities/openAi';

export const sendMessage = async (message: string) => {
  const response = await openai.completions.create({
    model: 'davinci-002',
    prompt: message,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response);
  return response.choices[0].text;
};
