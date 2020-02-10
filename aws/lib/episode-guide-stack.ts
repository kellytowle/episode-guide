import { Construct, Stack, StackProps, Token } from "@aws-cdk/core"
import { EpisodeGuideApi } from "./api-gateway/api"
import { EpisodeGuideLambdas } from "./lambda/functions"
import { EpisodeGuideBucket } from "./s3/bucket"

const PATH_TO_ROOT = process.cwd()

export class EpisodeGuideStack extends Stack {
  private readonly _bucketName: string
  readonly _rootDir: string

  api: EpisodeGuideApi
  lambdas: EpisodeGuideLambdas
  bucket: EpisodeGuideBucket

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)
    // The code that defines your stack goes here
    this._rootDir = PATH_TO_ROOT

    this.bucket = new EpisodeGuideBucket(this)
    this._bucketName = Token.isUnresolved(this.bucket.bucketName) ? process.env.S3_BUCKET || "" : this.bucket.bucketName

    this.lambdas = new EpisodeGuideLambdas(this, this._rootDir)
    this.lambdas.addEnvVarToLambda("S3_BUCKET", this._bucketName)

    this.bucket.addReadPermsToLambda(this.lambdas.query, this.lambdas.seasons)

    this.api = new EpisodeGuideApi(this, this.lambdas)
  }
}
