#!/usr/bin/env node
import "source-map-support/register"
import * as cdk from "@aws-cdk/core"
import { AwsStack } from "../lib/aws-stack"

const app = new cdk.App()
new AwsStack(app, "AwsStack", {
  env: {
    region: "us-west-2",
    account: "562726346948",
  },
})