import {
    App as cdkApp,
} from 'aws-cdk-lib';

import * as src from '../src/';

describe('Access Point', () => {
    // GIVEN
    // eslint-disable-next-line new-cap
    const app = new cdkApp();

    // WHEN

    // THEN
    describe('should pass', () => {
        it('mock', () => {
            expect(true).toBeTruthy();
        });
    });
});
