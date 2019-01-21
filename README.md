## WhereWeGoingToday Backend

---

### How to deploy
0. [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html), run `aws configure` and set up your credentials.
   
0. Go to `./lambda` and run `npm run build` to build the Lambda functions.
   
0. Create a S3 bucket for your deployment files:
    ```
    aws s3 mb s3://#{YOUR_BUCKET_NAME}
    ```

0. Package the CloudFormation files:
    ```
    aws cloudformation package \
    --template-file master.yml \
    --s3-bucket #{YOUR_BUCKET_NAME} \
    --output-template-file packaged-template.json
    ```

0. Deploy: 
    ```
    aws cloudformation deploy \
    --template-file packaged-template.json \
    --stack-name #{YOUR_STACK_NAME} \
    --parameter-overrides YelpApiKey=#{Your Yelp API Key} \
    --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND
    ```

### How to test queries
1. Create a test user in Cognito user pool:
   ```
   aws cognito-idp admin-create-user --user-pool-id #{YOUR_USER_POOL_ID} --username #{YOUR_EMAIL} --temporary-password tempPass123! --user-attributes Name=email,Value=#{YOUR_EMAIL} --user-attributes Name=email_verified,Value=True --user-attributes Name=name,Value=Test
   ```
   You will be asked to change the user's password when you log in the first time. Please use your own email address because Cognito will send emails to the address.

2. Associate your phone number since it's required in the Cognito setup:
   ```
   aws cognito-idp admin-update-user-attributes --user-pool-id #{YOUR_USER_POOL_ID} --username #{YOUR_EMAIL} --user-attributes Name=phone_number,Value=#{YOUR_PHONE_NUMBER_WITH_COUNTRY_CODE}
   aws cognito-idp admin-update-user-attributes --user-pool-id #{YOUR_USER_POOL_ID} --username #{YOUR_EMAIL} --user-attributes Name=phone_number_verified,Value=True
   ```
   Similar to email, please use your own phone number because Cognito will send SMS to the number.

3. You can now run queries in [AppSync console](http://console.aws.amazon.com/appsync/home) (Select the region you are using). You will need to login as your Cognito user when you run the queries. Click "Login with User Pools" in the Queries page to login. You can get the Cognito client ID from either CloudFormation output or Cognito console.