import { Construct } from "@aws-cdk/core"
import { Bucket } from "@aws-cdk/aws-s3"
import { Effect, PolicyStatement } from "@aws-cdk/aws-iam"
import { Function } from "@aws-cdk/aws-lambda"

class EpisodeGuideBucket extends Bucket {
  bucket: Bucket
  basePolicy: PolicyStatement
  objectPolicy: PolicyStatement

  constructor(scope: Construct) {
    super(scope, "EpisodeGuideBucket")
    this.bucket = new Bucket(this, "KT-Episode-Guide", {
      bucketName: process.env.S3_BUCKET,
    })
    this.basePolicy = new PolicyStatement({
      resources: [this.bucket.bucketArn],
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket", "s3:GetBucketLocation"],
    })
    this.objectPolicy = new PolicyStatement({
      resources: [this.bucket.arnForObjects("*")],
      effect: Effect.ALLOW,
      actions: ["s3:GetObject"],
    })
    this.bucket.addToResourcePolicy(this.basePolicy)
    this.bucket.addToResourcePolicy(this.objectPolicy)
  }

  addReadPermsToLambda(...lambdaFns: Function[]) {
    lambdaFns.forEach(fn => {
      this.basePolicy.addPrincipals(fn.grantPrincipal)
      this.objectPolicy.addPrincipals(fn.grantPrincipal)
    })
  }
}

export { EpisodeGuideBucket }
