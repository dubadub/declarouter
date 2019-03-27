import {Plan} from './support';

import {resourceResolver} from './resolving';

export function execute(plan: Plan): Promise<string> {

    const templates = plan.map((phase) => {
        const component =  new phase.factory();

        const promises = phase.deps.map((dep) => {
            return resourceResolver(dep.factory, dep.props, dep.fields)().then((resource) => {
                component[dep.name] = resource;
            })
        })

        return Promise.all(promises).then(() => component.render());
    });

    return Promise.all(templates).then((items) => {
        return items.reduce((prev, curr) => {
            return prev.replace("<yield></yield>", curr);
        })
    })
}
