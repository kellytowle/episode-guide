import * as Lambda from "@aws-cdk/aws-lambda"
import { EpisodeGuideStack } from "../episode-guide-stack"
import { FunctionProps } from "@aws-cdk/aws-lambda"

const defaultProps: Pick<FunctionProps, "handler" | "runtime" | "initialPolicy"> = {
  handler: "index.handler",
  runtime: Lambda.Runtime.NODEJS_12_X,
  initialPolicy: [],
}

class EpisodeGuideLambdas {
  query: Lambda.Function
  seasons: Lambda.Function
  private readonly _functions: Lambda.Function[]
  private readonly _scope: EpisodeGuideStack

  constructor(scope: EpisodeGuideStack, rootDir: string) {
    this._functions = []
    this._scope = scope
    this.query = this._createLambdaFunction("QueryHandler", `${rootDir}/lib/lambda/query`)
    this.seasons = this._createLambdaFunction("SeasonsCountHandler", `${rootDir}/lib/lambda/seasons`)
  }

  private _createLambdaFunction(id: string, path: string) {
    const fn = new Lambda.Function(this._scope, id, {
      code: new Lambda.AssetCode(path),
      ...defaultProps,
    })
    this._functions.push(fn)
    return fn
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
