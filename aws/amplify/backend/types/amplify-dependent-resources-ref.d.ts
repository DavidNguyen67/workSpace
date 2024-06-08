export type AmplifyDependentResourcesAttributes = {
  "auth": {
    "aws871336b5": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "predictions": {
    "interpretText": {
      "region": "string",
      "type": "string"
    },
    "speechGenerator": {
      "language": "string",
      "region": "string",
      "voice": "string"
    },
    "transcription": {
      "language": "string",
      "region": "string"
    }
  },
  "storage": {
    "s3": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}