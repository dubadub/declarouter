import {Meeting} from './resources/meeting';


export function resourceResolver(factory, props, fields) {
    const instance = Object.assign(new factory(), props);

    if (factory === Meeting) {
        return meetingResolver(instance, fields);
    }
}


function meetingResolver(resource: Meeting, fields: string[]) {

    if (fields.indexOf("startsAt") > -1) {
        resource.startsAt = "2019-03-22 21:41:44";
    }

    return () => {
        return new Promise<Meeting>(function(resolve, reject) {
            setTimeout(function() {
               resolve(resource);
            }, 300);
        });
    }

}
