import { SynthUtils } from "@aws-cdk/assert"
import * as cdk from "@aws-cdk/core"
import { EpisodeGuideStack } from "../lib/episode-guide-stack"
import { EpisodeGuideApi } from "../lib/api-gateway/api"
import { EpisodeGuideBucket } from "../lib/s3/bucket"
import { RestApi } from "@aws-cdk/aws-apigateway"

let app: cdk.App
let sut: EpisodeGuideStack

test("Snapshot Test", () => {
  // WHEN
  app = new cdk.App()
  const stack = new EpisodeGuideStack(app, "EpisodeGuideStack")
  // THEN
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
})

describe("EpisodeGuideStack", () => {
  describe("instance members", () => {
    beforeEach(() => {
      app = new cdk.App()
      sut = new EpisodeGuideStack(app, "EpisodeGuideStack")
    })
    it("this.lambdas: EpisodeGuideLambdas instance", () => {
      expect(sut.lambdas).toBeDefined()
    })
    it("this.bucket: EpisodeGuideBucket instance", () => {
      expect(sut.bucket).toBeDefined()
    })
    it("this.api: EpisodeGuideApi instance", () => {
      expect(sut.api).toBeDefined()
    })
  })
})
