import { Construct } from "@aws-cdk/core"
import {
  RestApi,
  Resource,
  LambdaIntegration,
  ResourceProps,
} from "@aws-cdk/aws-apigateway"
import * as Lambda from "@aws-cdk/aws-lambda"

const API_ID = "EpisodeGuideApi"

type LambdaProps = {
  query: Lambda.Function
  seasons: Lambda.Function
}

class EpisodeGuideApi {
  api: RestApi
  queryResource: Resource
  seasonsResource: Resource

  constructor(scope: Construct, lambdas: LambdaProps) {
    this.api = new RestApi(scope, API_ID)

    const queryProps: ResourceProps = {
      parent: this.api.root,
      pathPart: "query",
      // defaultIntegration: new LambdaIntegration(lambdas.query),
    }

    this.queryResource = new Resource(scope, `Query`, queryProps)
    this.queryResource.addMethod("GET", new LambdaIntegration(lambdas.query))

    const seasonProps: ResourceProps = {
      parent: this.api.root,
      pathPart: "seasons",
      // defaultIntegration: new LambdaIntegration(lambdas.query),
    }

    this.seasonsResource = new Resource(scope, `Seasons`, seasonProps)
    this.seasonsResource.addMethod(
      "GET",
      new LambdaIntegration(lambdas.seasons),
    )
  }
}

export { EpisodeGuideApi }
