# これは何

- Lambda から Cloud Run を認証付きで叩くための検証

# 動かしかた

## 前提

- gcloud / serverless はセットアップ済み
- gcloud / aws のデフォルトの認証先が Deploy して問題ないか確認しておく

## 手順

### Cloud Run の構築

```sh
$ yarn
$ yarn deploy:run
```

### Service Account の用意

- GCloud のコンソール上でサービスアカウントを発行する
  - 権限には Cloud Run Invoker (起動元)をつけておく
- サービスアカウントの鍵を発行してローカルに保持しておく

※Workload Identity 連携を行えば多分不要だと思う。要検証

### SSM の用意

- 鍵ファイルを生で持たないため、SSM の Parameter Store に置いておく

```sh
aws ssm put-parameter \
  --name /keys/gcloud/service_account \
  --type "SecureString" \
  --value file://$file_path
```

### Lambda の用意

```sh
$ yarn
$ yarn deploy:lambda
```
