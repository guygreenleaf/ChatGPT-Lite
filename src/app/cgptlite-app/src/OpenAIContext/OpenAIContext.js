import { Configuration, OpenAIApi } from "openai";

export default class OpenAIContext{
    constructor(){}

    async SubmitPrompt(prompt){

      let openAIContext = new OpenAIApi(new Configuration({
        apiKey: `${localStorage.getItem('openAiApiKey')}`
      }));

      let response = await openAIContext.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role:"user", content:prompt}] ,
          temperature: Number(localStorage.getItem('modelCreativity')),
          max_tokens: 256,
          frequency_penalty: 0,
          presence_penalty: 0,
      });
      return response.data.choices[0].message.content;
    }
}