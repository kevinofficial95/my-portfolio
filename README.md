# Kevin James Portfolio

React + TypeScript + Vite portfolio site, deployed on Google Cloud Run.

## Local development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Google Cloud Run (one-time setup)

1. Create/select your GCP project and set defaults:

```bash
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT_ID
gcloud config set run/region us-central1
```

2. Enable required APIs:

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

3. Create Artifact Registry repository:

```bash
gcloud artifacts repositories create web \
  --repository-format=docker \
  --location=us-central1 \
  --description="Docker images for my-portfolio"
```

4. Deploy:

```bash
gcloud builds submit --config cloudbuild.yaml
```

5. Get your service URL:

```bash
gcloud run services describe my-portfolio \
  --region=us-central1 \
  --format='value(status.url)'
```

## Connect `www.kevinjames.dev`

1. Map the domain to Cloud Run:

```bash
gcloud run domain-mappings create \
  --service=my-portfolio \
  --domain=www.kevinjames.dev \
  --region=us-central1
```

2. Show DNS records Google requires:

```bash
gcloud run domain-mappings describe \
  --domain=www.kevinjames.dev \
  --region=us-central1
```

3. Add the listed `CNAME`/`A`/`AAAA` records at your DNS provider.

4. Wait for SSL provisioning (usually minutes, can take longer) and verify:

```bash
curl -I https://www.kevinjames.dev
```

## GitHub Actions deployment

This repo includes `.github/workflows/deploy-gcp-cloud-run.yml` for deploy-on-push to `main`.

Set these repository secrets:

- `GCP_PROJECT_ID`
- `GCP_REGION` (for example `us-central1`)
- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`
