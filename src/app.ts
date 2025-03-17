import { joinVoiceChannel, EndBehaviorType } from "@discordjs/voice";
import { pipeline } from "stream";
import fs from "fs";
import "dotenv/config";
import { getGeminiResponse } from "./config/gemini";
import { textToSpeech } from "./config/TTS";
import { playAudio } from "./services/tools";
import { discordClient } from "./config/discord";
import { speechToText } from "./config/STS";
import { opus } from "prism-media";
import { exec } from "child_process";

discordClient.on("ready", () => {
  console.log(`Logged in as ${discordClient.user?.tag}!`);
});

discordClient.on("messageCreate", async (message) => {
  if (message.content === "!join" && message.member?.voice.channel) {
    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild!.id,
      adapterCreator: message.guild!.voiceAdapterCreator,
    });

    const receiver = connection.receiver;

    receiver.speaking.on("start", (userId) => {
      console.log(`User ${userId} started speaking`);

      const audioStream = receiver.subscribe(userId, {
        end: { behavior: EndBehaviorType.AfterSilence, duration: 100 },
      });

      const decoder = new opus.Decoder({
        frameSize: 960,
        channels: 2,
        rate: 48000,
      });
      const stream = audioStream
        .pipe(decoder)
        .pipe(fs.createWriteStream("./test.pcm"));

      stream.on("finish", async () => {
        exec(
          `ffmpeg -y -f s16le -ar 48k -ac 2 -i test.pcm voice-${userId}.mp3`
        );
        const text = await speechToText(`voice-${userId}`);

        if (text) {
          const aiResponse = await getGeminiResponse(`${text}`);
          console.log(aiResponse);
          await textToSpeech(aiResponse, "./response.mp3");
          playAudio(connection, "./response.mp3");
        }
      });
    });
  }
});
discordClient.login(process.env.DISCORD_TOKEN);
