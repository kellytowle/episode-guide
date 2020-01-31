import * as Lambda from "@aws-cdk/aws-lambda"
import { AwsStack } from "../aws-stack"
import { Bucket } from "@aws-cdk/aws-s3"

class EpisodeGuideLambdas {
  query: Lambda.Function
  seasons: Lambda.Function

  constructor(scope: AwsStack, bucketName: string) {
    this.query = new Lambda.Function(scope, "QueryHandler", {
      code: new Lambda.AssetCode(`${scope.rootDir}/lib/lambda/query`),
      handler: "index.handler",
      runtime: Lambda.Runtime.NODEJS_12_X,
      initialPolicy: [],
      environment: {
        S3_BUCKET: bucketName
      }
    })
    this.seasons = new Lambda.Function(scope, "SeasonsCountHandler", {
      code: new Lambda.AssetCode(`${scope.rootDir}/lib/lambda/seasons`),
      handler: "index.handler",
      runtime: Lambda.Runtime.NODEJS_12_X,
      initialPolicy: [],
      environment: {
        S3_BUCKET: bucketName
      }
    })
  }
}

export { EpisodeGuideLambdas }
