import * as cdk from "@aws-cdk/core"
import * as S3 from "@aws-cdk/aws-s3"
import { EpisodeGuideApi } from "./api-gateway/api"
import { EpisodeGuideLambdas } from "./lambda/functions"
import { Effect, PolicyStatement } from "@aws-cdk/aws-iam"

const PATH_TO_ROOT = process.cwd()

export class AwsStack extends cdk.Stack {
  api: EpisodeGuideApi
  lambdas: EpisodeGuideLambdas
  bucket: S3.Bucket
  bucketPolicy: PolicyStatement
  rootDir: string

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)
    // The code that defines your stack goes here
    this.rootDir = PATH_TO_ROOT

    this.bucket = new S3.Bucket(this, "EpisodeGuideBucket", {
      bucketName: process.env.S3_BUCKET,
    })
    this.bucketPolicy = new PolicyStatement({
      resources: [this.bucket.bucketArn],
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket", "s3:GetBucketLocation"],
    })
    this.lambdas = new EpisodeGuideLambdas(this, this.bucket.bucketName)

    this.bucketPolicy.addPrincipals(
      this.lambdas.query.grantPrincipal,
      this.lambdas.seasons.grantPrincipal,
    )

    this.bucket.addToResourcePolicy(this.bucketPolicy)

    this.bucket.addToResourcePolicy(
      new PolicyStatement({
        resources: [this.bucket.arnForObjects("*")],
        effect: Effect.ALLOW,
        actions: ["s3:GetObject"],
        principals: [
          this.lambdas.query.grantPrincipal,
          this.lambdas.seasons.grantPrincipal,
        ],
      }),
    )

    this.api = new EpisodeGuideApi(this, this.lambdas)
  }
}
