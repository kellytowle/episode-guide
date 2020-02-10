import { CfnOutput, Construct } from "@aws-cdk/core"
import { RestApi, Resource, IResource, LambdaIntegration } from "@aws-cdk/aws-apigateway"
import * as Lambda from "@aws-cdk/aws-lambda"

const API_ID = "EpisodeGuideApi"

type LambdaProps = {
  query: Lambda.Function
  seasons: Lambda.Function
}

class EpisodeGuideApi {
  private readonly _scope: Construct
  api: RestApi
  queryResource: Resource
  seasonsResource: Resource

  constructor(scope: Construct, lambdas: LambdaProps) {
    this._scope = scope
    this.api = new RestApi(scope, API_ID)

    this.queryResource = this.addLambdaResource(`Query`, lambdas.query, "query")
    this.seasonsResource = this.addLambdaResource(`Seasons`, lambdas.seasons, "seasons")
  }

  addLambdaResource(
    id: string,
    lambdaFn: Lambda.Function,
    path: string,
    httpMethod: string = "GET",
    parentResource?: IResource,
  ): Resource {
    const resource = new Resource(this._scope, id, {
      parent: parentResource ? parentResource : this.api.root,
      pathPart: path,
    })
    resource.addMethod(httpMethod, new LambdaIntegration(lambdaFn))
    new CfnOutput(this._scope, `${id}Url`, {
      value: resource.url,
    })
    return resource
  }
}

export { EpisodeGuideApi }
