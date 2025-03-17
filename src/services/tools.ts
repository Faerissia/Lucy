import { createAudioPlayer, createAudioResource } from "@discordjs/voice";

export function playAudio(connection: any, filePath: string) {
  const player = createAudioPlayer();
  const resource = createAudioResource(filePath);
  player.play(resource);
  connection.subscribe(player);
}
