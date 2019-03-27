import {Component} from '../support';
import {Meeting} from '../resources/meeting';

export class WrapperComponent implements Component {

    static fieldsFor(input) {
        return [];
    }

    render(): string {
        return `
<h1>Hello world</h1>
<p>Vastrik bomzh</p>
<yield></yield>
        `;
    }
}

export class MeetingComponent implements Component {
    meeting: Meeting;

    static inputs = {
        meeting: Meeting
    }

    static fieldsFor(input) {
        if (input === "meeting") {
            return ["startsAt"];
        } else {
            return [];
        }
    }

    render(): string {
        return `
<p>And by the way, meeting id is ${this.meeting.id} and start time is ${this.meeting.startsAt}.</p>
        `;
    }
}
