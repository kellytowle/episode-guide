import { EpisodeGuideApi } from "../lib/api-gateway/api"
import { expect as expectCDK, haveOutput, haveResource } from "@aws-cdk/assert"
import { Code, Function, FunctionProps, Runtime } from "@aws-cdk/aws-lambda"
import { App, Stack } from "@aws-cdk/core"
// TODO replace with CDK's own countResourcesLike method
import { countResourcesLike } from "./util/CountResourcesLike"

let stack: Stack
let sut: EpisodeGuideApi
let mockLambdas: any

const mockFunctionProps: Pick<FunctionProps, "code" | "handler" | "runtime"> = {
  code: Code.fromInline("exports.handler = () => 'Blah'"),
  handler: "index.handler",
  runtime: Runtime.NODEJS_12_X,
}

describe("EpisodeGuideApi", () => {
  beforeEach(() => {
    stack = new Stack(new App(), "MockStack")
    mockLambdas = {
      query: new Function(stack, "QueryMock", mockFunctionProps),
      seasons: new Function(stack, "SeasonsMock", mockFunctionProps),
    }
  })

  it("creates 2 resources", () => {
    const spy = jest.spyOn(EpisodeGuideApi.prototype, "addLambdaResource")
    sut = new EpisodeGuideApi(stack, mockLambdas)
    expect(spy).toHaveBeenCalledTimes(2)
  })

  describe("'query' resource", () => {
    beforeEach(() => {
      sut = new EpisodeGuideApi(stack, mockLambdas)
    })
    it("is defined", () => {
      expect(sut.queryResource).toBeDefined()
    })

    it("only supports GET method", async () => {
      const resourceId = stack.resolve(sut.queryResource.resourceId)
      expectCDK(stack).to(
        haveResource("AWS::ApiGateway::Method", {
          ResourceId: resourceId,
          HttpMethod: "GET",
        }),
      )
      expectCDK(stack).to(
        countResourcesLike("AWS::ApiGateway::Method", 2, {
          ResourceId: resourceId,
        }),
      )
    })

    it("creates an Output of the URL", () => {
      expectCDK(stack).to(
        haveOutput({
          outputName: "QueryUrl",
        }),
      )
    })
  })

  describe("'seasons' resource", () => {
    beforeEach(() => {
      sut = new EpisodeGuideApi(stack, mockLambdas)
    })
    it("is defined", () => {
      expect(sut.seasonsResource).toBeDefined()
    })

    it("creates an Output of the URL", () => {
      expectCDK(stack).to(
        haveOutput({
          outputName: "SeasonsUrl",
        }),
      )
    })
  })
})
