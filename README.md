# Discord AI Voice Bot

This is a Discord bot that joins a voice channel, listens to users, transcribes their speech, generates an AI response using Gemini API, converts the response to speech, and plays it back in the voice channel.

## Video Result

[![Watch the Video](https://img.youtube.com/vi/bTCQl_k20B0/0.jpg)](https://www.youtube.com/watch?v=bTCQl_k20B0)

## Features

- Joins a voice channel on command
- Captures and processes voice input
- Converts speech to text (STT)
- Generates AI responses using Gemini API
- Converts text to speech (TTS)
- Plays the AI response back in the voice channel

## Requirements

- Node.js (latest LTS recommended)
- Discord.js
- @discordjs/voice
- prism-media
- ffmpeg (installed and available in the system path)
- APIKEY (gemeni OR openai)
- [OpenAi Whisper](https://github.com/openai/whisper) (we can use STT locally)
- [travisvn/openai-edge-tts](https://github.com/travisvn/openai-edge-tts) (Thank's a lot that he make TTS free for us)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Faerissia/Lucy.git
   cd Lucy
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file and add the following:
   ```env
   GEMINI_API_KEY="YOUR GEMINI API KEY"
    DISCORD_TOKEN="YOUR DISCORD TOKEN"
    TTS_API_URL="YOUR TTS API URL"
    TTS_API_KEY="YOUR TTS API KEY"
   ```
4. Ensure `ffmpeg` is installed and accessible from the command line.
5. install openai-Whisper and travisvn/openai-edge-tts (if you have another solution of TTS and STT you can edit some function of mine)

## Usage

1. Start the bot:
   ```sh
   npm run dev
   ```
2. Invite the bot to a server and join a voice channel.
3. Use the command `!join` in a text channel to make the bot join the voice channel.
4. Speak, and the bot will process your voice and respond using AI.

## File Structure

```
📂 discord-ai-voice-bot
├── 📂 config
│   ├── discord.js       # Discord client configuration
│   ├── gemini.js        # AI response generation
│   ├── STS.js           # Speech-to-Text processing
│   ├── TTS.js           # Text-to-Speech processing
├── 📂 services
│   ├── tools.js         # Audio playback utilities
├── index.js             # Main bot entry point
├── .env                 # Environment variables
├── voice-userid.mp3                 # bot will save listen sound from user
├── package.json         # Dependencies and scripts
```

## Dependencies

- `discord.js`
- `@discordjs/voice`
- `prism-media`
- `dotenv`
- `fs`
- `child_process`

## License

This project is licensed under the MIT License.
