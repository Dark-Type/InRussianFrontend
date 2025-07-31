# UserTaskQueueItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**userId** | **string** |  | [default to undefined]
**taskId** | **string** |  | [default to undefined]
**themeId** | **string** |  | [default to undefined]
**sectionId** | **string** |  | [default to undefined]
**queuePosition** | **number** |  | [default to undefined]
**isOriginalTask** | **boolean** |  | [default to undefined]
**isRetryTask** | **boolean** |  | [default to undefined]
**originalTaskId** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [default to undefined]

## Example

```typescript
import { UserTaskQueueItem } from './api';

const instance: UserTaskQueueItem = {
    id,
    userId,
    taskId,
    themeId,
    sectionId,
    queuePosition,
    isOriginalTask,
    isRetryTask,
    originalTaskId,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
