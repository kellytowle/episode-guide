#!/usr/bin/env node
require("dotenv").config({
  path: `../.env`,
})
import "source-map-support/register"
import * as cdk from "@aws-cdk/core"
import { EpisodeGuideStack } from "../lib/episode-guide-stack"

const app = new cdk.App()
new EpisodeGuideStack(app, "EpisodeGuideStack", {
  env: {
    region: "us-west-2",
    account: "562726346948",
  },
})
