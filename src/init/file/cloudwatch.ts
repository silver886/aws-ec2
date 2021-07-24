import * as ec2 from '@aws-cdk/aws-ec2';

export function config(os: string, obj: unknown, serviceRestartHandles?: ec2.InitServiceRestartHandle[]): ec2.InitFile {
    if (os !== 'amazon_linux' && os !== 'centos' && os !== 'redhat' && os !== 'suse' && os !== 'debian' && os !== 'ubuntu' && os !== 'oracle_linux' && os !== 'windows') throw new Error('OS must be `amazon_linux`, `centos`, `redhat`, `suse`, `debian`, `ubuntu`, `oracle_linux`, or `windows`.');

    let path = '';
    switch (os) {
        case 'amazon_linux':
        case 'centos':
        case 'redhat':
        case 'suse':
        case 'oracle_linux':
        case 'debian':
        case 'ubuntu':
            path = '/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json';
            break;
        case 'windows':
            path = '$Env:ProgramData\\Amazon\\AmazonCloudWatchAgent\\amazon-cloudwatch-agent.json';
            break;

        // No default
    }

    return ec2.InitFile.fromString(path, JSON.stringify(obj), {serviceRestartHandles});
}
