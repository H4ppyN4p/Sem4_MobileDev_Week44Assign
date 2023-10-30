import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//react imports 
import {PanGestureHandler, GestureHandlerRootView} from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const App = () => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const onGestureEvent = useAnimatedGestureHandler(
    {
      onStart:(_, context) => {
        console.log('Der sker notegt: ' + translateX.value)
        context.translateX = translateX.value
        context.translateY = translateY.value
      },
      onActive:(event, context) => {
        translateX.value = context.translateX + event.translationX
        translateY.value = context.translateY + event.translationY
      },
      onEnd:(_, context) => {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
      }
    }
  )

  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value}
      ]
    }
  })

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <View style={styles.container}>

        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={animateStyle}>
            <Text>Drag and watch console log</Text>
          </Animated.View>
        </PanGestureHandler>

      </View>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  rootView: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
