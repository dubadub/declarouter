// render template for given url
// like bazel build app/widget/terms
// rendering could have multiple layers, each with it's own deps but has yield
// make the simpliest interface as possible

// /plans/156/meetings/567/edit

// 1. Request to render PlanComponent, plan id is 156
// 2. To render PlanComponent I need to resolve plan.
// 3. To resolve plan I need to run PlanResolver
// 4. PlanResolver needs to get PlanId, fields from component and load plan. Technically, PlanResolver could serve for different components and id sources.
//

// async DI

// нужно превратить url в html
// я могу хитро кодировать url
//

// navigate from one id to other
// navigate from list to detail
// navigate from detail to list



/////////////////////////////////////////////////////////

const MeetingUrlSegment = UrlSegment({
    path: "meetings/:id"
})

const SelectedMeetingId = UrlParam({
    regex: /\d+/
})

//                      MeetingUrlSegment (sets the id)  =>
// SelectedMeetingId (reference, so segment can set it, and resolver could use it) =>
//                                                                     => MeetingRoute
//                     SelectedMeeting (takes id, outputs a meeting) => MeetingComponent (takes meeting, outputs html )


// MeetingUrlSegment => SelectedMeetingId => SelectedMeeting => MeetingComponent
//
const SelectedMeeting = ResourceFactory({
    function: loadMeeting,
    arguments: {
        id: SelectedMeetingId
    },
})


// * change route
// * change id
// * mark resource, or everything as dirty
// *


// * don't need to separate id from SelectedMeeting
// * url holds state and intent => need to separate intent part from the state:
//   I want that page in that state!!!
//   the component is intent as well but consumes state
// before rendering router checks dependencies and resolves whatever needed

const MeetingComponent = Render({
    renderer: renderMeeting,
    inputs: {
        meeting: SelectedMeeting
    }
})


const MeetingRoute = RouteDefinition({
    path: ["meetings", { resource: SelectedMeeting, regex: /\d+/, output: ["id"] }],
    component: MeetingComponent,
}, "nestedRoutes")

const routes = [
    MeetingRoute,
]


function renderUrl(url) {
    return routes.findFor(url).render()
}


const html1 = renderUrl("/")
const html2 = renderUrl("/plans")
const html3 = renderUrl("/plans/137")
const html4 = renderUrl("/plans/137/meetings")
const html5 = renderUrl("/plans/137/meetings/243")
const html6 = renderUrl("/plans/137/meetings/245")
const html7 = renderUrl("/meetings/1500")


function getMeetingId(url) {
    return 100500;
}

function loadMeeting(id, fields) {
    return Promise.resolve({startsAt: new Date() })
}


function renderMeeting(meeting) {
    return `<p>Starts at ${meeting.startsAt}</p>`
}


// ////////////////
//

// url => state (unresolved => resolved) => component
// url is serialized state
// state is tree
//


// router lifecycle
// router.navigate("/meetings/145"):
//     goal of that phase is to come up with the plan what components are going to be initialized and what dependencies resolved
//     1. planning
//         * find related route definition
//         * get requirements from components (resources, fields for resources)
//         * finilize list of related resources
//     2. execution
//         * preload resources
//         * build layer of components

class Navigation {

    constructor(route: Route) {}

}





