import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  maxRetries: 1,
  timeout: 15000,
  dangerouslyAllowBrowser: true,
  organization: 'org-D5jmrxxAKGjVRcIKTUMhYaRY',
});

export default openai;
