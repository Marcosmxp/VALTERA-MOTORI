# Valtera Color AI pipeline

Color variants are generated **offline**, never inside the Vercel request path. The production site only serves approved static WebP files.

## Model

Default: `Qwen/Qwen-Image-Edit-2509` (Apache-2.0). The model is large, so GPU compute is still required even though the model itself is free/open. Keep this job outside Vercel and never commit Hugging Face tokens or model caches.

## Setup

```bash
python -m venv .venv-ai
source .venv-ai/bin/activate
pip install torch pillow "diffusers>=0.35" transformers accelerate sentencepiece
```

Prepare a local base image you are allowed to edit. Example manifest:

```json
{
  "vehicles": [
    {
      "slug": "porsche-macan-4",
      "input": "./assets/base/porsche-macan-4.jpg",
      "colors": [
        { "name": "Nero" },
        { "name": "Bianco" },
        { "name": "Guards Red" },
        { "name": "Gentian Blue" }
      ]
    }
  ]
}
```

Run:

```bash
python scripts/color-ai/generate_variants.py ./color-manifest.json
```

The script writes `public/generated/colors/<slug>/*.webp` and updates `src/data/color-assets.json`. Review every output before committing it. Reject variants that alter wheels, bodywork, environment, badges or lighting structure.

Do not use manufacturer/dealer images unless their licence or permission allows derivative editing. Current Unsplash visuals are editorial placeholders; a production inventory should use licensed vehicle photography.
