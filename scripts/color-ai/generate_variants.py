#!/usr/bin/env python3
"""Generate validated vehicle paint variants offline with Qwen Image Edit.

This script is intentionally not part of the Vercel runtime. It writes optimized
WebP assets and updates src/data/color-assets.json, which the Next.js UI reads.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import torch
from PIL import Image
from diffusers import DiffusionPipeline

ROOT = Path(__file__).resolve().parents[2]
INDEX_PATH = ROOT / "src" / "data" / "color-assets.json"
PUBLIC_ROOT = ROOT / "public" / "generated" / "colors"
DEFAULT_MODEL = "Qwen/Qwen-Image-Edit-2509"


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "color"


def build_prompt(color_name: str) -> str:
    return (
        f"Change only the painted exterior body panels of this exact vehicle to {color_name}. "
        "Preserve the exact car or motorcycle model, body shape, camera position, crop, environment, "
        "background, lighting direction, realistic reflections, wheels, tires, glass, carbon fiber, "
        "chrome, black trim, badges, number plates and shadows. Do not redesign, add or remove objects. "
        "The result must look like the same professional photograph taken in the same place."
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("manifest", type=Path, help="JSON manifest with slug, input and colors")
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument("--steps", type=int, default=40)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    entries = manifest if isinstance(manifest, list) else manifest.get("vehicles", [])
    if not entries:
        raise SystemExit("Manifest has no vehicles")

    pipe = DiffusionPipeline.from_pretrained(args.model, torch_dtype=torch.bfloat16)
    pipe.to("cuda")
    pipe.set_progress_bar_config(disable=False)

    index = json.loads(INDEX_PATH.read_text(encoding="utf-8")) if INDEX_PATH.exists() else {}

    for entry in entries:
        vehicle_slug = entry["slug"]
        source = Path(entry["input"]).expanduser().resolve()
        image = Image.open(source).convert("RGB")
        target_dir = PUBLIC_ROOT / vehicle_slug
        target_dir.mkdir(parents=True, exist_ok=True)
        index.setdefault(vehicle_slug, {})

        for color in entry.get("colors", []):
            color_name = color["name"] if isinstance(color, dict) else str(color)
            prompt = color.get("prompt") if isinstance(color, dict) else None
            prompt = prompt or build_prompt(color_name)
            generator = torch.Generator(device="cuda").manual_seed(args.seed)
            with torch.inference_mode():
                result = pipe(
                    image=image,
                    prompt=prompt,
                    generator=generator,
                    true_cfg_scale=4.0,
                    negative_prompt="different vehicle, changed background, changed wheels, changed camera, illustration, CGI",
                    num_inference_steps=args.steps,
                ).images[0]

            if result.width > 1800:
                height = round(result.height * 1800 / result.width)
                result = result.resize((1800, height), Image.Resampling.LANCZOS)
            filename = f"{slugify(color_name)}.webp"
            output = target_dir / filename
            result.save(output, "WEBP", quality=88, method=6)
            index[vehicle_slug][color_name] = f"/generated/colors/{vehicle_slug}/{filename}"
            print(f"[generated] {vehicle_slug} / {color_name} -> {output.relative_to(ROOT)}")

    INDEX_PATH.write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {INDEX_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
