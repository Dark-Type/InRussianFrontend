# CreateTaskQueueRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [default to undefined]
**taskId** | **string** |  | [default to undefined]
**themeId** | **string** |  | [default to undefined]
**sectionId** | **string** |  | [default to undefined]
**queuePosition** | **number** |  | [default to undefined]
**isOriginalTask** | **boolean** |  | [default to undefined]
**isRetryTask** | **boolean** |  | [default to undefined]
**originalTaskId** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateTaskQueueRequest } from './api';

const instance: CreateTaskQueueRequest = {
    userId,
    taskId,
    themeId,
    sectionId,
    queuePosition,
    isOriginalTask,
    isRetryTask,
    originalTaskId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
