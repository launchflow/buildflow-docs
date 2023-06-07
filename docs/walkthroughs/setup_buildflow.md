import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setup LaunchFlow

## Install LaunchFlow

There are two components to using LaunchFlow that need to be installed.

1. VS Code Extension - Installed via the VSCode marketplace
2. LaunchFlow CLI - Installed via PyPi

### VS Code  Extension

<a class="button button--lg button--primary" href="vscode:extension/LaunchFlow.launchflow">Install</a>

### LaunchFlow CLI

```
pip install launchflow
```


## Sign up for LaunchFlow

You can currently sign up for LaunchFlow simply by using your Google account. You can signup directly in the VSCode extension or via the LaunchFlow CLI.

Signing up will create a free LaunchFlow account. See our [pricing page](https://www.launchflow.com/pricing) for more details on what is included in our free tier, and also additional information on our premium tiers.

<Tabs>
  <TabItem className='tab-content' value='vscode' label='VS Code'>
1. Open up the LaunchFlow extension sidebar
2. Navigate to the `Account` tab
3. Click `Sign in with Google`
4. The extension will prompt you to sign in with LaunchFlow. Click `Allow`
5. The extension will prompt you to open up Google login. Click `Open`
6. Sign in with Google.
  </TabItem>
  <TabItem className='tab-content' value='cli' label='LaunchFlow CLI'>
First login with your google account.

```
launch auth login
```

Then create your free launchflow account.

```
launch accounts signup
```

  </TabItem>
</Tabs>

## What's next?

Build your first BuildFlow processor and launch your first LaunchFlow Deployment with our [real-time image classification walkthrough](./file-ingestion).