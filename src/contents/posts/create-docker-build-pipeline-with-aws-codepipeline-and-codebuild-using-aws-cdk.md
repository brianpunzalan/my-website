---
title: Create Docker Build Pipeline with AWS CodePipeline and CodeBuild using AWS CDK
excerpt: Showing the steps on creating a Docker Build Pipeline with AWS services
  using its Cloud Development Kit (CDK)
date: 2022-02-01T03:48:08.684Z
author:
  name: Brian Punzalan
ogImage:
  url: /assets/blog-posts/blog2-building-blocks-banner.svg
coverImage: /assets/blog-posts/blog2-building-blocks-banner.svg
content: "If you are looking for template solution to build your Docker
  applications through a CI pipeline in AWS, then you are in the right place.


  \r

  \r

  I would show you how you could use this template to create your CI build
  pipeline for your Docker application. You do not need to learn
  **Cloudformation** template syntax to provision the AWS resources that we are
  about to use to create the pipeline. We will use **AWS CDK** or AWS Cloud
  Development Kit to generate the Cloudformation templates, programatically,
  using the following well-known supported languages Typescript/Javascript,
  Python, Java, C#, Go.


  ## Overview


  ![docker-build-pipeline-stack.png](/assets/blog-posts/docker-build-pipeline\
  -stack.png \"Docker Build Pipeline Stack\")


  ## Getting Started


  ### Pre-requisite


  - A working project codebase with `Dockerfile` and `buildspec.yaml`. The
  `buildpsec.yaml` contains the script to be executed by CodeBuild.

  - Already configured `aws-cli` with the Access Key and Secret Key to be used
  by `cdk` for authentication and access to your AWS services.


  ### Push the codebase to CodeCommit


  You need to push your codebase to a CodeCommit repository because it would
  serve as the source for the pipeline. Take note the repository name since it
  would serve as an input to our Cloudformation template.


  \r

  \r

  ### Set up the environment\r

  \r

  For our example, we would use `Typescript` as our chosen language.\r

  \r

  To start, you need to install the AWS CDK Toolkit for Typescript/Javascript,
  globally (optional).


  \r

  ```bash\r

  npm install -g aws-cdk\r

  ```\r

  \r

  Once installed, you could try to use the toolkit to bootstrap your codebase
  with your chosen language.


  \r

  ```bash\r

  mkdir aws-cdk-docker-build-pipeline-template\r

  cd aws-cdk-docker-build-pipeline-template\r

  cdk init app --language typescript\r

  ```\r

  \r

  I specify `app` in our case since we want to create a Template CDK
  Application.


  ### Install dependencies


  We need to install CDK libraries for each services we would be using


  ```bash

  npm install @aws-cdk/core @aws-cdk/aws-codepipeline
  @aws-cdk/aws-codepipeline-actions @aws-cdk/aws-codecommit
  @aws-cdk/aws-codebuild @aws-cdk/aws-ecr @aws-cdk/aws-iam\r

  ```


  ### Create Stack

  \r

  \r


  We need to create a Stack which we would name `DockerBuildPipelineStack`.
  This stack should include the specification on how the provisioned resources
  would communicate for us to have a working build pipeline for Docker
  applications.


  ```js

  /**

  \ * lib/DockerBuildPipelineStack.ts

  \ */

  \r

  import * as cdk from '@aws-cdk/core';\r

  import * as codecommit from '@aws-cdk/aws-codecommit';\r

  import * as ecr from '@aws-cdk/aws-ecr';


  class DockerBuildPipelineStack extends cdk.Stack {\r

  \  public codeCommitRepository: codecommit.IRepository;\r

  \  public ecrRepository: ecr.IRepository;\r

  \r

  \  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {\r

  \    super(scope, id, props);\r

  \r

  \   \ 

  \    // TODO: instantiate services\r

  \  }\r

  }

  ```


  ### Initialize Parameters

  These parameters are required to provision the resources. We need to input
  the values when we tried to use the Cloudformation template.

  ```js

  // ...

  const codePipelineName = new cdk.CfnParameter(this, \"CodePipelineName\",
  {\r

  \  type: \"String\",\r

  \  allowedPattern: \"^[a-zA-Z0-9._-]{1,100}$\",\r

  \  description: \"The name of the pipeline to be created. The provided name
  would be suffixed with '-DockerPipelineStack'\"\r

  });\r

  const codeCommitRepositoryName = new cdk.CfnParameter(this,
  \"CodeCommitRepositoryName\", {\r

  \  type: \"String\",\r

  \  allowedPattern: \"^[a-zA-Z0-9._-]{1,100}$\",\r

  \  description: \"The existing CodeCommit repository name.\"\r

  });\r

  const ecrRepositoryName = new cdk.CfnParameter(this, \"ECRRepositoryName\",
  {\r

  \  type: \"String\",\r

  \  allowedPattern: \"^[a-zA-Z0-9/._-]{1,100}$\",\r

  \  description: \"The ECR repository name\"\r

  });

  // ....

  ```


  ### Setup ECR, CodeCommit and CodePipeline

  We will use the references to the resources later on when we try to wire
  them up for our build pipeline.

  ```js

  // ...


  // Get reference to the CodeCommit repository where our application is
  stored

  this.codeCommitRepository = codecommit.Repository.fromRepositoryName(this,
  \"CodeCommit\", codeCommitRepositoryName.valueAsString);


  // Instantiate new ECR repository where built Docker images will be stored

  this.ecrRepository = new ecr.Repository(this, \"ECRRepository\", {\r

  \  repositoryName: ecrRepositoryName.valueAsString,\r

  \  imageScanOnPush: true,\r

  \  imageTagMutability: ecr.TagMutability.MUTABLE,\r

  });\r\r


  // Create Pipeline, the suffix for the name is optional\r

  const pipelineSuffixName = 'DockerPipelineStack';\r

  const pipelineName = codePipelineName.valueAsString;\r

  const fullPipelineName = `${pipelineName}-${pipelineSuffixName}`;\r

  const pipeline = new codepipeline.Pipeline(this, \"CodePipeline\", {\r

  \  pipelineName: fullPipelineName,\r

  \  crossAccountKeys: false,\r

  });

  // ...

  ```


  ### Pipeline Stages


  We have 2 pipeline stages: **Source** and **Build** stages.


  #### Source Stage

  This stage pulls the git repository of the project from CodeCommit and
  create an artifact from it named `SourceArtifact`. This would serve as input
  to the **Build** stage.

  ```js

  // ...

  const sourceArtifact = new codepipeline.Artifact(\"SourceArtifact\");\r

  const sourcePipelineStage: codepipeline.StageOptions = {\r

  \  stageName: \"Source\",\r

  \  actions: [\r

  \    new codepipeline_actions.CodeCommitSourceAction({

  \      branch: 'master', // default\r

  \      trigger: codepipeline_actions.CodeCommitTrigger.EVENTS, // default\r

  \      actionName: \"CodeCommitSourceAction\",\r

  \      repository: this.codeCommitRepository,\r

  \      output: sourceArtifact,\r

  \    })\r

  \  ]\r

  };

  // ...\r

  \r

  ```


  #### Build Stage

  This stage would build the Docker images from the `Dockerfile` by following
  the `buildspec.yaml`, it should include the steps on how to build your Docker
  image.


  ```js

  // ...\r

  const buildArtifact = new codepipeline.Artifact(\"BuildArtifact\");\r

  const codeBuildProjectName = `${fullPipelineName}-CodeBuild`;\r

  const codeBuildPipelineProject = new codebuild.PipelineProject(this,
  \"CodeBuild\", {\r

  \  projectName: codeBuildProjectName,\r

  \  checkSecretsInPlainTextEnvVariables: true,\r

  \  environment: {\r

  \    privileged: true,\r

  \  },\r

  \  cache: codebuild.Cache.local(codebuild.LocalCacheMode.DOCKER_LAYER,
  codebuild.LocalCacheMode.CUSTOM),\r

  \  environmentVariables: {\r

  \    \"AWS_DEFAULT_REGION\": {\r

  \      type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,\r

  \      value: this.region,\r

  \    },\r

  \    \"AWS_ACCOUNT_ID\": {\r

  \      type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,\r

  \      value: this.account,\r

  \    },

  \    \"APP_NAME\": {

  \      type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,

  \      value: \"MyApp\"

  \    },\r

  \  },\r

  });


  // Add policies to the CodeBuild execution role

  const codeBuildECRChangePermission =
  this.getCodeBuildECRChangePermission();\r

  const codeBuildECRGetAuthorizationPermission =
  this.getCodeBuildECRGetAuthorizationPermission();\r

  const codeBuildECRPullImagesPermission =
  this.getCodeBuildECRPullImagesPermission();\r

  codeBuildPipelineProject.addToRolePolicy(codeBuildECRChangePermission);\r

  codeBuildPipelineProject.addToRolePolicy(codeBuildECRGetAuthorizationPermis\
  sion);\r

  codeBuildPipelineProject.addToRolePolicy(codeBuildECRPullImagesPermission);\
  \r


  // Setup Build Stage with actions including the created CodeBuild project
  with input and output artifacts

  const buildPipelineStage: codepipeline.StageOptions = {\r

  \  stageName: \"Build\",\r

  \  actions: [\r

  \    new codepipeline_actions.CodeBuildAction({\r

  \      actionName: \"CodeBuildBuildAction\",\r

  \      project: codeBuildPipelineProject,\r

  \      input: sourceArtifact,\r

  \      outputs: [buildArtifact],\r

  \    })\r

  \  ]\r

  };

  // ...

  ```


  You could use this sample `buildspec.yaml` file.


  ```yaml

  version: 0.2

  phases:

  \  pre_build:

  \    commands:

  \      - \"aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker
  login --username AWS --password-stdin
  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com\"

  \  build:

  \    commands:

  \      - \"docker build -t $APP_NAME:latest .\"

  \      - \"docker tag $APP_NAME:latest
  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$APP_NAME:latest\"

  \  post_builds:

  \    commands:

  \      - \"docker push
  $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$APP_NAME:latest\"

  artifacts:

  \  files:

  \    - \"*\"

  \  name: \"BuildArtifact\"

  \  discard-paths: \"no\"

  ```


  Policy Statements to be included in the CodeBuild execution role:

  ##### CodeBuildECRChangePolicyStatement.json

  ```json

  {\r

  \  \"Effect\": \"Allow\",\r

  \  \"Action\": [\r

  \    \"ecr:BatchCheckLayerAvailability\",\r

  \    \"ecr:GetDownloadUrlForLayer\",\r

  \    \"ecr:GetRepositoryPolicy\",\r

  \    \"ecr:DescribeRepositories\",\r

  \    \"ecr:ListImages\",\r

  \    \"ecr:DescribeImages\",\r

  \    \"ecr:BatchGetImage\",\r

  \    \"ecr:GetLifecyclePolicy\",\r

  \    \"ecr:GetLifecyclePolicyPreview\",\r

  \    \"ecr:ListTagsForResource\",\r

  \    \"ecr:DescribeImageScanFindings\",\r

  \    \"ecr:InitiateLayerUpload\",\r

  \    \"ecr:UploadLayerPart\",\r

  \    \"ecr:CompleteLayerUpload\",\r

  \    \"ecr:PutImage\"\r

  \  ],\r

  \  \"Resource\": \"<ECR_ARN>\"\r

  }

  ```

  ##### CodeBuildECRGetAuthorizationPolicyStatement.json

  ```json

  {\r

  \  \"Effect\": \"Allow\",\r

  \  \"Action\": [\r

  \    \"ecr:GetAuthorizationToken\"\r

  \  ],\r

  \  \"Resource\": \"*\"\r

  }

  ```

  ##### CodeBuildECRPullImagesPolicyStatement.json

  ```json

  {\r

  \  \"Effect\": \"Allow\",\r

  \  \"Action\": [\r

  \    \"ecr:BatchCheckLayerAvailability\",\r

  \    \"ecr:GetDownloadUrlForLayer\",\r

  \    \"ecr:GetRepositoryPolicy\",\r

  \    \"ecr:DescribeRepositories\",\r

  \    \"ecr:ListImages\",\r

  \    \"ecr:DescribeImages\",\r

  \    \"ecr:BatchGetImage\",\r

  \    \"ecr:GetLifecyclePolicy\",\r

  \    \"ecr:GetLifecyclePolicyPreview\",\r

  \    \"ecr:ListTagsForResource\",\r

  \    \"ecr:DescribeImageScanFindings\"\r

  \  ],\r

  \  \"Resource\": \"arn:aws:ecr:<region>:<account>:repository/*\"\r

  }

  ```


  #### Attach the Stages to pipeline

  ```js

  // ..

  pipeline.addStage(sourcePipelineStage);\r

  pipeline.addStage(buildPipelineStage);

  // ..

  ```


  ### Generate/Synthesize Cloudformation template


  We could now generate the Cloudformation template by executing the command:


  ```bash

  cdk synth

  ```


  #### Note

  Make sure that you are using the correct AWS profile. To check you could
  execute `aws sts get-caller-identity` and see if it is the correct
  user/profile.


  Once synthesized, find the output Cloudformation template file inside
  `/cdk.out/DockerBuildPipelineStack.template.json` inside the project
  directory. Use this template and upload to AWS Console under Cloudformation to
  start provisioning.


  ## All Done!


  You could checkout the Github repository for this template
  [here](https://github.com/brianpunzalan/aws-cdk-docker-build-pipeline-stack.g\
  it).\n"
---
