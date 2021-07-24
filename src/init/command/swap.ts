import * as ec2 from '@aws-cdk/aws-ec2';

export function generate(size: number): ec2.InitCommand {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (size <= 0) throw new Error('The size of swap file must be greater than 0.');

    return ec2.InitCommand.shellCommand('' +
        `fallocate -l ${size}G /swap && ` +
        'chmod 600 /swap && ' +
        'mkswap /swap && ' +
        'swapon /swap && ' +
        'echo "/swap swap swap defaults 0 0" >> /etc/fstab', {
        testCmd: '[ ! -f /swap ]',
    });
}
