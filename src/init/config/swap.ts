import * as ec2 from '@aws-cdk/aws-ec2';

import * as command from '../command/';

export function generate(size: number): ec2.InitConfig {
    return new ec2.InitConfig([
        command.swap.generate(size),
    ]);
}
