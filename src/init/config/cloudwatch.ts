import * as ec2 from '@aws-cdk/aws-ec2';

import * as file from '../file/';

export function agent(arch: string, os: string, obj: unknown): ec2.InitConfig {
    if (arch !== 'amd64' && arch !== 'arm64') throw new Error('Arch must be `amd64` or `arm64`.');

    let ext = '';
    switch (arch) {
        case 'amd64':
            if (os !== 'amazon_linux' && os !== 'centos' && os !== 'redhat' && os !== 'suse' && os !== 'debian' && os !== 'ubuntu' && os !== 'oracle_linux' && os !== 'windows') throw new Error('OS must be `amazon_linux`, `centos`, `redhat`, `suse`, `debian`, `ubuntu`, `oracle_linux`, or `windows`.');

            switch (os) {
                case 'amazon_linux':
                case 'centos':
                case 'redhat':
                case 'suse':
                case 'oracle_linux':
                    ext = 'rpm';
                    break;
                case 'debian':
                case 'ubuntu':
                    ext = 'deb';
                    break;
                case 'windows':
                    ext = 'msi';
                    break;

                    // No default
            }
            break;
        case 'arm64':
            if (os !== 'amazon_linux' && os !== 'redhat' && os !== 'ubuntu' && os !== 'suse') throw new Error('OS must be `amazon_linux`, `redhat`, `ubuntu`, or `suse`.');

            switch (os) {
                case 'amazon_linux':
                case 'redhat':
                case 'suse':
                    ext = 'rpm';
                    break;
                case 'ubuntu':
                    ext = 'deb';
                    break;

                // No default
            }
            break;

        // No default
    }

    if (ext !== 'deb' && ext !== 'msi' && ext !== 'rpm') throw new Error('Extension must be `deb`, `msi`, or `rpm`.');

    let initPackageGenerator: ((packageName: string, options?: ec2.NamedPackageOptions) => ec2.InitPackage) | null = null;
    switch (ext) {
        /* eslint-disable @typescript-eslint/unbound-method */
        case 'deb':
            initPackageGenerator = ec2.InitPackage.apt;
            break;
        case 'msi':
            initPackageGenerator = ec2.InitPackage.msi;
            break;
        case 'rpm':
            initPackageGenerator = ec2.InitPackage.rpm;
            break;
        /* eslint-enable @typescript-eslint/unbound-method */
        // No default
    }

    const handle = new ec2.InitServiceRestartHandle();
    return new ec2.InitConfig([
        initPackageGenerator(`https://s3.amazonaws.com/amazoncloudwatch-agent/${os}/${arch}/latest/amazon-cloudwatch-agent.${ext}`, {
            serviceRestartHandles: [handle],
        }),
        file.cloudwatch.config(os, obj, [handle]),
        ec2.InitService.enable('amazon-cloudwatch-agent', {
            serviceRestartHandle: handle,
        }),
    ]);
}
