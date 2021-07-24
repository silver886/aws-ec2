import * as ec2 from '@aws-cdk/aws-ec2';

import * as command from '../command/';

export function enable(): ec2.InitConfig {
    return new ec2.InitConfig([
        command.amazonLinuxExtras.install('epel', 'epel-release'),
    ]);
}
