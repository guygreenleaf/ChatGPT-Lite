import { Configuration, OpenAIApi } from "openai";

export default class OpenAIContext{
    
    apiKey:string;
    constructor(apiKey:string){this.apiKey = apiKey;}

    async SubmitPrompt(prompt:string, creatvity:string){

      let openAIContext = new OpenAIApi(new Configuration({
        apiKey: `${this.apiKey}`
      }));

      let response = await openAIContext.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role:"user", content:prompt}] ,
          temperature: Number(creatvity),
          max_tokens: 256,
          frequency_penalty: 0,
          presence_penalty: 0,
      });
      return response.data.choices[0].message?.content;
    }
}