# AWS EC2

This package has helpers for AWS EC2.

## Init

### Config

#### `epel`

- `enable` contains:
  - Command > `amazonLinuxExtras` > `install` `epel` `epel-release`

#### `cloudwatch`

- `agent` contains:
  - Install CloudWatch agent.
  - File > `cloudwatch` > `config`
  - Enable CloudWatch agent.

#### `swap`

- `generate` contains:
  - Command > `swap` > `generate`

### Command

#### `amazonLinuxExtras`

- `enable`: Enable Amazon Linux 2 package.
- `install`: Install Amazon Linux 2 package.

#### `swap`

- `generate`: Generate and enable swap.

### File

#### `cloudwatch`

- `config`: Create CloudWatch agent config.
