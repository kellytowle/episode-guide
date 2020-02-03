import * as Lambda from "@aws-cdk/aws-lambda"
import { EpisodeGuideStack } from "../episode-guide-stack"

class EpisodeGuideLambdas {
  query: Lambda.Function
  seasons: Lambda.Function
  private readonly _functions: Lambda.Function[]

  constructor(scope: EpisodeGuideStack) {
    this._functions = []
    this.query = new Lambda.Function(scope, "QueryHandler", {
      code: new Lambda.AssetCode(`${scope._rootDir}/lib/lambda/query`),
      handler: "index.handler",
      runtime: Lambda.Runtime.NODEJS_12_X,
      initialPolicy: [],
    })
    this.seasons = new Lambda.Function(scope, "SeasonsCountHandler", {
      code: new Lambda.AssetCode(`${scope._rootDir}/lib/lambda/seasons`),
      handler: "index.handler",
      runtime: Lambda.Runtime.NODEJS_12_X,
      initialPolicy: [],
    })
    this._functions.push(this.query, this.seasons)
  }

  addEnvVarToLambda(varName: string, value: string, func?: Lambda.Function) {
    if (func) {
      func.addEnvironment(varName, value)
    } else {
      this._functions.forEach(func => func.addEnvironment(varName, value))
    }
  }
}

export { EpisodeGuideLambdas }
