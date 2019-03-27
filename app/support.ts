
export abstract class Component {
    static fieldsFor(input: string): string[] {
        return [];
    };

    abstract render(): string;
}

export interface Dependency {
    name: string;
    factory: FunctionConstructor;
    props: object;
    fields: string[];
}

export interface PlanPhase {
    factory: { new (): Component; };
    deps: Dependency[];
}

export type Plan = PlanPhase[];
