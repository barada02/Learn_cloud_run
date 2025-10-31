# gcloud command

### get image url

```bash
gcloud run services describe [SERVICE_NAME] `
--region [REGION] `
--format='value(status.latestReadyRevisionName)'
```
```bash
gcloud run services describe [SERVICE_NAME] `
  --region [REGION] `
  --format='value(spec.template.spec.containers[0].image)'
```
image url: us-central1-docker.pkg.dev/social-463809/cloud-run-source-deploy/learn_cloud_run/learn-cloud-run-backend:10f4afdcabbbdabeeebf42b1fbe05a3a444cc1bc
### update env variables

```bash
gcloud run deploy [SERVICE_NAME] `
  --region [REGION] `
  --image [YOUR_IMAGE_URL] `
  --update-env-vars 'API_KEY=your_dummy_api_key_12345,DATABASE_URL=postgresql://user:password@localhost:5432/mydb'

```
### overrides all env variables

```bash
gcloud run deploy [SERVICE_NAME] `
  --region [REGION] `
  --image [YOUR_IMAGE_URL] `
  --set-env-vars 'API_KEY=your_dummy_api_key_12345,DATABASE_URL=postgresql://user:password@localhost:5432/mydb'


exmaple:

```bash
gcloud run deploy learn-cloud-run-backend `
--region us-central1 `
--image us-central1-docker.pkg.dev/social-463809/cloud-run-source-deploy/learn_cloud_run/learn-cloud-run-backend:10f4afdcabbbdabeeebf42b1fbe05a3a444cc1bc `
--set-env-vars 'API_KEY=your_dummy_api_key_12345,DATABASE_URL=postgresql://user:password@localhost:5432/mydb'

```
