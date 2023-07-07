#/bin/sh

gcloud run services describe cloud-run-aspect \
  --region asia-northeast1 \
  --format json \
  | jq -r '.status.address | to_entries[] | .key + "=\"" + (.value|tostring) + "\""'\
  > packages/lambda-aspect/.env