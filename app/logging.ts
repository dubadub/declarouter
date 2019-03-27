import {Plan} from './support'

export function describePlan(plan: Plan): string {
    const description = plan.map((phase) => `Will create ${phase.factory['name']}, resolving deps: ${JSON.stringify(phase.deps)}`).join("\n");

    return `
${description}
    `
}
