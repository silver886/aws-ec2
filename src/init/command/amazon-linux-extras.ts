import * as ec2 from '@aws-cdk/aws-ec2';

export function enable(topic: string): ec2.InitCommand {
    return ec2.InitCommand.shellCommand(`amazon-linux-extras enable ${topic} -y`, {
        testCmd: `! grep -Fxq '[amzn2extra-${topic}]' /etc/yum.repos.d/amzn2-extras.repo`,
    });
}

export function install(topic: string, recommendPackage?: string): ec2.InitCommand {
    return ec2.InitCommand.shellCommand(`amazon-linux-extras install ${topic} -y`, {
        testCmd: `! grep -Fxq '[amzn2extra-${topic}]' /etc/yum.repos.d/amzn2-extras.repo || ` +
            `${recommendPackage ? `! $(yum list installed | grep -q ${recommendPackage})` : 'true'}`,
    });
}
