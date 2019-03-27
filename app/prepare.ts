import {Plan} from './support'

import {Meeting} from './resources/meeting';
import {MeetingComponent, WrapperComponent} from './meeting/component';


export function prepare(fromState: string = '', toState: string = ''): Plan {

    const plan: Plan = [
        {
            factory: WrapperComponent,
            deps: []
        },
        {
            factory: MeetingComponent,
            deps: Object.keys(MeetingComponent.inputs).map((i) => ({ name: i, factory: MeetingComponent.inputs[i], props: { id: 777 }, fields: MeetingComponent.fieldsFor(i) }))
        },
    ];

    return plan;
}

