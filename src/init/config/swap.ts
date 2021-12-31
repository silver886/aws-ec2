import {
    aws_ec2 as cdkEc2,
} from 'aws-cdk-lib';

import * as command from '../command/';

export function generate(size: number): cdkEc2.InitConfig {
    return new cdkEc2.InitConfig([
        command.swap.generate(size),
    ]);
}
