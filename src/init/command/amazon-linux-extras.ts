import {
    aws_ec2 as cdkEc2,
} from 'aws-cdk-lib';

export function enable(topic: string): cdkEc2.InitCommand {
    return cdkEc2.InitCommand.shellCommand(`amazon-linux-extras enable ${topic}`, {
        testCmd: `! grep -Fxq '[amzn2extra-${topic}]' /etc/yum.repos.d/amzn2-extras.repo`,
    });
}

export function install(topic: string, recommendPackage?: string): cdkEc2.InitCommand {
    return cdkEc2.InitCommand.shellCommand(`amazon-linux-extras install ${topic} -y`, {
        testCmd: `! grep -Fxq '[amzn2extra-${topic}]' /etc/yum.repos.d/amzn2-extras.repo || ` +
            `${recommendPackage ? `! $(yum list installed | grep -q ${recommendPackage})` : 'true'}`,
    });
}
