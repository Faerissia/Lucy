import { exec } from "child_process";
import fs from "fs";
import path from "path";

export async function speechToText(audioFile: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const env = Object.assign({}, process.env, { PYTHONIOENCODING: "utf-8" });

    exec(
      `Whisper "${audioFile}.mp3" --model base --language Thai --output_format txt"`,
      { env },
      (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`Whisper error: ${error.message}`);
          return reject(error);
        }

        if (stderr) {
          console.warn(`Whisper stderr: ${stderr}`);
          const textFilePath = `${audioFile}.txt`;
          const textfile = fs.readFileSync(textFilePath, "utf8");

          return resolve(textfile);
        }
      }
    );
  });
}
