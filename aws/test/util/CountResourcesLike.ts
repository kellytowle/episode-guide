import { Assertion } from "@aws-cdk/assert/lib/assertion"
import { StackInspector } from "@aws-cdk/assert/lib/inspector"
import { isSuperObject } from "@aws-cdk/assert"

export function countResourcesLike(
  resourceType: string,
  count = 1,
  props?: Record<string, string>,
): Assertion<StackInspector> {
  return new CountResourcesLikeAssertion(resourceType, count, props)
}
export class CountResourcesLikeAssertion extends Assertion<StackInspector> {
  private inspected: number = 0
  private readonly props: object

  constructor(private readonly resourceType: string, private readonly count: number, props?: Record<string, string>) {
    super()
    this.props = props || { null: null }
  }

  public assertUsing(inspector: StackInspector): boolean {
    let counted = 0
    for (const logicalId of Object.keys(inspector.value.Resources || {})) {
      const resource = inspector.value.Resources[logicalId]
      if (resource.Type === this.resourceType) {
        if (isSuperObject(resource.Properties, this.props, [], true)) {
          counted++
          this.inspected += 1
        }
      }
    }

    return counted === this.count
  }

  public get description(): string {
    return `stack only has ${this.inspected} resource of type ${this.resourceType} with supplied props but we expected to find ${this.count}`
  }
}
