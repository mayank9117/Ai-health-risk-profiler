# AI-Powered Health Risk Profiler

Run server:

```bash
npm run dev
```

Endpoints:

- POST `/parse` (JSON):

```bash
curl -X POST http://localhost:3000/parse \
  -H "Content-Type: application/json" \
  -d '{"smoking":"yes","diet":"poor","exercise":"low"}'
```

- POST `/parse` (image with OCR):

```bash
curl -X POST http://localhost:3000/parse \
  -F image=@path/to/form-image.png
```

- POST `/extract-factors`:

```bash
curl -X POST http://localhost:3000/extract-factors \
  -H "Content-Type: application/json" \
  -d @samples/sample.json
```

- POST `/classify-risk`:

```bash
curl -X POST http://localhost:3000/classify-risk \
  -H "Content-Type: application/json" \
  -d '{"factors":["smoking","poor diet","low exercise"]}'
```

- POST `/recommendations`:

```bash
curl -X POST http://localhost:3000/recommendations \
  -H "Content-Type: application/json" \
  -d '{"risk_level":"high","factors":["smoking","poor diet","low exercise"]}'
```


