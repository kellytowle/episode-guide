import * as Lambda from "@aws-cdk/aws-lambda"
import { AwsStack } from "../aws-stack"

class EpisodeGuideLambdas {
  query: Lambda.Function
  seasons: Lambda.Function
  constructor(scope: AwsStack) {
    this.query = new Lambda.Function(scope, "QueryHandler", {
      code: new Lambda.AssetCode(`${scope.rootDir}/lib/lambda/query`),
      handler: "index.handler",
      runtime: Lambda.Runtime.NODEJS_12_X,
      initialPolicy: [],
    })
    this.seasons = this.query
  }
}

export { EpisodeGuideLambdas }
