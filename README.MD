# coinmena app

## Setup

1) Follow instructions here: https://reactnative.dev/docs/environment-setup
2) `npm install && npx pod-install` and you're ready to go

## Run

### Instructions for iOS:

Choose any option:

- `react-native run-ios simulator='iPhone 8'`
- `npm run ios`
- `run "xed -b ios"`
- Open `mobile/ios` folder in Xcode and hit the Run button

### Instructions for Android:

Start by launching your emulator with commands, `emulator -list-avds` and `emulator -avd [avd-name]`
Then `npm run android`


## Offline support:

Is implemented by returning data in specific order
```jsx
  const { data, isLoading } = useQuery();

  if (data) {
    // we always return data when we have it in cache
    return <View>data</View>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Typography variant="h3" color={colors.fireOral}>
      Something went wrong
    </Typography>
  );
```

```js
const state = {status: 'loading', data: [/*length > 0*/]} //-> show data anyway 
const state = {status: 'error', data: [/*length > 0*/]} //-> show data anyway  
const state = {status: 'success', data: [/*length > 0*/]} //-> show data anyway

const state = {status: 'loading', data: [/*length === 0*/]} //-> show loader (1st fetch) 
const state = {status: 'error', data: [/*length === 0*/]} //-> show error in ui (1st fetch failed)  
const state = {status: 'success', data: [/*length === 0*/]} //-> show zero state in ui
```
