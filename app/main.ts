import {prepare} from './prepare';
import {execute} from './execute';

import {describePlan} from './logging';


(function main() {
    const plan = prepare();

    console.info("Plan:")
    console.info(describePlan(plan));

    execute(plan).then((result) => {
        console.info("\n\nRendered:")
        console.log("\x1b[32m", result, "\x1b[0m");
    })
})();
