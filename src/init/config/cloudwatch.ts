import * as ec2 from '@aws-cdk/aws-ec2';

import * as file from '../file/';

export enum Arch {
    X86_64 = 'amd64',
    ARM64 = 'arm64',
}

export enum Os {
    AMAZON_LINUX_AND_AMAZON_LINUX_2 = 'amazon_linux',
    CENTOS = 'centos',
    REDHAT = 'redhat',
    SUSE = 'suse',
    ORACLE = 'oracle_linux',
    WINDOWS = 'windows',
}

enum Ext {
    RPM = 'rpm',
    MSI = 'msi',
}

export function agent(arch: Arch, os: Os, obj: unknown): ec2.InitConfig {
    let ext: Ext | null = null;
    switch (arch) {
        case Arch.X86_64:
            switch (os) {
                case Os.AMAZON_LINUX_AND_AMAZON_LINUX_2:
                case Os.CENTOS:
                case Os.REDHAT:
                case Os.SUSE:
                case Os.ORACLE:
                    ext = Ext.RPM;
                    break;
                case Os.WINDOWS:
                    ext = Ext.MSI;
                    break;

                    // No default
            }
            break;
        case Arch.ARM64:
            switch (os) {
                case Os.AMAZON_LINUX_AND_AMAZON_LINUX_2:
                case Os.REDHAT:
                case Os.SUSE:
                    ext = Ext.RPM;
                    break;
                default:
                    throw new Error(`OS is not supported in ${arch}.`);
            }
            break;

        // No default
    }

    let initPackageGenerator: ((packageName: string, options?: ec2.NamedPackageOptions) => ec2.InitPackage) | null = null;
    switch (ext) {
        /* eslint-disable @typescript-eslint/unbound-method */
        case Ext.MSI:
            initPackageGenerator = ec2.InitPackage.msi;
            break;
        case Ext.RPM:
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
