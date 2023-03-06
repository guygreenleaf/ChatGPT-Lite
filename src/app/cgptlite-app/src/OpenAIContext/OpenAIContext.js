import { Configuration, OpenAIApi } from "openai";

export default class OpenAIContext{
    constructor(){
        this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        this.openAIContext = new OpenAIApi(new Configuration({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY
          }));
    }

    async SubmitPrompt(prompt){
        const response = await this.openAIContext.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role:"user", content:prompt}] ,
          temperature: 0.4,
          max_tokens: 256,
          frequency_penalty: 0,
          presence_penalty: 0,
      });
      return response.data.choices[0].message.content;
    }
}