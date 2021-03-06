import {
    aws_ec2 as cdkEc2,
} from 'aws-cdk-lib';

export function generate(size: number): cdkEc2.InitCommand {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (size <= 0) throw new Error('The size of swap file must be greater than 0.');

    return cdkEc2.InitCommand.shellCommand('' +
        `fallocate -l ${size}G /swap && ` +
        'chmod 600 /swap && ' +
        'mkswap /swap && ' +
        'swapon /swap && ' +
        'echo "/swap swap swap defaults 0 0" >> /etc/fstab', {
        testCmd: '[ ! -f /swap ]',
    });
}
