import * as THREE from "three";

export function createLabelTexture(
  title: string,
  subtitle: string,
  accent: string
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create canvas context for label texture.");
  }

  context.fillStyle = "#10131a";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, `${accent}22`);
  gradient.addColorStop(1, "#0b0f15");
  context.fillStyle = gradient;
  context.fillRect(24, 24, canvas.width - 48, canvas.height - 48);

  context.strokeStyle = `${accent}aa`;
  context.lineWidth = 10;
  context.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

  context.fillStyle = "#d2ff72";
  context.font = "500 34px Space Grotesk, sans-serif";
  context.letterSpacing = "4px";
  context.fillText(subtitle.toUpperCase(), 72, 112);

  context.fillStyle = "#f4efe7";
  context.font = "600 88px Cormorant Garamond, serif";
  context.fillText(title, 72, 248);

  context.fillStyle = "rgba(244, 239, 231, 0.8)";
  context.font = "500 36px Space Grotesk, sans-serif";
  context.fillText("Scroll stop / Kevin James portfolio", 72, 334);

  for (let index = 0; index < 7; index += 1) {
    context.fillStyle = index % 2 === 0 ? accent : "#f4efe7";
    context.fillRect(72 + index * 118, 398, 84, 8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
